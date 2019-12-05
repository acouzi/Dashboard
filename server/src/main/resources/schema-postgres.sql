CREATE EXTENSION IF NOT EXISTS pgcrypto;
DROP TABLE IF EXISTS users;
CREATE TABLE users(
    id serial PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    services TEXT
);

DROP TABLE IF EXISTS weather;
CREATE TABLE weather(
    id serial PRIMARY KEY,
    user_id DECIMAL NOT NULL,
    City VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    temperature VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS pollution;
CREATE TABLE pollution(
    id serial PRIMARY KEY,
    user_id DECIMAL NOT NULL,
    city VARCHAR(255) NOT NULL,
    pollution VARCHAR(255) NOT NULL,
    danger VARCHAR(255) NOT NULL
);


DROP TABLE IF EXISTS trade;
CREATE TABLE trade(
    id serial PRIMARY KEY,
    user_id DECIMAL NOT NULL,
    symbol VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL,
    currency VARCHAR(255) NOT NULL,
    day_high VARCHAR(255) NOT NULL,
    day_low VARCHAR(255) NOT NULL,
    volume VARCHAR(255) NOT NULL,
    stock_exchange VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS steam;
CREATE TABLE steam(
   id serial PRIMARY KEY,
   game_id VARCHAR(255) NOT NULL,
   user_id DECIMAL NOT NULL,
   game VARCHAR(255) NOT NULL,
   nbr_player VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS youtube;
CREATE TABLE youtube(
      id serial PRIMARY KEY,
      user_id DECIMAL NOT NULL,
      channel_name VARCHAR(255) NOT NULL,
      nbr_subs VARCHAR(255) NOT NULL,
      img VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS news;
CREATE TABLE news(
    id serial PRIMARY KEY,
    user_id DECIMAL NOT NULL,
    content TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    language VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    img VARCHAR(255) NOT NULL
);