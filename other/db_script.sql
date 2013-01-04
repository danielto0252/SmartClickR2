-- Basic SQL script to create the SmartClickR databases --
-- Version 0.1: 11/16/2012
-- Contributors: Daniel To, Brad Fischer

CREATE DATABASE SmartClickR;
USE SmartClickR; 

CREATE TABLE Users(
	User_ID INT NOT NULL auto_increment,
	FirstName VARCHAR(25) NOT NULL, -- size subject to change
	LastName VARCHAR(50) NOT NULL, -- size subject to change
	Email VARCHAR(60) NOT NULL,
	Password VARCHAR(60) NOT NULL,
	Gender CHAR(1), 
	Birthdate DATE default '0000-00-00',
	primary key(User_ID)
);

CREATE TABLE Polls(
	Poll_ID INT NOT NULL auto_increment,
	Owner_ID INT NOT NULL,
	PollName VARCHAR(50) NOT NULL,
	PollOrder INT NOT NULL,
	SessionCode VARCHAR(4) NOT NULL,
	CreateDate DATETIME NOT NULL, 
	StartDate DATETIME,
	EndDate DATETIME,
	primary key(Poll_ID),
	foreign key(Owner_ID) references Users(User_ID)
);

CREATE TABLE Questions(
	Question_ID INT NOT NULL auto_increment,
	Poll_ID INT NOT NULL,
	Stem VARCHAR(255),
	AnswerType VARCHAR(50), -- we'll make an enum type in ndoe and direct the result here
	QuestionsOrder INT NOT NULL,
	primary key(Question_ID),
	foreign key(Poll_ID) references Polls(Poll_ID)
);

CREATE TABLE Choices(
	Choice_ID INT NOT NULL auto_increment,
	Question_ID INT NOT NULL,
	ChoiceOrder INT NOT NULL,
	IsCorrectChoice CHAR(1),
	Content VARCHAR(500),
	primary	key(Choice_ID),
	foreign key(Question_ID) references Questions(Question_ID)
);

CREATE TABLE Responses(
	Response_ID INT NOT NULL auto_increment,
	Choice_ID INT NOT NULL,
	User_ID INT NOT NULL,
	Content VARCHAR(500) NOT NULL,
	primary key(Response_ID),
	foreign key(Choice_ID) references Choices(Choice_ID),
	foreign key(User_ID) references Users(User_ID)
);
