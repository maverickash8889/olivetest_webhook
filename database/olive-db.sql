CREATE DATABASE olive-db;

USE olive-db

CREATE TABLE Product (
    ProductID INT  NOT NULL AUTO_INCREMENT, 
    Name VARCHAR(255), 
    Qantity INT, 
    PRIMARY KEY(ProductID),
    Foreign KEY(StoreID) REFERENCES Stores(StoreID)
    ); 

INSERT INTO product (Name, quantity, 1) values ("apple", 15);
INSERT INTO product (Name, quantity, 1) values ("banana", 10);
INSERT INTO product (Name, quantity, 2) values ("apple", 25);
INSERT INTO product (Name, quantity, 2) values ("banana", 1);



CREATE TABLE Stores (
    StoreID INT  NOT NULL AUTO_INCREMENT, 
    StoreName VARCHAR(255), 
    Address VARCHAR(255), 
    PRIMARY KEY(StoreID),
    ); 
INSERT INTO stores (StoreName, Address) values ('Paramatta', 'Westfield Mall, Paramatta, NSW');
INSERT INTO stores (StoreName, Address) values ('Surry Hills', '1 AlanBorder st, Surry Hills, NSW');




