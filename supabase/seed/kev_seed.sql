-- Generado por web/scripts/build-seed.ts — no editar a mano.

begin;

insert into kev.projects (slug, title, client, year, kind, blurb, position)
values ('j-balvin', 'J Balvin', 'J Balvin', '2025', 'Photography', null, 0)
on conflict (slug) do nothing;

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/balvin/j-balvin-2.jpg', null, 1082, 1600, null, 0
from kev.projects where slug = 'j-balvin'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'j-balvin' and x.path = 'artistas/balvin/j-balvin-2.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/balvin/j-balvin-13.jpg', null, 1067, 1600, null, 10
from kev.projects where slug = 'j-balvin'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'j-balvin' and x.path = 'artistas/balvin/j-balvin-13.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/balvin/j-balvin-19.jpg', null, 1067, 1600, null, 20
from kev.projects where slug = 'j-balvin'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'j-balvin' and x.path = 'artistas/balvin/j-balvin-19.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/balvin/j-balvin-28.jpg', null, 1067, 1600, null, 30
from kev.projects where slug = 'j-balvin'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'j-balvin' and x.path = 'artistas/balvin/j-balvin-28.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/balvin/j-balvin-30.jpg', null, 1067, 1600, null, 40
from kev.projects where slug = 'j-balvin'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'j-balvin' and x.path = 'artistas/balvin/j-balvin-30.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/balvin/j-balvin-35.jpg', null, 1067, 1600, null, 50
from kev.projects where slug = 'j-balvin'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'j-balvin' and x.path = 'artistas/balvin/j-balvin-35.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/balvin/j-balvin-36.jpg', null, 1067, 1600, null, 60
from kev.projects where slug = 'j-balvin'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'j-balvin' and x.path = 'artistas/balvin/j-balvin-36.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/balvin/j-balvin-38.jpg', null, 1067, 1600, null, 70
from kev.projects where slug = 'j-balvin'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'j-balvin' and x.path = 'artistas/balvin/j-balvin-38.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/balvin/j-balvin-39.jpg', null, 1067, 1600, null, 80
from kev.projects where slug = 'j-balvin'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'j-balvin' and x.path = 'artistas/balvin/j-balvin-39.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/balvin/j-balvin-50.jpg', null, 1067, 1600, null, 90
from kev.projects where slug = 'j-balvin'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'j-balvin' and x.path = 'artistas/balvin/j-balvin-50.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/balvin/j-balvin-52.jpg', null, 1067, 1600, null, 100
from kev.projects where slug = 'j-balvin'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'j-balvin' and x.path = 'artistas/balvin/j-balvin-52.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/balvin/j-balvin-56.jpg', null, 1067, 1600, null, 110
from kev.projects where slug = 'j-balvin'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'j-balvin' and x.path = 'artistas/balvin/j-balvin-56.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/balvin/j-balvin-61.jpg', null, 1067, 1600, null, 120
from kev.projects where slug = 'j-balvin'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'j-balvin' and x.path = 'artistas/balvin/j-balvin-61.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/balvin/j-balvin-65.jpg', null, 1067, 1600, null, 130
from kev.projects where slug = 'j-balvin'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'j-balvin' and x.path = 'artistas/balvin/j-balvin-65.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/balvin/j-balvin-70.jpg', null, 1067, 1600, null, 140
from kev.projects where slug = 'j-balvin'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'j-balvin' and x.path = 'artistas/balvin/j-balvin-70.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/balvin/j-balvin-74.jpg', null, 1067, 1600, null, 150
from kev.projects where slug = 'j-balvin'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'j-balvin' and x.path = 'artistas/balvin/j-balvin-74.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/balvin/j-balvin-82.jpg', null, 1067, 1600, null, 160
from kev.projects where slug = 'j-balvin'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'j-balvin' and x.path = 'artistas/balvin/j-balvin-82.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/balvin/j-balvin-96.jpg', null, 1067, 1600, null, 170
from kev.projects where slug = 'j-balvin'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'j-balvin' and x.path = 'artistas/balvin/j-balvin-96.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/balvin/j-balvin-97.jpg', null, 1067, 1600, null, 180
from kev.projects where slug = 'j-balvin'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'j-balvin' and x.path = 'artistas/balvin/j-balvin-97.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/balvin/j-balvin-111.jpg', null, 1067, 1600, null, 190
from kev.projects where slug = 'j-balvin'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'j-balvin' and x.path = 'artistas/balvin/j-balvin-111.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/balvin/j-balvin-112.jpg', null, 1067, 1600, null, 200
from kev.projects where slug = 'j-balvin'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'j-balvin' and x.path = 'artistas/balvin/j-balvin-112.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/balvin/j-balvin-152.jpg', null, 1067, 1600, null, 210
from kev.projects where slug = 'j-balvin'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'j-balvin' and x.path = 'artistas/balvin/j-balvin-152.jpg');

