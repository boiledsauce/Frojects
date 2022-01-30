CREATE TABLE User(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Avatar VARCHAR(50) NOT NULL
)

CREATE TABLE Project(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    OwnerId INT NOT NULL,
    CreationDate datetime NOT NULL,

    FOREIGN KEY (ownerId) REFERENCES User(Id) ON DELETE CASCADE
)


CREATE TABLE UserProjectAccess(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    ProjectId INT NOT NULL,
    InviteDate datetime NOT NULL,

    FOREIGN KEY (UserId) REFERENCES User(Id) ON DELETE CASCADE,
    FOREIGN KEY (ProjectId) REFERENCES Project(Id) ON DELETE CASCADE
)


CREATE TABLE Task(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    ProjectId INT NOT NULL, 
    Title VARCHAR(255) NOT NULL,
    [Description] VARCHAR(255) NOT NULL,
    CreationDate datetime NOT NULL,

    FOREIGN KEY (ProjectId) REFERENCES Project(Id) ON DELETE CASCADE
)

CREATE TABLE Comment(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    ProjectId INT NOT NULL, 
    Title VARCHAR(255) NOT NULL,
    [Description] VARCHAR(255) NOT NULL,
    CreationDate datetime NOT NULL,

    FOREIGN KEY (ProjectId) REFERENCES Project(Id) ON DELETE CASCADE
)

CREATE TABLE Deadline(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    TaskId INT NOT NULL, 
    Deadline datetime NOT NULL,

    FOREIGN KEY (TaskId) REFERENCES Task(Id) ON DELETE CASCADE
)

