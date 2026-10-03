-- Carga de FOTOS/ (2026-09-22): reemplaza las galerías de 5 proyectos y agrega 5 nuevos.
-- Archivos en kev-media/fotos/<slug>/ (2560 px, JPEG q86). Idempotente.
begin;
update kev.projects set title = 'Ciudad Primavera' where slug = 'j-balvin';
insert into kev.projects (slug, title, client, kind, position) values ('aron', 'Aron', 'Aron', 'Photography', 150) on conflict (slug) do nothing;
insert into kev.projects (slug, title, client, kind, position) values ('maluma-loco-x-volver', 'Loco × Volver', 'Maluma', 'Photography', 160) on conflict (slug) do nothing;
insert into kev.projects (slug, title, client, kind, position) values ('medallo-en-el-mapa', 'Medallo en el Mapa', 'Maluma × Feid', 'Photography', 170) on conflict (slug) do nothing;
insert into kev.projects (slug, title, client, kind, position) values ('golden-shooting', 'Golden — Shooting', 'Golden', 'Photography', 180) on conflict (slug) do nothing;
insert into kev.projects (slug, title, client, kind, position) values ('tucutum', 'Tucutum', 'Greeicy × Mike Bahía', 'Photography', 190) on conflict (slug) do nothing;
delete from kev.media where type = 'image' and project_id = (select id from kev.projects where slug = 'j-balvin');
insert into kev.media (project_id, type, path, width, height, position)
select p.id, 'image', v.path, v.w, v.h, v.pos from kev.projects p,
 (values
  ('fotos/j-balvin/j-balvin-4.jpg', 1707, 2560, 0),
  ('fotos/j-balvin/j-balvin-9.jpg', 1707, 2560, 10),
  ('fotos/j-balvin/j-balvin-12.jpg', 1707, 2560, 20),
  ('fotos/j-balvin/j-balvin-13.jpg', 1707, 2560, 30),
  ('fotos/j-balvin/j-balvin-13-b.jpg', 1707, 2560, 40),
  ('fotos/j-balvin/j-balvin-25.jpg', 1707, 2560, 50),
  ('fotos/j-balvin/j-balvin-26.jpg', 1707, 2560, 60),
  ('fotos/j-balvin/j-balvin-35.jpg', 1707, 2560, 70),
  ('fotos/j-balvin/j-balvin-40.jpg', 1707, 2560, 80),
  ('fotos/j-balvin/j-balvin-51.jpg', 1707, 2560, 90),
  ('fotos/j-balvin/j-balvin-55.jpg', 1707, 2560, 100),
  ('fotos/j-balvin/j-balvin-56.jpg', 1707, 2560, 110),
  ('fotos/j-balvin/j-balvin-57.jpg', 1707, 2560, 120),
  ('fotos/j-balvin/j-balvin-61.jpg', 1707, 2560, 130),
  ('fotos/j-balvin/j-balvin-63.jpg', 1707, 2560, 140),
  ('fotos/j-balvin/j-balvin-81.jpg', 1707, 2560, 150),
  ('fotos/j-balvin/j-balvin-110.jpg', 1707, 2560, 160),
  ('fotos/j-balvin/j-balvin-118.jpg', 1707, 2560, 170),
  ('fotos/j-balvin/j-balvin-140.jpg', 1707, 2560, 180),
  ('fotos/j-balvin/j-balvin-146.jpg', 1707, 2560, 190),
  ('fotos/j-balvin/j-balvin-162.jpg', 1707, 2560, 200),
  ('fotos/j-balvin/j-balvin-166.jpg', 1706, 2560, 210),
  ('fotos/j-balvin/j-balvin-183.jpg', 1707, 2560, 220),
  ('fotos/j-balvin/j-balvin-188.jpg', 1707, 2560, 230),
  ('fotos/j-balvin/j-balvin-201.jpg', 1707, 2560, 240)) as v(path, w, h, pos)