insert into kev.projects (slug, title, client, year, kind, blurb, position)
values ('maluma-x-maisak', 'Maluma × Maisak', 'Maluma', '2025', 'Photography', null, 10)
on conflict (slug) do nothing;

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/maluma-x-maisak/maluma-7.jpg', null, 1067, 1600, null, 0
from kev.projects where slug = 'maluma-x-maisak'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'maluma-x-maisak' and x.path = 'artistas/maluma-x-maisak/maluma-7.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/maluma-x-maisak/maluma-12.jpg', null, 1067, 1600, null, 10
from kev.projects where slug = 'maluma-x-maisak'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'maluma-x-maisak' and x.path = 'artistas/maluma-x-maisak/maluma-12.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/maluma-x-maisak/maluma-24.jpg', null, 1067, 1600, null, 20
from kev.projects where slug = 'maluma-x-maisak'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'maluma-x-maisak' and x.path = 'artistas/maluma-x-maisak/maluma-24.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/maluma-x-maisak/maluma-27.jpg', null, 1067, 1600, null, 30
from kev.projects where slug = 'maluma-x-maisak'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'maluma-x-maisak' and x.path = 'artistas/maluma-x-maisak/maluma-27.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/maluma-x-maisak/maluma-34.jpg', null, 1067, 1600, null, 40
from kev.projects where slug = 'maluma-x-maisak'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'maluma-x-maisak' and x.path = 'artistas/maluma-x-maisak/maluma-34.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/maluma-x-maisak/maluma-40.jpg', null, 1067, 1600, null, 50
from kev.projects where slug = 'maluma-x-maisak'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'maluma-x-maisak' and x.path = 'artistas/maluma-x-maisak/maluma-40.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/maluma-x-maisak/maluma-49.jpg', null, 1067, 1600, null, 60
from kev.projects where slug = 'maluma-x-maisak'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'maluma-x-maisak' and x.path = 'artistas/maluma-x-maisak/maluma-49.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/maluma-x-maisak/maluma-51.jpg', null, 1067, 1600, null, 70
from kev.projects where slug = 'maluma-x-maisak'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'maluma-x-maisak' and x.path = 'artistas/maluma-x-maisak/maluma-51.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/maluma-x-maisak/maluma-64.jpg', null, 1067, 1600, null, 80
from kev.projects where slug = 'maluma-x-maisak'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'maluma-x-maisak' and x.path = 'artistas/maluma-x-maisak/maluma-64.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/maluma-x-maisak/maluma-72.jpg', null, 1067, 1600, null, 90
from kev.projects where slug = 'maluma-x-maisak'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'maluma-x-maisak' and x.path = 'artistas/maluma-x-maisak/maluma-72.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/maluma-x-maisak/maluma-78.jpg', null, 1067, 1600, null, 100
from kev.projects where slug = 'maluma-x-maisak'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'maluma-x-maisak' and x.path = 'artistas/maluma-x-maisak/maluma-78.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/maluma-x-maisak/maluma-90.jpg', null, 1067, 1600, null, 110
from kev.projects where slug = 'maluma-x-maisak'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'maluma-x-maisak' and x.path = 'artistas/maluma-x-maisak/maluma-90.jpg');

