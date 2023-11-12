-- 1. Create Database --
CREATE DATABASE nutrition_tracker
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- 2. Create users Table --
CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(25) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    last_signed_in TIMESTAMP
);

-- 3. Create breakfasts Table --
CREATE TABLE breakfasts (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    name VARCHAR(50) NOT NULL,
    calories INTEGER,
    total_fat INTEGER,
    cholesterol INTEGER,
    sodium INTEGER,
    total_carbohydrate INTEGER,
    protein INTEGER,
    timestamp TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- 4. Create lunches Table --
CREATE TABLE lunches (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    name VARCHAR(50) NOT NULL,
    calories INTEGER,
    total_fat INTEGER,
    cholesterol INTEGER,
    sodium INTEGER,
    total_carbohydrate INTEGER,
    protein INTEGER,
    timestamp TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- 5. Create dinners Table --
CREATE TABLE dinners (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    name VARCHAR(50) NOT NULL,
    calories INTEGER,
    total_fat INTEGER,
    cholesterol INTEGER,
    sodium INTEGER,
    total_carbohydrate INTEGER,
    protein INTEGER,
    timestamp TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- 6. Create snacks Table --
CREATE TABLE snacks (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    name VARCHAR(50) NOT NULL,
    calories INTEGER,
    total_fat INTEGER,
    cholesterol INTEGER,
    sodium INTEGER,
    total_carbohydrate INTEGER,
    protein INTEGER,
    timestamp TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);
