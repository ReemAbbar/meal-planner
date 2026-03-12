const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'meal_planner.db');
const db = new sqlite3.Database(dbPath);

console.log('🖼️  Updating meal images...\n');

// Array of available images
const images = [
  '/images/meals/hm1.jpg',
  '/images/meals/hm2.jpg',
  '/images/meals/hm3.jpg',
  '/images/meals/hm4.jpg',
  '/images/meals/hm5.jpg',
  '/images/meals/hm6.jpg',
  '/images/meals/hm7.jpg',
  '/images/meals/hm8.jpg'
];

db.serialize(() => {
  // Get all meals
  db.all('SELECT id FROM meals ORDER BY id', (err, meals) => {
    if (err) {
      console.error('❌ Error fetching meals:', err);
      db.close();
      return;
    }

    if (meals.length === 0) {
      console.log('⚠️  No meals found in database');
      db.close();
      return;
    }

    console.log(`📦 Found ${meals.length} meals to update\n`);

    const stmt = db.prepare('UPDATE meals SET image_url = ? WHERE id = ?');
    let updated = 0;

    meals.forEach((meal, index) => {
      // Cycle through images using modulo
      const imageUrl = images[index % images.length];
      
      stmt.run(imageUrl, meal.id, (err) => {
        if (err) {
          console.error(`❌ Error updating meal ${meal.id}:`, err);
        } else {
          updated++;
          console.log(`✅ Updated meal ${meal.id} with image: ${imageUrl}`);
        }

        // Close database after last update
        if (updated + (meals.length - updated) === meals.length) {
          stmt.finalize();
          console.log(`\n🎉 Successfully updated ${updated} meals with images!\n`);
          db.close();
        }
      });
    });
  });
});
