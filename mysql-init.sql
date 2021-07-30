CREATE DATABASE IF NOT EXISTS nodedb;
USE nodedb;

CREATE TABLE IF NOT EXISTS people(
  id int unsigned auto_increment not null primary key,
  name varchar(255) not null
);