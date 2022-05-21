create database perfumer with owner "postgres";

create schema if not exists public;
alter schema public owner to "postgres";
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

create table if not exists "user" (
    id       serial
        constraint user_pk
            primary key,
    forename varchar(30) not null,
    surname  varchar(30) not null
);
create unique index if not exists user_id_uindex
    on "user" (id);

create table if not exists review (
    id         serial
        constraint review_pk
            primary key,
    user_id    integer             not null
        constraint review_user_id_fk
            references "user",
    fragrance_id integer           not null
        constraint review_fragrance_id_fk
            references fragrance,
    longevity  integer default 0 not null,
    projection integer default 0 not null,
    scent      integer default 0 not null,
    "value"    integer default 0 not null,
    constraint valid_scores
        check ((longevity <= 5) and (projection <= 5) and (sillage <= 5) and (scent <= 5))
);
create unique index if not exists review_id_uindex
    on review (id);

create type season as ENUM ('spring', 'summer', 'autumn', 'winter');
