create database perfumer with owner "adam.houston";

create schema public;
alter schema public owner to "adam.houston";
grant create, usage on schema public to public;


create table if not exists brand (
    id   serial
        constraint brand_pk
            primary key,
    name text not null
);

create unique index if not exists brand_id_uindex
    on brand (id);

create table if not exists collection (
    id          serial
        constraint collection_pk
            primary key,
    brand_id    integer not null
        constraint collection_brand_id_fk
            references brand,
    description text
);

create unique index if not exists collection_id_uindex
    on collection (id);

-- This should maybe be a table
create type concentration as ENUM ('edc', 'edt', 'edp', 'perfume');
create table if not exists fragrance (
    id            serial
        constraint fragrance_pk
            primary key,
    brand_id      integer       not null
        constraint fragrance_brand_id_fk
            references brand,
    collection_id integer
        constraint fragrance_collection_id_fk
            references collection,
    concentration concentration not null,
    title         text          not null
);

create unique index if not exists fragrance_id_uindex
    on fragrance (id);

create table if not exists note (
    id    serial
        constraint note_pk
            primary key,
    title text
);

create unique index if not exists note_id_uindex
    on note (id);

create table if not exists fragrance_notes (
    fragrance_id integer not null
        constraint fragrance_fk
            references fragrance,
    note_id      integer not null
        constraint note_fk
            references note
);


create type season as ENUM ('spring', 'summer', 'autumn', 'winter');
