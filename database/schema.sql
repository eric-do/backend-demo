DROP DATABASE IF EXISTS atelier;

CREATE DATABASE atelier;

USE atelier;

CREATE TABLE reviews_temp (
    id INT,
    product_id INT,
    rating INT,
    date DATETIME,
    summary TEXT,
    body TEXT,
    recommend BOOLEAN,
    reported BOOLEAN,
    reviewer_name VARCHAR(50),
    reviewer_email VARCHAR(50),
    response VARCHAR(255),
    helpfulness INT,
    PRIMARY KEY (id)
);

CREATE TABLE reviews (
    id INT,
    product_id INT,
    rating INT,
    date DATETIME,
    summary TEXT,
    body TEXT,
    recommend BOOLEAN,
    reported BOOLEAN,
    reviewer_name VARCHAR(50),
    reviewer_email VARCHAR(50),
    response VARCHAR(255),
    helpfulness INT,
    PRIMARY KEY (id)
);

CREATE TABLE characteristics (
    id INT,
    product_id INT,
    name VARCHAR(20),
    PRIMARY KEY (id)
);

CREATE TABLE characteristic_reviews (
    id INT,
    characteristic_id INT,
    review_id INT,
    value INT,
    PRIMARY KEY (id),
    FOREIGN KEY (review_id)
        REFERENCES reviews(id)
        ON DELETE CASCADE
);

-- LOAD DATA LOCAL INFILE './csv/reviews_temp.csv'
-- INTO TABLE reviews_temp FIELDS TERMINATED BY ','
-- OPTIONALLY ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS (
--     id,
--     product_id,
--     rating,
--     @var1,
--     summary,
--     body,
--     recommend,
--     reported,
--     reviewer_name,
--     reviewer_email,
--     response,
--     helpfulness
-- )
-- SET date=FROM_UNIXTIME(@var1/1000);

-- DELETE FROM reviews_temp WHERE rating > 5;

-- INSERT INTO reviews SELECT * FROM reviews_temp;