insert into kev.projects (slug, title, client, year, kind, blurb, position)
values ('maisak-shooting', 'Maisak — Shooting', 'Maisak', '2024', 'Photography', null, 20)
on conflict (slug) do nothing;

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/shooting-maisak/maysak-5.jpg', null, 1067, 1600, null, 0
from kev.projects where slug = 'maisak-shooting'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'maisak-shooting' and x.path = 'artistas/shooting-maisak/maysak-5.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/shooting-maisak/maysak-14.jpg', null, 1067, 1600, null, 10
from kev.projects where slug = 'maisak-shooting'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'maisak-shooting' and x.path = 'artistas/shooting-maisak/maysak-14.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/shooting-maisak/maysak-22.jpg', null, 1067, 1600, null, 20
from kev.projects where slug = 'maisak-shooting'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'maisak-shooting' and x.path = 'artistas/shooting-maisak/maysak-22.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/shooting-maisak/maysak-24.jpg', null, 1067, 1600, null, 30
from kev.projects where slug = 'maisak-shooting'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'maisak-shooting' and x.path = 'artistas/shooting-maisak/maysak-24.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/shooting-maisak/maysak-34.jpg', null, 1067, 1600, null, 40
from kev.projects where slug = 'maisak-shooting'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'maisak-shooting' and x.path = 'artistas/shooting-maisak/maysak-34.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/shooting-maisak/maysak-92.jpg', null, 1067, 1600, null, 50
from kev.projects where slug = 'maisak-shooting'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'maisak-shooting' and x.path = 'artistas/shooting-maisak/maysak-92.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/shooting-maisak/maysak-99.jpg', null, 1067, 1600, null, 60
from kev.projects where slug = 'maisak-shooting'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'maisak-shooting' and x.path = 'artistas/shooting-maisak/maysak-99.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/shooting-maisak/maysak-103.jpg', null, 1067, 1600, null, 70
from kev.projects where slug = 'maisak-shooting'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'maisak-shooting' and x.path = 'artistas/shooting-maisak/maysak-103.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/shooting-maisak/maysak-109.jpg', null, 1067, 1600, null, 80
from kev.projects where slug = 'maisak-shooting'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'maisak-shooting' and x.path = 'artistas/shooting-maisak/maysak-109.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/shooting-maisak/maysak-110.jpg', null, 1067, 1600, null, 90
from kev.projects where slug = 'maisak-shooting'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'maisak-shooting' and x.path = 'artistas/shooting-maisak/maysak-110.jpg');

insert into kev.projects (slug, title, client, year, kind, blurb, position)
values ('fdrs', 'FDRS', 'FDRS', '2024', 'Photography', null, 30)
on conflict (slug) do nothing;

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/fdrs/maisak-5.jpg', null, 1067, 1600, null, 0
from kev.projects where slug = 'fdrs'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'fdrs' and x.path = 'artistas/fdrs/maisak-5.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/fdrs/maisak-32.jpg', null, 1067, 1600, null, 10
from kev.projects where slug = 'fdrs'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'fdrs' and x.path = 'artistas/fdrs/maisak-32.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/fdrs/maisak-52.jpg', null, 1067, 1600, null, 20
from kev.projects where slug = 'fdrs'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'fdrs' and x.path = 'artistas/fdrs/maisak-52.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/fdrs/maisak-63.jpg', null, 1067, 1600, null, 30
from kev.projects where slug = 'fdrs'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'fdrs' and x.path = 'artistas/fdrs/maisak-63.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/fdrs/maisak-65.jpg', null, 1067, 1600, null, 40
from kev.projects where slug = 'fdrs'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'fdrs' and x.path = 'artistas/fdrs/maisak-65.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'artistas/fdrs/maisak-68.jpg', null, 1067, 1600, null, 50
from kev.projects where slug = 'fdrs'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'fdrs' and x.path = 'artistas/fdrs/maisak-68.jpg');

