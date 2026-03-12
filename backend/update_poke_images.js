const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'meal_planner.db');
const db = new sqlite3.Database(dbPath);

console.log('🥗 Updating poke meal images...\n');

db.serialize(() => {
  // Update all meals with "poke" in the name to use hm1.jpg
  db.run(
    "UPDATE meals SET image_url = '/images/meals/hm1.jpg' WHERE name LIKE '%poke%' OR name LIKE '%Poke%'",
    function(err) {
      if (err) {
        console.error('❌ Error updating poke meals:', err);
      } else {
        console.log(`✅ Updated ${this.changes} poke meal(s) with hm1.jpg\n`);
        
        // Show which meals were updated
        db.all(
          "SELECT id, name, image_url FROM meals WHERE name LIKE '%poke%' OR name LIKE '%Poke%'",
          (err, meals) => {
            if (err) {
              console.error('❌ Error fetching poke meals:', err);
            } else if (meals.length > 0) {
              console.log('Updated poke meals:');
              meals.forEach(meal => {
                console.log(`  - ${meal.name} (ID: ${meal.id})`);
              });
              console.log('\n🎉 Done!\n');
            }
            db.close();
          }
        );
      }
    }
  );
});
