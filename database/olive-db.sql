CREATE DATABASE olive-db;

USE olive-db

CREATE TABLE Product (
    ProductID INT  NOT NULL AUTO_INCREMENT, 
    Name VARCHAR(255), 
    Qantity INT, 
    PRIMARY KEY(ProductID),
    Foreign KEY(StoreID) REFERENCES Stores(StoreID)
    ); 

INSERT INTO Product (Name, quantity, StoreID) values ("apple", 15,1);
INSERT INTO Product (Name, quantity, StoreID) values ("banana", 10,2);
INSERT INTO Product (Name, quantity, StoreID) values ("apple", 25,2);
INSERT INTO Product (Name, quantity, StoreID) values ("banana", 1,2);



CREATE TABLE Stores (
    StoreID INT  NOT NULL AUTO_INCREMENT, 
    StoreName VARCHAR(255), 
    Address VARCHAR(255), 
    PRIMARY KEY(StoreID)
    ); 
INSERT INTO Stores (StoreName, Address) values ('Paramatta', 'Westfield Mall, Paramatta, NSW');
INSERT INTO Stores (StoreName, Address) values ('Surry Hills', '1 AlanBorder st, Surry Hills, NSW');