insert into kev.projects (slug, title, client, year, kind, blurb, position)
values ('kev-x-new-era', 'Kev × New Era', 'New Era', '2025', 'Brand', null, 40)
on conflict (slug) do nothing;

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'marcas/kev-x-new-era/dis1.jpg', null, 1600, 1000, null, 0
from kev.projects where slug = 'kev-x-new-era'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'kev-x-new-era' and x.path = 'marcas/kev-x-new-era/dis1.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'marcas/kev-x-new-era/dis2.jpg', null, 1600, 1000, null, 10
from kev.projects where slug = 'kev-x-new-era'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'kev-x-new-era' and x.path = 'marcas/kev-x-new-era/dis2.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'marcas/kev-x-new-era/dis3.jpg', null, 1600, 1000, null, 20
from kev.projects where slug = 'kev-x-new-era'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'kev-x-new-era' and x.path = 'marcas/kev-x-new-era/dis3.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'marcas/kev-x-new-era/dis4.jpg', null, 1600, 1000, null, 30
from kev.projects where slug = 'kev-x-new-era'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'kev-x-new-era' and x.path = 'marcas/kev-x-new-era/dis4.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'marcas/kev-x-new-era/dis5.jpg', null, 1600, 1000, null, 40
from kev.projects where slug = 'kev-x-new-era'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'kev-x-new-era' and x.path = 'marcas/kev-x-new-era/dis5.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'marcas/kev-x-new-era/dis6.jpg', null, 1600, 1000, null, 50
from kev.projects where slug = 'kev-x-new-era'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'kev-x-new-era' and x.path = 'marcas/kev-x-new-era/dis6.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'marcas/kev-x-new-era/dis7.jpg', null, 1600, 1000, null, 60
from kev.projects where slug = 'kev-x-new-era'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'kev-x-new-era' and x.path = 'marcas/kev-x-new-era/dis7.jpg');

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'image', 'marcas/kev-x-new-era/dis8.jpg', null, 1600, 1000, null, 70
from kev.projects where slug = 'kev-x-new-era'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'kev-x-new-era' and x.path = 'marcas/kev-x-new-era/dis8.jpg');

insert into kev.projects (slug, title, client, year, kind, blurb, position)
values ('en-otra-vida', 'En Otra Vida', 'Music Video', '2025', 'Video', null, 50)
on conflict (slug) do nothing;

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'video', 'video-clips/en-otra-vida-final-pro-res.mp4', 'video-clips/en-otra-vida-final-pro-res-poster.jpg', 1280, 720, 153, 0
from kev.projects where slug = 'en-otra-vida'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'en-otra-vida' and x.path = 'video-clips/en-otra-vida-final-pro-res.mp4');

insert into kev.projects (slug, title, client, year, kind, blurb, position)
values ('la-esencia', 'La Esencia', 'Music Video', '2025', 'Video', null, 60)
on conflict (slug) do nothing;

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'video', 'video-clips/la-esencia-mp4.mp4', 'video-clips/la-esencia-mp4-poster.jpg', 1280, 960, 181, 0
from kev.projects where slug = 'la-esencia'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'la-esencia' and x.path = 'video-clips/la-esencia-mp4.mp4');

insert into kev.projects (slug, title, client, year, kind, blurb, position)
values ('tikiti', 'Tikiti', 'Music Video', '2024', 'Video', null, 70)
on conflict (slug) do nothing;

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'video', 'video-clips/tikiti-redes.mp4', 'video-clips/tikiti-redes-poster.jpg', 1280, 720, 170, 0
from kev.projects where slug = 'tikiti'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'tikiti' and x.path = 'video-clips/tikiti-redes.mp4');

