CREATE TABLE customer (
    idcustomer INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(45),
    business_name VARCHAR(45),
    address VARCHAR(45),
    phone INT
);
CREATE TABLE product (
    idproduct INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(45),
    price DECIMAL(10,2),
    stock INT
);
CREATE TABLE orders (
    idorder INT AUTO_INCREMENT PRIMARY KEY,
    order_date DATE,
    total DECIMAL(10,2),
    quantity INT,
    customer_idcustomer INT,
    FOREIGN KEY (customer_idcustomer)
    REFERENCES customer(idcustomer)
);
CREATE TABLE order_has_product (
    order_idorder INT,
    product_idproduct INT,
    PRIMARY KEY (order_idorder, product_idproduct),

    FOREIGN KEY (order_idorder)
    REFERENCES orders(idorder),

    FOREIGN KEY (product_idproduct)
    REFERENCES product(idproduct)
);
CREATE TABLE credit (
    idcredit INT AUTO_INCREMENT PRIMARY KEY,
    credit_amount DECIMAL(10,2),
    payment_deadline DATE,
    credit_status VARCHAR(45),
    order_idorder INT,

    FOREIGN KEY (order_idorder)
    REFERENCES orders(idorder)
);
CREATE TABLE payment (
    idpayment INT AUTO_INCREMENT PRIMARY KEY,
    amount_paid DECIMAL(10,2),
    payment_date DATE,
    method VARCHAR(45),
    credit_idcredit INT,

    FOREIGN KEY (credit_idcredit)
    REFERENCES credit(idcredit)
);
SELECT user, host FROM mysql.user;
