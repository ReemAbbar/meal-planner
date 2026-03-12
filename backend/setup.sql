-- Run this SQL script in psql or PostgreSQL client
-- First, create the database (if not already created)
CREATE DATABASE meal_planner;

-- Connect to the database
\c meal_planner

-- Create the meals table
CREATE TABLE meals (
  id SERIAL PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  calories INT NOT NULL
);

-- Insert sample data
INSERT INTO meals (name, calories) VALUES ('Chicken Bowl', 600), ('Salad', 350);

-- Verify the data
SELECT * FROM meals;