insert into kev.projects (slug, title, client, year, kind, blurb, position)
values ('no-es-un-secreto', 'No Es Un Secreto', 'Music Video', '2024', 'Video', null, 80)
on conflict (slug) do nothing;

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'video', 'video-clips/no-es-un-secreto-redes.mp4', 'video-clips/no-es-un-secreto-redes-poster.jpg', 1280, 960, 144, 0
from kev.projects where slug = 'no-es-un-secreto'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'no-es-un-secreto' and x.path = 'video-clips/no-es-un-secreto-redes.mp4');

insert into kev.projects (slug, title, client, year, kind, blurb, position)
values ('create-ovy-madrid', 'Create — OVY Madrid', 'OVY On The Drums', '2024', 'Video', null, 90)
on conflict (slug) do nothing;

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'video', 'video-clips/create-ovy-madrid.mp4', 'video-clips/create-ovy-madrid-poster.jpg', 1280, 958, 48, 0
from kev.projects where slug = 'create-ovy-madrid'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'create-ovy-madrid' and x.path = 'video-clips/create-ovy-madrid.mp4');

insert into kev.projects (slug, title, client, year, kind, blurb, position)
values ('up-bts', 'UP+ — Behind The Scenes', 'UP+', '2024', 'Video', null, 100)
on conflict (slug) do nothing;

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'video', 'video-clips/bts-up-mp44.mp4', 'video-clips/bts-up-mp44-poster.jpg', 1280, 720, 142, 0
from kev.projects where slug = 'up-bts'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'up-bts' and x.path = 'video-clips/bts-up-mp44.mp4');

insert into kev.projects (slug, title, client, year, kind, blurb, position)
values ('showreel', 'Showreel', 'KEV', '2025', 'Video', null, 110)
on conflict (slug) do nothing;

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'video', 'video-clips/reel-kev.mp4', 'video-clips/reel-kev-poster.jpg', 1280, 960, 62, 0
from kev.projects where slug = 'showreel'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'showreel' and x.path = 'video-clips/reel-kev.mp4');

insert into kev.projects (slug, title, client, year, kind, blurb, position)
values ('mood-lab', 'Mood Lab', 'Mood Lab', '2025', 'Brand', null, 120)
on conflict (slug) do nothing;

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'video', 'marcas/mood-lab/mood-lab-ig.mp4', 'marcas/mood-lab/mood-lab-ig-poster.jpg', 1280, 960, 69, 0
from kev.projects where slug = 'mood-lab'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'mood-lab' and x.path = 'marcas/mood-lab/mood-lab-ig.mp4');

insert into kev.projects (slug, title, client, year, kind, blurb, position)
values ('blouw-up', 'Blouw Up', 'Blouw Up', '2024', 'Brand', null, 130)
on conflict (slug) do nothing;

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'video', 'marcas/blouw-up.mp4', 'marcas/blouw-up-poster.jpg', 1280, 960, 31, 0
from kev.projects where slug = 'blouw-up'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'blouw-up' and x.path = 'marcas/blouw-up.mp4');

insert into kev.projects (slug, title, client, year, kind, blurb, position)
values ('moda-cosmos', 'Moda Cosmos', 'Moda Cosmos', '2024', 'Brand', null, 140)
on conflict (slug) do nothing;

insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, 'video', 'marcas/moda-cosmos.mp4', 'marcas/moda-cosmos-poster.jpg', 1280, 960, 26, 0
from kev.projects where slug = 'moda-cosmos'
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = 'moda-cosmos' and x.path = 'marcas/moda-cosmos.mp4');

update kev.site_settings set
  bio = 'KEV is a photographer and music-video director. The work moves between Latin music culture and fashion editorial — campaigns, album cycles, music videos and brand collaborations.',
  clients = array['J Balvin', 'Maluma', 'Maisak', 'FDRS', 'New Era', 'OVY On The Drums', 'Mood Lab']::text[],
  services = array['Photography', 'Music Video Direction', 'Brand Film', 'Creative Direction']::text[],
  contact = '[]'::jsonb, -- placeholders omitidos a propósito: los reales se cargan en /admin
  home_project_slug = 'showreel'
where id;

commit;
