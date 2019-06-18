CREATE DATABASE WashroomCatalog;
use WashroomCatalog;

CREATE TABLE PostalCode(
  Postal_code varchar(255),
  City varchar(255),
  Province varchar(255),
  PRIMARY KEY (Postal_code)
);

CREATE TABLE Building(
  Building_id int AUTO_INCREMENT,
  Name varchar(255),
  Address varchar(255),
  Postal_code varchar(255),
  PRIMARY KEY (Building_id),
  FOREIGN KEY (Postal_code) REFERENCES PostalCode(Postal_code) ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE User(
  User_id int AUTO_INCREMENT,
  Username varchar(255) NOT NULL UNIQUE,
  Password varchar(255) NOT NULL,
  PRIMARY KEY (User_id)
);

CREATE TABLE Necessity(
  Necessity_id int AUTO_INCREMENT,
  name varchar(255),
  Status varchar(255),
  Building_id int,
  PRIMARY KEY (Necessity_id),
  FOREIGN KEY (Building_id) REFERENCES Building(Building_id) ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE Favourite(
  Building_id int AUTO_INCREMENT,
  User_id int,
  PRIMARY KEY (Building_id, User_id),
  FOREIGN KEY (Building_id) REFERENCES Building(Building_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (User_id) REFERENCES User(User_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Rating(
  Rating_id int AUTO_INCREMENT,
  Date datetime,
  Rating varchar(1000) NOT NULL,
  User_id int,
  Necessity_id int NOT NULL,
  PRIMARY KEY (Rating_id),
  FOREIGN KEY (User_id) REFERENCES User(User_id) ON UPDATE CASCADE ON DELETE SET NULL,
  FOREIGN KEY (Necessity_id) REFERENCES Necessity(Necessity_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Comment(
  Comment_id int AUTO_INCREMENT,
  Date datetime,
  Comment varchar(1000) NOT NULL,
  User_id int,
  Necessity_id int NOT NULL,
  PRIMARY KEY (Comment_id),
  FOREIGN KEY (User_id) REFERENCES User(User_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (Necessity_id) REFERENCES Necessity(Necessity_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Importance(
  Severity int,
  Priority int,
  PRIMARY KEY (Severity)
);

CREATE TABLE Incident(
  Incident_id int AUTO_INCREMENT,
  Subject varchar(155) NOT NULL,
  Report_text varchar(1000) NOT NULL,
  Date datetime,    
  Severity int,
  User_id int,
  Necessity_id int NOT NULL,
  PRIMARY KEY (Incident_id),
  FOREIGN KEY (User_id) REFERENCES User(User_id) ON UPDATE CASCADE ON DELETE SET NULL,
  FOREIGN KEY (Necessity_id) REFERENCES Necessity(Necessity_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (Severity) REFERENCES Importance(Severity) ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE UserLike(
  User_id int,
  Necessity_id int,
  PRIMARY KEY (User_id, Necessity_id),
  FOREIGN KEY (User_id) REFERENCES User(User_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (Necessity_id) REFERENCES Necessity(Necessity_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Shower(
  Necessity_id int,
  Sex varchar(255),
  PRIMARY KEY (Necessity_id),
  FOREIGN KEY (Necessity_id) REFERENCES Necessity(Necessity_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Washroom(
  Necessity_id int,
  Sex varchar(255),
  Total_stalls int,
  PRIMARY KEY (Necessity_id),
  FOREIGN KEY (Necessity_id) REFERENCES Necessity(Necessity_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE WaterFountain(
  Necessity_id int,
  Num_fountains int,
  PRIMARY KEY (Necessity_id),
  FOREIGN KEY (Necessity_id) REFERENCES Necessity(Necessity_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Service(
  Necessity_id int,
  Name varchar(255),
  State varchar(255),
  PRIMARY KEY (Name, Necessity_id),
  FOREIGN KEY (Necessity_id) REFERENCES Necessity(Necessity_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE MaintainenceCompany(
  Company_id int AUTO_INCREMENT,
  Name varchar(255),
  Description varchar(1000),
  Phone_number varchar(12),
  PRIMARY KEY (Company_id)
);

CREATE TABLE MaintainedBy(
  Necessity_id int,
  Company_id int,
  PRIMARY KEY (Necessity_id, Company_id),
  FOREIGN KEY (Company_id) REFERENCES MaintainenceCompany(Company_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (Necessity_id) REFERENCES Necessity(Necessity_id) ON UPDATE CASCADE ON DELETE CASCADE
);


INSERT INTO
  PostalCode (Postal_code, City, Province)
VALUES
  ('V2H8D9', 'Vancouver', 'BC'),
  ('V4H3D8', 'Vancouver', 'BC'),
  ('V4H3G7', 'Vancouver', 'BC'),
  ('V4H3G3', 'Vancouver', 'BC'),
  ('V4H3D2', 'Vancouver', 'BC');

INSERT INTO
  Building (Name, Address, Postal_code)
VALUES
  ('Computer science', '1111 someplace road', 'V2H8D9'),
  ('Buchanan', '1234 anotherplace st', 'V4H3D8'),
  ('Museum of anthropology', '2377 abc st ', 'V4H3D2'),
  ('Museum of Biology', '4723 abc st', 'V4H3G7'),
  ('Thunderbird', '1233 abc st', 'V4H3G3'),
  ('Buchanan', '1111 someplace road', 'V2H8D9');

INSERT INTO
  User ( Username, Password)
VALUES
  ('User1', 'k7ZGtS'),
  ('User2', '8yHPoJ'),
  ('User3', 'mGmMT6'),
  ('User4', 'kvJt5e'),
  ('User5', 'uWV7br');

INSERT INTO
  Necessity ( Status, name, Building_id)
VALUES
  ('closed', 'The Bog', 2),
  ('closed', 'Shower Thoughts', 3),
  ('open', 'Shower', 3),
  ('open', 'The Drizzle', 2),
  ('open', 'The Other Bog', 1),
  ('broken', 'Lavish Lavatory', 2),
  ('open', 'John Crapper', 2),
  ('broken', 'The Bog', 3),
  ('closed', 'The Oval Office', 3),
  ('broken', 'The Loo', 3),
  ('broken', 'Watering Hole 1', 3),
  ('closed', 'Watering Hole 2', 2),
  ( 'broken', 'Watering Hole 3', 1),
  ('closed', 'Watering Hole 4', 4),
  ('closed', 'The Water Tavern', 3);

INSERT INTO
  Favourite (Building_id, User_id)
VALUES
  (1, 5),
  (2, 5),
  (3, 2),
  (1, 3),
  (1, 4);

INSERT INTO
  Rating (Date, Rating, User_id, Necessity_id)
VALUES
  ('2019-02-01', 4, 1, 2),
  ( '2019-01-25', 4, 2, 1),
  ( '2019-03-11', 5, 4, 2),
  ( '2019-02-15', 3, 5, 5),
  ('2019-01-11', 2, 1, 3);

INSERT INTO
  Comment (Date, Comment, User_id, Necessity_id)
VALUES
  ( '2019-04-01 21:12:11', 'I had a great time', 3, 4),
  ( '2019-02-21 02:22:23', 'It was horrifying', 2, 2),
  ( '2019-03-02 21:15:00', 'What a nice atmosphere', 1, 1),
  ( '2019-04-12 15:32:43', 'What a relief', 2, 4),
  ( '2019-04-15 20:52:22', 'I was so thirsty', 5, 2);

INSERT INTO
  Importance (Severity, Priority)
VALUES
  (1, 1),
  (2, 1),
  (3, 2),
  (4, 3),
  (5, 3);

INSERT INTO
  Incident (Subject, Report_text, Date, Severity, User_id, Necessity_id)
VALUES
  ("There's blood everywhere", 'There’s blood everywhere', '2019-04-13 02:52:41', 2, 2, 1),
  ("Severely Clogged Toilets", 'The urinal is clogged', '2019-05-19 22:12:11', 3, 3, 2),
  ('There is absolutely no toilet paper', 'no toilet paper!', '2019-02-14 08:11:43', 2, 5, 1),
  ("I'm locked in", 'I’m locked in, someone help', '2019-01-22 14:12:22', 1, 5, 3),
  ("No running water", 'There’s no running water', '2019-02-02 12:11:23', 1, 1, 2);

INSERT INTO
  UserLike (User_id, Necessity_id)
VALUES
  (3, 2),
  (2, 4),
  (4, 5),
  (5, 1),
  (1, 2),
  (1, 1),
  (2, 1),
  (3, 1),
  (4, 1);

INSERT INTO
  Shower (Necessity_id, Sex)
VALUES
  (1, 'm'),
  (2, 'm'),
  (3, 'm'),
  (4, 'f'),
  (5, 'f');

INSERT INTO
  Washroom (Necessity_id, Sex, Total_stalls)
VALUES
  (7, 'f', 1),
  (8, 'f', 2),
  (9, 'f', 3),
  (10, 'm', 5),
  (6, 'm', 5);

INSERT INTO
  WaterFountain (Necessity_id, Num_fountains)
VALUES
  (11, 2),
  (12, 1),
  (13, 3),
  (14, 2),
  (15, 4);

INSERT INTO
  Service (Necessity_id, State, Name)
VALUES
  (10, 'Working', 'Diaper changing station'),
  (7, 'Working', 'Urinal'),
  (10, 'Clogged', 'Shampoo'),
  (1, 'Empty', 'Urinal'),
  (6, 'Working', '');

INSERT INTO
  MaintainenceCompany ( Name, Description, Phone_number)
VALUES
  ( 'Abc washrooms co.', 'plumber', '584-343-3434'),
  ( 'Water restoration', 'Water purifier team', '422-232-4433'),
  ( 'Hinge masters', 'Washroom stall maintenance', '242-242-1212'),
  ('Doug’s Urinals', 'Urinal maintenance', '458-231-5666'),
  ( 'Clean', 'Cleaner service', '322-233-2222'),
  ('Clean', 'Plumbing service', '123-456-7890');

INSERT INTO
  MaintainedBy (Necessity_id, Company_id)
VALUES
  (10, 4),
  (6, 4),
  (11, 2),
  (12, 2),
  (13, 2);
