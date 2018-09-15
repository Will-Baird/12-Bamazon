DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products
(
    id INT NOT NULL
    AUTO_INCREMENT,
    product_name VARCHAR
    (45) NULL,
    department_name VARCHAR
    (45) NULL,
    price DECIMAL
    (10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY
    (id)
);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Shirt", "Clothing", 25.00, 200);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Pants", "Clothing", 30.00, 250);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Boots", "Shoes", 50.00, 150);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Crocs", "Shoes", 25.00, 100000);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Necklace", "Jewelry", 250.00, 100);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Watch", "Jewelry", 500.00, 10);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Ring", "Jewelry", 1500.00, 5);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Phone", "Electronics", 800.00, 75);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("TV", "Electronics", 900.00, 15);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Mansion", "VIP", 1000000000.00, 1);