where p.slug = 'j-balvin';
delete from kev.media where type = 'image' and project_id = (select id from kev.projects where slug = 'maluma-x-maisak');
insert into kev.media (project_id, type, path, width, height, position)
select p.id, 'image', v.path, v.w, v.h, v.pos from kev.projects p,
 (values
  ('fotos/maluma-x-maisak/maisak-10.jpg', 1707, 2560, 0),
  ('fotos/maluma-x-maisak/maluma-14.jpg', 1707, 2560, 10),
  ('fotos/maluma-x-maisak/maluma-15.jpg', 1707, 2560, 20),
  ('fotos/maluma-x-maisak/maluma-16.jpg', 1707, 2560, 30),
  ('fotos/maluma-x-maisak/maisak-28.jpg', 1707, 2560, 40),
  ('fotos/maluma-x-maisak/maisak-29.jpg', 1707, 2560, 50),
  ('fotos/maluma-x-maisak/maluma-44.jpg', 1707, 2560, 60),
  ('fotos/maluma-x-maisak/maluma-72.jpg', 1707, 2560, 70),
  ('fotos/maluma-x-maisak/maluma-78.jpg', 1707, 2560, 80),
  ('fotos/maluma-x-maisak/maisak-107.jpg', 1707, 2560, 90),
  ('fotos/maluma-x-maisak/maisak-113.jpg', 1707, 2560, 100)) as v(path, w, h, pos)
where p.slug = 'maluma-x-maisak';
delete from kev.media where type = 'image' and project_id = (select id from kev.projects where slug = 'maisak-shooting');
insert into kev.media (project_id, type, path, width, height, position)
select p.id, 'image', v.path, v.w, v.h, v.pos from kev.projects p,
 (values
  ('fotos/maisak-shooting/maysak-5.jpg', 1707, 2560, 0),
  ('fotos/maisak-shooting/maysak-14.jpg', 1707, 2560, 10),
  ('fotos/maisak-shooting/maysak-22.jpg', 1707, 2560, 20),
  ('fotos/maisak-shooting/maysak-24.jpg', 1707, 2560, 30),
  ('fotos/maisak-shooting/maysak-34.jpg', 1707, 2560, 40),
  ('fotos/maisak-shooting/maysak-92.jpg', 1707, 2560, 50),
  ('fotos/maisak-shooting/maysak-99.jpg', 1707, 2560, 60),
  ('fotos/maisak-shooting/maysak-103.jpg', 1707, 2560, 70),
  ('fotos/maisak-shooting/maysak-109.jpg', 1707, 2560, 80),
  ('fotos/maisak-shooting/maysak-110.jpg', 1707, 2560, 90)) as v(path, w, h, pos)
where p.slug = 'maisak-shooting';
delete from kev.media where type = 'image' and project_id = (select id from kev.projects where slug = 'fdrs');
insert into kev.media (project_id, type, path, width, height, position)
select p.id, 'image', v.path, v.w, v.h, v.pos from kev.projects p,
 (values
  ('fotos/fdrs/maisak-5.jpg', 1707, 2560, 0),
  ('fotos/fdrs/maisak-32.jpg', 1707, 2560, 10),
  ('fotos/fdrs/maisak-52.jpg', 1707, 2560, 20),
  ('fotos/fdrs/maisak-63.jpg', 1707, 2560, 30),
  ('fotos/fdrs/maisak-65.jpg', 1707, 2560, 40),
  ('fotos/fdrs/maisak-68.jpg', 1707, 2560, 50)) as v(path, w, h, pos)
where p.slug = 'fdrs';
delete from kev.media where type = 'image' and project_id = (select id from kev.projects where slug = 'kev-x-new-era');
insert into kev.media (project_id, type, path, width, height, position)
select p.id, 'image', v.path, v.w, v.h, v.pos from kev.projects p,
 (values
  ('fotos/kev-x-new-era/dis1.jpg', 2160, 1350, 0),
  ('fotos/kev-x-new-era/dis2.jpg', 2160, 1350, 10),
  ('fotos/kev-x-new-era/dis3.jpg', 2160, 1350, 20),
  ('fotos/kev-x-new-era/dis4.jpg', 2160, 1350, 30),
  ('fotos/kev-x-new-era/dis5.jpg', 2160, 1350, 40),
  ('fotos/kev-x-new-era/dis6.jpg', 2160, 1350, 50),
  ('fotos/kev-x-new-era/dis7.jpg', 2160, 1350, 60),
  ('fotos/kev-x-new-era/dis8.jpg', 2160, 1350, 70)) as v(path, w, h, pos)
