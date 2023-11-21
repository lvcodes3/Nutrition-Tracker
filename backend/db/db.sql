-- 1. Create nutritionTracker Database --
CREATE DATABASE "nutritionTracker"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- 2. Create consumer Table --
CREATE TABLE consumer (
    id SERIAL NOT NULL PRIMARY KEY,
    "firstName" VARCHAR(25) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,
    "lastSignedIn" TIMESTAMP
);

-- 3. Create consumerFriendRelationship Table --
CREATE TABLE "consumerFriendRelationship" (
    id SERIAL NOT NULL PRIMARY KEY,
    "senderId" INTEGER NOT NULL REFERENCES consumer(id),
    "receiverId" INTEGER NOT NULL REFERENCES consumer(id),
    status VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,
    UNIQUE ("senderId", "receiverId"),
    CHECK (status IN ('pending', 'accepted', 'rejected'))
);

-- 3. Create breakfast Table --
CREATE TABLE breakfast (
    id SERIAL NOT NULL PRIMARY KEY,
    "consumerId" INTEGER NOT NULL REFERENCES consumer(id),
    name VARCHAR(50) NOT NULL,
    calorie INTEGER,
    fat INTEGER,
    cholesterol INTEGER,
    sodium INTEGER,
    carbohydrate INTEGER,
    protein INTEGER,
    "consumedAt" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP
);

-- 4. Create lunch Table --
CREATE TABLE lunch (
    id SERIAL NOT NULL PRIMARY KEY,
    "consumerId" INTEGER NOT NULL REFERENCES consumer(id),
    name VARCHAR(50) NOT NULL,
    calorie INTEGER,
    fat INTEGER,
    cholesterol INTEGER,
    sodium INTEGER,
    carbohydrate INTEGER,
    protein INTEGER,
    "consumedAt" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP
);

-- 5. Create dinner Table --
CREATE TABLE dinner (
    id SERIAL NOT NULL PRIMARY KEY,
    "consumerId" INTEGER NOT NULL REFERENCES consumer(id),
    name VARCHAR(50) NOT NULL,
    calorie INTEGER,
    fat INTEGER,
    cholesterol INTEGER,
    sodium INTEGER,
    carbohydrate INTEGER,
    protein INTEGER,
    "consumedAt" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP
);

-- 6. Create snack Table --
CREATE TABLE snack (
    id SERIAL NOT NULL PRIMARY KEY,
    "consumerId" INTEGER NOT NULL REFERENCES consumer(id),
    name VARCHAR(50) NOT NULL,
    calorie INTEGER,
    fat INTEGER,
    cholesterol INTEGER,
    sodium INTEGER,
    carbohydrate INTEGER,
    protein INTEGER,
    "consumedAt" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP
);

-- 7. Create message Table --
CREATE TABLE message (
    id SERIAL NOT NULL PRIMARY KEY,
    "senderId" INTEGER NOT NULL REFERENCES consumer(id),
    "receiverId" INTEGER NOT NULL REFERENCES consumer(id),
    content VARCHAR(512) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 8. Create indexes to improve query performance --
CREATE INDEX sender_idx ON message ("senderId");
CREATE INDEX receiverId ON message ("receiverId");
