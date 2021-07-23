DROP TABLE IF EXISTS foes;

CREATE TABLE foes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  level INTEGER NOT NULL
);

DROP TABLE IF EXISTS items;

CREATE TABLE items (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL
);

DROP TABLE IF EXISTS drinks;

CREATE TABLE drinks (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  flavor TEXT NOT NULL,
  adult BOOLEAN
)

DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  genre TEXT NOT NULL
);