where p.slug = 'kev-x-new-era';
delete from kev.media where type = 'image' and project_id = (select id from kev.projects where slug = 'aron');
insert into kev.media (project_id, type, path, width, height, position)
select p.id, 'image', v.path, v.w, v.h, v.pos from kev.projects p,
 (values
  ('fotos/aron/aron-2.jpg', 1707, 2560, 0),
  ('fotos/aron/aron-4.jpg', 1707, 2560, 10),
  ('fotos/aron/aron-7.jpg', 1707, 2560, 20),
  ('fotos/aron/aron-9.jpg', 2560, 1707, 30),
  ('fotos/aron/aron-10.jpg', 2560, 1707, 40),
  ('fotos/aron/aron-11.jpg', 2560, 1707, 50),
  ('fotos/aron/aron-12.jpg', 2560, 1707, 60),
  ('fotos/aron/aron-13.jpg', 2560, 1707, 70),
  ('fotos/aron/aron-15.jpg', 1707, 2560, 80),
  ('fotos/aron/aron-16.jpg', 1707, 2560, 90),
  ('fotos/aron/aron-18.jpg', 2560, 1707, 100),
  ('fotos/aron/aron-19.jpg', 2560, 1707, 110),
  ('fotos/aron/aron-20.jpg', 2560, 1707, 120),
  ('fotos/aron/aron-21.jpg', 2560, 1707, 130),
  ('fotos/aron/aron-22.jpg', 2560, 1707, 140),
  ('fotos/aron/aron-23.jpg', 2560, 1707, 150),
  ('fotos/aron/aron-24.jpg', 2560, 1707, 160)) as v(path, w, h, pos)
where p.slug = 'aron';
delete from kev.media where type = 'image' and project_id = (select id from kev.projects where slug = 'maluma-loco-x-volver');
insert into kev.media (project_id, type, path, width, height, position)
select p.id, 'image', v.path, v.w, v.h, v.pos from kev.projects p,
 (values
  ('fotos/maluma-loco-x-volver/j-l-11.jpg', 1707, 2560, 0),
  ('fotos/maluma-loco-x-volver/j-l-13.jpg', 1707, 2560, 10),
  ('fotos/maluma-loco-x-volver/j-l-20.jpg', 1707, 2560, 20),
  ('fotos/maluma-loco-x-volver/j-l-24.jpg', 1707, 2560, 30),
  ('fotos/maluma-loco-x-volver/j-l-31.jpg', 1707, 2560, 40),
  ('fotos/maluma-loco-x-volver/j-l-32.jpg', 1707, 2560, 50),
  ('fotos/maluma-loco-x-volver/j-l-33.jpg', 1707, 2560, 60),
  ('fotos/maluma-loco-x-volver/j-l-44.jpg', 1707, 2560, 70),
  ('fotos/maluma-loco-x-volver/j-l-49.jpg', 1707, 2560, 80),
  ('fotos/maluma-loco-x-volver/j-l-76.jpg', 1707, 2560, 90),
  ('fotos/maluma-loco-x-volver/j-l-122.jpg', 1707, 2560, 100),
  ('fotos/maluma-loco-x-volver/j-l-144.jpg', 1707, 2560, 110),
  ('fotos/maluma-loco-x-volver/j-l-145.jpg', 1707, 2560, 120),
  ('fotos/maluma-loco-x-volver/j-l-148.jpg', 1707, 2560, 130),
  ('fotos/maluma-loco-x-volver/j-l-179.jpg', 1707, 2560, 140)) as v(path, w, h, pos)
where p.slug = 'maluma-loco-x-volver';
delete from kev.media where type = 'image' and project_id = (select id from kev.projects where slug = 'medallo-en-el-mapa');
insert into kev.media (project_id, type, path, width, height, position)
select p.id, 'image', v.path, v.w, v.h, v.pos from kev.projects p,
 (values
  ('fotos/medallo-en-el-mapa/maluma.jpg', 1707, 2560, 0),
  ('fotos/medallo-en-el-mapa/maluma-4.jpg', 1707, 2560, 10),
  ('fotos/medallo-en-el-mapa/maluma-7.jpg', 1707, 2560, 20),
  ('fotos/medallo-en-el-mapa/maluma-12.jpg', 1707, 2560, 30),
  ('fotos/medallo-en-el-mapa/maluma-13-2.jpg', 1707, 2560, 40),
  ('fotos/medallo-en-el-mapa/maluma-15.jpg', 1707, 2560, 50),
  ('fotos/medallo-en-el-mapa/maluma-16.jpg', 1707, 2560, 60),
  ('fotos/medallo-en-el-mapa/feid-17.jpg', 1707, 2560, 70),
  ('fotos/medallo-en-el-mapa/maluma-19.jpg', 1707, 2560, 80),
  ('fotos/medallo-en-el-mapa/maluma-24.jpg', 1707, 2560, 90),
  ('fotos/medallo-en-el-mapa/feid-29.jpg', 1707, 2560, 100),
  ('fotos/medallo-en-el-mapa/maluma-29.jpg', 1707, 2560, 110),
  ('fotos/medallo-en-el-mapa/maluma-32.jpg', 1707, 2560, 120),
  ('fotos/medallo-en-el-mapa/feid-34.jpg', 1707, 2560, 130),
  ('fotos/medallo-en-el-mapa/maluma-35.jpg', 1707, 2560, 140)) as v(path, w, h, pos)
