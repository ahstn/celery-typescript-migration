-- Generated by https://www.mockaroo.com/

insert into public.user (forename, surname)
values  ('Nancey', 'Constance'),
        ('Rudd', 'Janaway'),
        ('Alexandrina', 'Longland'),
        ('Job', 'Gillyett'),
        ('Arlin', 'Ungerechts'),
        ('Shanan', 'Andreuzzi'),
        ('Giulio', 'Avo'),
        ('Jeane', 'Abden'),
        ('Tomaso', 'Thoday'),
        ('Rad', 'Rowat');

insert into public.brand (name)
values  ('Hermès'),
        ('Tom Ford'),
        ('Yves Saint Laurent'),
        ('Dior'),
        ('Guerlain'),
        ('Kilian'),
        ('Van Cleef & Arpels'),
        ('Givenchy');

insert into public.collection (brand_id, description)
values  (1, 'd''Terre Hermès'),
        (2, 'Dior Homme'),
        (6, 'The Liquors'),
        (7, 'Extraordinaire');

insert into public.fragrance (brand_id, collection_id, concentration, title)
values  (1, 1, 'edt', 'Terre d''Hermès'),
        (1, 1, 'edp', 'Terre d''Hermès Eau Intense Vetiver'),
        (6, 3, 'edt', 'Homme'),
        (6, 3, 'edp', 'Homme Intense'),
        (6, 3, 'edp', 'Apple Brandy'),
        (6, 3, 'edp', 'Angels'' Share'),
        (6, 3, 'edp', 'Roses on Ice'),
        (7, 4, 'edp', 'Moonlight Patchouli');

insert into public.review (user_id, fragrance_id, longevity, projection, value, scent)
values  (1, 1, 4, 3, 3, 4),
        (3, 1, 4, 3, 4, 5),
        (3, 1, 4, 3, 3, 4);