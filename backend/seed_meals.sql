-- Add Images & Seed Pre-Existing Meals
-- Run this in psql connected to meal_planner database

-- Add image column to meals table
ALTER TABLE meals ADD COLUMN IF NOT EXISTS image_url VARCHAR(500);

-- Clear existing meals (optional - remove if you want to keep current data)
-- TRUNCATE TABLE meals CASCADE;

-- Insert pre-existing meal store items
DELETE FROM meals WHERE id <= 20;

INSERT INTO meals (id, name, calories, protein, carbs, fat, ingredients, image_url) VALUES
  (1, 'Grilled Chicken Bowl', 580, 45, 52, 18, 'Grilled Chicken Breast, Brown Rice, Steamed Broccoli, Carrots, Teriyaki Glaze', '/images/meals/chicken-bowl.jpg'),
  (2, 'Caesar Salad with Grilled Chicken', 420, 35, 28, 18, 'Romaine Lettuce, Grilled Chicken, Parmesan, Caesar Dressing, Croutons', '/images/meals/caesar-salad.jpg'),
  (3, 'Grilled Salmon with Quinoa', 520, 42, 38, 22, 'Atlantic Salmon, Quinoa, Asparagus, Lemon Butter Sauce, Cherry Tomatoes', '/images/meals/salmon-quinoa.jpg'),
  (4, 'Veggie Buddha Bowl', 450, 18, 62, 15, 'Chickpeas, Sweet Potato, Kale, Quinoa, Tahini Dressing, Avocado', '/images/meals/buddha-bowl.jpg'),
  (5, 'Protein Power Bowl', 620, 55, 50, 20, 'Grilled Chicken, Black Beans, Brown Rice, Avocado, Salsa, Greek Yogurt', '/images/meals/protein-bowl.jpg'),
  (6, 'Mediterranean Wrap', 480, 28, 52, 18, 'Whole Wheat Wrap, Grilled Chicken, Hummus, Feta, Cucumber, Tomato', '/images/meals/med-wrap.jpg'),
  (7, 'Steak & Sweet Potato', 650, 48, 55, 24, 'Sirloin Steak, Sweet Potato Mash, Green Beans, Garlic Butter', '/images/meals/steak-potato.jpg'),
  (8, 'Poke Bowl', 540, 38, 58, 16, 'Sushi Rice, Ahi Tuna, Edamame, Seaweed, Cucumber, Soy Ginger Dressing', '/images/meals/poke-bowl.jpg'),
  (9, 'Turkey & Avocado Sandwich', 460, 32, 42, 18, 'Whole Grain Bread, Turkey Breast, Avocado, Lettuce, Tomato, Mustard', '/images/meals/turkey-sandwich.jpg'),
  (10, 'Vegan Burrito Bowl', 520, 22, 68, 16, 'Black Beans, Brown Rice, Corn, Peppers, Guacamole, Salsa', '/images/meals/burrito-bowl.jpg'),
  (11, 'Greek Chicken Bowl', 490, 40, 45, 18, 'Grilled Chicken, Rice, Tzatziki, Tomato, Cucumber, Olives, Feta', '/images/meals/greek-bowl.jpg'),
  (12, 'Shrimp Stir Fry', 440, 35, 48, 14, 'Shrimp, Mixed Vegetables, Brown Rice, Soy Sauce, Ginger', '/images/meals/shrimp-stirfry.jpg'),
  (13, 'BBQ Chicken Pizza', 620, 38, 62, 22, 'Whole Wheat Crust, BBQ Chicken, Red Onion, Mozzarella, Cilantro', '/images/meals/bbq-pizza.jpg'),
  (14, 'Breakfast Power Bowl', 520, 28, 55, 18, 'Scrambled Eggs, Turkey Bacon, Sweet Potato Hash, Avocado, Spinach', '/images/meals/breakfast-bowl.jpg'),
  (15, 'Miso Glazed Cod', 460, 42, 35, 18, 'Cod Fillet, Jasmine Rice, Bok Choy, Miso Glaze, Sesame Seeds', '/images/meals/miso-cod.jpg'),
  (16, 'Falafel Bowl', 540, 20, 65, 20, 'Falafel, Hummus, Tabbouleh, Pita, Tahini Sauce, Mixed Greens', '/images/meals/falafel-bowl.jpg'),
  (17, 'Chicken Fajita Bowl', 580, 42, 52, 20, 'Fajita Chicken, Peppers, Onions, Black Beans, Rice, Sour Cream', '/images/meals/fajita-bowl.jpg'),
  (18, 'Tuna Poke Bowl', 500, 36, 54, 14, 'Sushi Rice, Ahi Tuna, Mango, Edamame, Seaweed Salad, Ponzu', '/images/meals/tuna-poke.jpg'),
  (19, 'Asian Noodle Bowl', 560, 32, 68, 16, 'Rice Noodles, Grilled Chicken, Vegetables, Peanut Sauce, Lime', '/images/meals/noodle-bowl.jpg'),
  (20, 'Margherita Flatbread', 480, 24, 58, 16, 'Flatbread, Fresh Mozzarella, Tomato, Basil, Olive Oil, Balsamic', '/images/meals/margherita.jpg');

-- Reset sequence for auto-increment
SELECT setval('meals_id_seq', 20, true);

-- Verify
SELECT id, name, calories, protein, image_url FROM meals ORDER BY id;
