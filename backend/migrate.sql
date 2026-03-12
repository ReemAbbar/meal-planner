-- Database Migration: Add Nutrition & Orders
-- Run this in psql connected to meal_planner database

-- Add nutrition columns to meals table
ALTER TABLE meals ADD COLUMN IF NOT EXISTS protein INT;
ALTER TABLE meals ADD COLUMN IF NOT EXISTS carbs INT;
ALTER TABLE meals ADD COLUMN IF NOT EXISTS fat INT;
ALTER TABLE meals ADD COLUMN IF NOT EXISTS ingredients TEXT;

-- Update existing meals with nutrition data
UPDATE meals SET 
  protein = 40, carbs = 45, fat = 15, 
  ingredients = 'Chicken, Rice, Veggies, Soy Sauce'
WHERE name = 'Chicken Bowl';

UPDATE meals SET 
  protein = 8, carbs = 30, fat = 12, 
  ingredients = 'Lettuce, Tomato, Olive Oil, Grilled Chicken'
WHERE name = 'Salad';

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  meal_id INT REFERENCES meals(id) ON DELETE CASCADE,
  customization TEXT,
  ordered_at TIMESTAMP DEFAULT NOW()
);

-- Add some sample meals with full nutrition
INSERT INTO meals (name, calories, protein, carbs, fat, ingredients)
VALUES 
  ('Grilled Salmon', 480, 45, 20, 22, 'Atlantic Salmon, Lemon, Herbs, Quinoa'),
  ('Veggie Wrap', 420, 12, 52, 18, 'Whole Wheat Tortilla, Hummus, Veggies, Feta'),
  ('Protein Bowl', 550, 50, 48, 14, 'Brown Rice, Grilled Chicken, Black Beans, Avocado')
ON CONFLICT DO NOTHING;

-- Verify changes
SELECT * FROM meals;
SELECT * FROM orders;
