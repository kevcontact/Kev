-- KEV portfolio · schema aislado dentro del proyecto Supabase de Sintropia (BistronomIA).
-- Todo vive en `kev`; lo único que toca objetos compartidos es el bucket `kev-media`
-- y sus políticas en storage.objects, filtradas siempre por bucket_id.
--
-- Modelo de permisos:
--   · anon / authenticated leen solo contenido publicado.
--   · Escribir exige estar en kev.admins. Un usuario de BistronomIA autenticado NO
--     hereda nada: auth.users es compartido, la lista blanca es de KEV.
--   · kev.admins no se escribe desde la API; se administra por SQL.

create schema if not exists kev;

grant usage on schema kev to anon, authenticated, service_role;

-- ---------------------------------------------------------------- admins
create table kev.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  created_at timestamptz not null default now()
);

create or replace function kev.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from kev.admins where user_id = (select auth.uid())
  );
$$;

revoke all on function kev.is_admin() from public;
grant execute on function kev.is_admin() to anon, authenticated, service_role;

-- ---------------------------------------------------------------- helpers
create or replace function kev.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- ---------------------------------------------------------------- projects
create type kev.project_kind as enum ('Photography', 'Video', 'Brand');

create table kev.projects (
  id         uuid primary key default gen_random_uuid(),
  slug       text not null unique
             check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(slug) <= 80),
  title      text not null check (length(title) between 1 and 120),
  client     text not null default '' check (length(client) <= 120),
  -- se conserva aunque el sitio ya no lo muestra (pedido del cliente, sep-2026)
  year       text check (year is null or year ~ '^[0-9]{4}$'),
  kind       kev.project_kind not null,
  blurb      text check (blurb is null or length(blurb) <= 2000),
  position   integer not null default 0,
  published  boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index projects_position_idx on kev.projects (position, created_at);

create trigger projects_touch before update on kev.projects
  for each row execute function kev.touch_updated_at();

-- ---------------------------------------------------------------- media
create table kev.media (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references kev.projects (id) on delete cascade,
  type        text not null check (type in ('image', 'video')),
  -- ruta dentro del bucket kev-media (sin barra inicial)
  path        text not null check (path !~ '^/' and path !~ '\.\.' and length(path) <= 512),
  poster_path text check (poster_path is null or (poster_path !~ '^/' and poster_path !~ '\.\.')),
  width       integer not null check (width > 0),
  height      integer not null check (height > 0),
  duration    numeric(8, 2) check (duration is null or duration >= 0),
  position    integer not null default 0,
  created_at  timestamptz not null default now()
);

create index media_project_position_idx on kev.media (project_id, position);

-- ---------------------------------------------------------------- site settings (singleton)
create table kev.site_settings (
  id                boolean primary key default true check (id),
  bio               text not null default '' check (length(bio) <= 2000),
  clients           text[] not null default '{}',
  services          text[] not null default '{}',
  -- [{label, value, href}] · href validado en la app (mailto:/https:)
  contact           jsonb not null default '[]'::jsonb check (jsonb_typeof(contact) = 'array'),
  home_project_slug text,
  updated_at        timestamptz not null default now()
);

create trigger site_settings_touch before update on kev.site_settings
  for each row execute function kev.touch_updated_at();

insert into kev.site_settings (id) values (true) on conflict do nothing;

-- ---------------------------------------------------------------- RLS
alter table kev.admins        enable row level security;
alter table kev.projects      enable row level security;
alter table kev.media         enable row level security;
alter table kev.site_settings enable row level security;

-- admins: cada usuario ve solo su propia fila (sirve para "¿soy admin?")
create policy admins_self_read on kev.admins
  for select to authenticated
  using (user_id = (select auth.uid()));

-- projects
create policy projects_public_read on kev.projects
  for select to anon, authenticated
  using (published or (select kev.is_admin()));

create policy projects_admin_insert on kev.projects
  for insert to authenticated with check ((select kev.is_admin()));
create policy projects_admin_update on kev.projects
  for update to authenticated
  using ((select kev.is_admin())) with check ((select kev.is_admin()));
create policy projects_admin_delete on kev.projects
  for delete to authenticated using ((select kev.is_admin()));

-- media: visible si su proyecto lo es
create policy media_public_read on kev.media
  for select to anon, authenticated
  using (
    exists (
      select 1 from kev.projects p
      where p.id = media.project_id
        and (p.published or (select kev.is_admin()))
    )
  );

create policy media_admin_insert on kev.media
  for insert to authenticated with check ((select kev.is_admin()));
create policy media_admin_update on kev.media
  for update to authenticated
  using ((select kev.is_admin())) with check ((select kev.is_admin()));
create policy media_admin_delete on kev.media
  for delete to authenticated using ((select kev.is_admin()));

-- site settings
create policy settings_public_read on kev.site_settings
  for select to anon, authenticated using (true);
create policy settings_admin_update on kev.site_settings
  for update to authenticated
  using ((select kev.is_admin())) with check ((select kev.is_admin()));

-- ---------------------------------------------------------------- grants
grant select on kev.projects, kev.media, kev.site_settings to anon;
grant select, insert, update, delete on kev.projects, kev.media to authenticated;
grant select, update on kev.site_settings to authenticated;
grant select on kev.admins to authenticated;
grant all on all tables in schema kev to service_role;

-- ---------------------------------------------------------------- storage
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'kev-media', 'kev-media', true, 52428800,
  array['image/jpeg', 'image/png', 'image/webp', 'video/mp4']
)
on conflict (id) do nothing;

-- la lectura pública va por la URL pública del bucket; esta política solo habilita
-- list/remove desde la API para los admins (Storage exige select para borrar)
create policy kev_media_admin_select on storage.objects
  for select to authenticated
  using (bucket_id = 'kev-media' and (select kev.is_admin()));
create policy kev_media_admin_insert on storage.objects
  for insert to authenticated
  with check (bucket_id = 'kev-media' and (select kev.is_admin()));
create policy kev_media_admin_update on storage.objects
  for update to authenticated
  using (bucket_id = 'kev-media' and (select kev.is_admin()))
  with check (bucket_id = 'kev-media' and (select kev.is_admin()));
create policy kev_media_admin_delete on storage.objects
  for delete to authenticated
  using (bucket_id = 'kev-media' and (select kev.is_admin()));
