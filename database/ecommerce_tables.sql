create table users(
user_id int  IDENTITY (1,1)PRIMARY KEY,
user_name varchar(255),
first_name varchar(255),
last_name varchar(255),
email varchar(255) UNIQUE,
password varchar(255),
isConfirmed BIT NOT NULL DEFAULT 1,
isDeleted BIT NOT NULL DEFAULT 0,
isAdmin BIT NOT NULL DEFAULT 0
)
CREATE TABLE products(

product_id int IDENTITY(1,1) PRIMARY KEY,
product_name varchar (255),
product_image VARCHAR(MAX) NOT NULL,
price decimal(10,2),
description varchar(255),
category varchar(255),
product_image varchar(MAX)
)

create table orders(
order_id int identity(1,1) Primary Key,
product_id int FOREIGN KEY REFERENCES products(product_id),
user_id int FOREIGN KEY REFERENCES users(user_id),
product_image VARCHAR(MAX) NOT NULL,
product_name VARCHAR(255) ,
price DECIMAL(10,2),
quantity int)