where p.slug = 'medallo-en-el-mapa';
delete from kev.media where type = 'image' and project_id = (select id from kev.projects where slug = 'golden-shooting');
insert into kev.media (project_id, type, path, width, height, position)
select p.id, 'image', v.path, v.w, v.h, v.pos from kev.projects p,
 (values
  ('fotos/golden-shooting/estudio-13.jpg', 1707, 2560, 0),
  ('fotos/golden-shooting/estudio-22.jpg', 1707, 2560, 10),
  ('fotos/golden-shooting/estudio-82.jpg', 1707, 2560, 20),
  ('fotos/golden-shooting/estudio-137.jpg', 1707, 2560, 30),
  ('fotos/golden-shooting/estudio-138.jpg', 1707, 2560, 40),
  ('fotos/golden-shooting/estudio-141.jpg', 1707, 2560, 50),
  ('fotos/golden-shooting/estudio-168.jpg', 1707, 2560, 60),
  ('fotos/golden-shooting/estudio-175.jpg', 1707, 2560, 70),
  ('fotos/golden-shooting/estudio-192.jpg', 1707, 2560, 80),
  ('fotos/golden-shooting/estudio-203.jpg', 1706, 2560, 90)) as v(path, w, h, pos)
where p.slug = 'golden-shooting';
delete from kev.media where type = 'image' and project_id = (select id from kev.projects where slug = 'tucutum');
insert into kev.media (project_id, type, path, width, height, position)
select p.id, 'image', v.path, v.w, v.h, v.pos from kev.projects p,
 (values
  ('fotos/tucutum/myg-10.jpg', 1707, 2560, 0),
  ('fotos/tucutum/myg-13-2.jpg', 1707, 2560, 10),
  ('fotos/tucutum/myg-13.jpg', 1707, 2560, 20),
  ('fotos/tucutum/myg-14.jpg', 1707, 2560, 30),
  ('fotos/tucutum/myg-15.jpg', 2560, 1707, 40),
  ('fotos/tucutum/myg-23.jpg', 1707, 2560, 50),
  ('fotos/tucutum/myg-24.jpg', 2560, 1707, 60),
  ('fotos/tucutum/myg-25.jpg', 2560, 1707, 70),
  ('fotos/tucutum/myg-27.jpg', 2560, 1707, 80),
  ('fotos/tucutum/myg-29.jpg', 2560, 1707, 90),
  ('fotos/tucutum/myg-31.jpg', 2560, 1707, 100),
  ('fotos/tucutum/myg-39.jpg', 1707, 2560, 110),
  ('fotos/tucutum/myg-42.jpg', 1707, 2560, 120),
  ('fotos/tucutum/myg-48.jpg', 2560, 1707, 130),
  ('fotos/tucutum/myg-59.jpg', 1707, 2560, 140),
  ('fotos/tucutum/myg-65.jpg', 1707, 2560, 150),
  ('fotos/tucutum/myg-73.jpg', 2560, 1707, 160),
  ('fotos/tucutum/myg-76.jpg', 1707, 2560, 170),
  ('fotos/tucutum/myg-78.jpg', 2560, 1707, 180),
  ('fotos/tucutum/myg-81.jpg', 1707, 2560, 190),
  ('fotos/tucutum/myg-86.jpg', 1707, 2560, 200),
  ('fotos/tucutum/myg-93.jpg', 2560, 1707, 210),
  ('fotos/tucutum/myg-108.jpg', 1707, 2560, 220),
  ('fotos/tucutum/myg-111.jpg', 1707, 2560, 230),
  ('fotos/tucutum/myg-116.jpg', 2560, 1707, 240),
  ('fotos/tucutum/myg-118.jpg', 2560, 1707, 250),
  ('fotos/tucutum/myg-120.jpg', 2560, 1707, 260),
  ('fotos/tucutum/myg-121.jpg', 1707, 2560, 270)) as v(path, w, h, pos)
where p.slug = 'tucutum';
commit;
