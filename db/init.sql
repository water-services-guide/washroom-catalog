CREATE DATABASE WashroomCatalog;
use WashroomCatalog;

CREATE TABLE PostalCode(
  Postal_code varchar(255),
  City varchar(255),
  Province varchar(255),
  PRIMARY KEY (Postal_code)
);

CREATE TABLE Building(
  Building_id int,
  Name varchar(255),
  Address varchar(255),
  Postal_code varchar(255),
  PRIMARY KEY (Building_id),
  FOREIGN KEY (Postal_code) REFERENCES PostalCode(Postal_code) ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE User(
  User_id int,
  Username varchar(255) NOT NULL UNIQUE,
  Password varchar(255) NOT NULL,
  PRIMARY KEY (User_id)
);

CREATE TABLE Necessity(
  Necessity_id int,
  Status varchar(255),
  Building_id int,
  PRIMARY KEY (Necessity_id),
  FOREIGN KEY (Building_id) REFERENCES Building(Building_id) ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE Favourite(
  Building_id int,
  User_id int,
  PRIMARY KEY (Building_id, User_id),
  FOREIGN KEY (Building_id) REFERENCES Building(Building_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (User_id) REFERENCES User(User_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Rating(
  Rating_id int,
  Date datetime,
  Rating varchar(1000) NOT NULL,
  User_id int,
  Necessity_id int NOT NULL,
  PRIMARY KEY (Rating_id),
  FOREIGN KEY (User_id) REFERENCES User(User_id) ON UPDATE CASCADE ON DELETE SET NULL,
  FOREIGN KEY (Necessity_id) REFERENCES Necessity(Necessity_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Comment(
  Comment_id int,
  Date datetime,
  Comment varchar(1000) NOT NULL,
  User_id int,
  Necessity_id int NOT NULL,
  PRIMARY KEY (Comment_id),
  FOREIGN KEY (User_id) REFERENCES User(User_id) ON UPDATE CASCADE ON DELETE SET NULL,
  FOREIGN KEY (Necessity_id) REFERENCES Necessity(Necessity_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Incident(
  Incident_id int,
  Report_text varchar(1000) NOT NULL,
  Date datetime,
  Severity int,
  Priority int,
  User_id int,
  Necessity_id int NOT NULL,
  PRIMARY KEY (Incident_id),
  FOREIGN KEY (User_id) REFERENCES User(User_id) ON UPDATE CASCADE ON DELETE SET NULL,
  FOREIGN KEY (Necessity_id) REFERENCES Necessity(Necessity_id) ON UPDATE CASCADE ON DELETE CASCADE
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
  Company_id int,
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
  User (User_id, Username, Password)
VALUES
  (1, 'User1', 'k7ZGtS'),
  (2, 'User2', '8yHPoJ'),
  (3, 'User3', 'mGmMT6'),
  (4, 'User4', 'kvJt5e'),
  (5, 'User5', 'uWV7br');
