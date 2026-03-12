const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'meal_planner.db');
const db = new sqlite3.Database(dbPath);

console.log('🔧 Initializing SQLite database...\n');

db.serialize(() => {
  // Create meals table
  db.run(`
    CREATE TABLE IF NOT EXISTS meals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      calories INTEGER NOT NULL,
      protein INTEGER,
      carbs INTEGER,
      fat INTEGER,
      ingredients TEXT,
      image_url TEXT
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error creating meals table:', err);
    } else {
      console.log('✅ Meals table created');
    }
  });

  // Create orders table
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      meal_id INTEGER NOT NULL,
      customization TEXT,
      ordered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (meal_id) REFERENCES meals(id) ON DELETE CASCADE
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error creating orders table:', err);
    } else {
      console.log('✅ Orders table created\n');
    }
  });

  // Check if meals already exist
  db.get('SELECT COUNT(*) as count FROM meals', (err, row) => {
    if (err) {
      console.error('❌ Error checking meals:', err);
      return;
    }

    if (row.count > 0) {
      console.log(`ℹ️  Database already has ${row.count} meals. Skipping seed.\n`);
      console.log('🎉 Database ready!\n');
      db.close();
      return;
    }

    console.log('📦 Seeding 20 pre-loaded meals...\n');

    const meals = [
      { name: 'Grilled Chicken Bowl', calories: 580, protein: 45, carbs: 52, fat: 18, 
        ingredients: 'Grilled chicken breast, brown rice, mixed vegetables, teriyaki glaze',
        image_url: '/images/meals/chicken-bowl.jpg' },
      
      { name: 'Caesar Salad with Grilled Chicken', calories: 420, protein: 35, carbs: 22, fat: 24,
        ingredients: 'Romaine lettuce, grilled chicken, Caesar dressing, parmesan, croutons',
        image_url: '/images/meals/caesar-salad.jpg' },
      
      { name: 'Grilled Salmon with Quinoa', calories: 520, protein: 42, carbs: 38, fat: 22,
        ingredients: 'Atlantic salmon, quinoa, asparagus, lemon butter sauce',
        image_url: '/images/meals/salmon-quinoa.jpg' },
      
      { name: 'Veggie Buddha Bowl', calories: 450, protein: 18, carbs: 65, fat: 15,
        ingredients: 'Chickpeas, sweet potato, kale, tahini dressing, avocado',
        image_url: '/images/meals/buddha-bowl.jpg' },
      
      { name: 'Protein Power Bowl', calories: 620, protein: 55, carbs: 48, fat: 22,
        ingredients: 'Grilled steak, eggs, quinoa, black beans, avocado',
        image_url: '/images/meals/protein-bowl.jpg' },
      
      { name: 'Mediterranean Wrap', calories: 480, protein: 28, carbs: 52, fat: 18,
        ingredients: 'Grilled chicken, hummus, cucumber, tomato, feta, whole wheat wrap',
        image_url: '/images/meals/med-wrap.jpg' },
      
      { name: 'Steak & Sweet Potato', calories: 650, protein: 48, carbs: 55, fat: 25,
        ingredients: 'Sirloin steak, roasted sweet potato, green beans, garlic butter',
        image_url: '/images/meals/steak-potato.jpg' },
      
      { name: 'Poke Bowl', calories: 540, protein: 38, carbs: 58, fat: 16,
        ingredients: 'Ahi tuna, sushi rice, edamame, cucumber, avocado, soy ginger dressing',
        image_url: '/images/meals/poke-bowl.jpg' },
      
      { name: 'Turkey & Avocado Sandwich', calories: 460, protein: 32, carbs: 42, fat: 18,
        ingredients: 'Sliced turkey, avocado, lettuce, tomato, whole grain bread',
        image_url: '/images/meals/turkey-sandwich.jpg' },
      
      { name: 'Vegan Burrito Bowl', calories: 520, protein: 22, carbs: 68, fat: 18,
        ingredients: 'Black beans, brown rice, corn, salsa, guacamole, lettuce',
        image_url: '/images/meals/burrito-bowl.jpg' },
      
      { name: 'Greek Chicken Bowl', calories: 490, protein: 40, carbs: 45, fat: 16,
        ingredients: 'Grilled chicken, tzatziki, cucumber, tomato, olives, rice',
        image_url: '/images/meals/greek-bowl.jpg' },
      
      { name: 'Shrimp Stir Fry', calories: 440, protein: 35, carbs: 48, fat: 12,
        ingredients: 'Shrimp, mixed vegetables, jasmine rice, ginger soy sauce',
        image_url: '/images/meals/shrimp-stirfry.jpg' },
      
      { name: 'BBQ Chicken Pizza', calories: 620, protein: 38, carbs: 68, fat: 22,
        ingredients: 'BBQ chicken, red onion, cilantro, mozzarella, whole wheat crust',
        image_url: '/images/meals/bbq-pizza.jpg' },
      
      { name: 'Breakfast Power Bowl', calories: 520, protein: 28, carbs: 52, fat: 22,
        ingredients: 'Scrambled eggs, turkey sausage, sweet potato hash, avocado',
        image_url: '/images/meals/breakfast-bowl.jpg' },
      
      { name: 'Miso Glazed Cod', calories: 460, protein: 42, carbs: 38, fat: 14,
        ingredients: 'Miso cod, jasmine rice, bok choy, sesame seeds',
        image_url: '/images/meals/miso-cod.jpg' },
      
      { name: 'Falafel Bowl', calories: 540, protein: 20, carbs: 72, fat: 18,
        ingredients: 'Falafel, hummus, tabbouleh, cucumber, tahini sauce, pita',
        image_url: '/images/meals/falafel-bowl.jpg' },
      
      { name: 'Chicken Fajita Bowl', calories: 580, protein: 42, carbs: 58, fat: 18,
        ingredients: 'Fajita chicken, peppers, onions, black beans, rice, sour cream',
        image_url: '/images/meals/fajita-bowl.jpg' },
      
      { name: 'Tuna Poke Bowl', calories: 500, protein: 36, carbs: 55, fat: 14,
        ingredients: 'Seared tuna, sushi rice, seaweed salad, avocado, ponzu',
        image_url: '/images/meals/tuna-poke.jpg' },
      
      { name: 'Asian Noodle Bowl', calories: 560, protein: 32, carbs: 68, fat: 18,
        ingredients: 'Chicken, rice noodles, vegetables, peanut sauce, cilantro',
        image_url: '/images/meals/noodle-bowl.jpg' },
      
      { name: 'Margherita Flatbread', calories: 480, protein: 24, carbs: 58, fat: 18,
        ingredients: 'Fresh mozzarella, tomatoes, basil, balsamic glaze, flatbread',
        image_url: '/images/meals/margherita.jpg' }
    ];

    const stmt = db.prepare('INSERT INTO meals (name, calories, protein, carbs, fat, ingredients, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)');

    meals.forEach((meal, index) => {
      stmt.run(
        meal.name,
        meal.calories,
        meal.protein,
        meal.carbs,
        meal.fat,
        meal.ingredients,
        meal.image_url,
        (err) => {
          if (err) {
            console.error(`❌ Error inserting ${meal.name}:`, err);
          } else {
            console.log(`✅ Added: ${meal.name}`);
          }
        }
      );
    });

    stmt.finalize(() => {
      console.log('\n🎉 Database initialized with 20 meals!\n');
      console.log('📍 Database location:', dbPath);
      console.log('\n🚀 You can now start the server with: npm run dev\n');
      db.close();
    });
  });
});
