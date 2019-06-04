CREATE DATABASE WashroomCatalog;
use WashroomCatalog;

CREATE TABLE User (
  name VARCHAR(20),
  passwrd VARCHAR(10)
);

INSERT INTO User
  (name, passwrd)
VALUES
  ('User1', 'asdf'),
  ('User2', 'asdfvcd');
