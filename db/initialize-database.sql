CREATE TABLE User(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Avatar VARCHAR(50)
)

CREATE TABLE Project(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50),
    OwnerId INT,
    CreationDate datetime,

    FOREIGN KEY (ownerId) REFERENCES User(Id),
)


CREATE TABLE UserProjectAccess(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT,
    ProjectId INT,
    InviteDate datetime,

    FOREIGN KEY (UserId) REFERENCES User(Id),
    FOREIGN KEY (ProjectId) REFERENCES Project(Id)
)


CREATE TABLE Task(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    ProjectId INT, 
    Title VARCHAR(255),
    Description VARCHAR(255),
    CreationDate datetime,

    FOREIGN KEY (ProjectId) REFERENCES Project(Id),
)

CREATE TABLE Comment(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    ProjectId INT, 
    Title VARCHAR(255),
    Description VARCHAR(255),
    CreationDate datetime,

    FOREIGN KEY (ProjectId) REFERENCES Project(Id),
)

CREATE TABLE Deadline(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    TaskId INT, 
    Deadline datetime,

    FOREIGN KEY (TaskId) REFERENCES Task(Id),
)

