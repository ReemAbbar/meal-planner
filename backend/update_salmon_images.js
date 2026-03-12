const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'meal_planner.db');
const db = new sqlite3.Database(dbPath);

console.log('🐟 Updating salmon meal images...\n');

db.serialize(() => {
  // Update all meals with "salmon" in the name to use hm5.jpg
  db.run(
    "UPDATE meals SET image_url = '/images/meals/hm5.jpg' WHERE name LIKE '%salmon%' OR name LIKE '%Salmon%'",
    function(err) {
      if (err) {
        console.error('❌ Error updating salmon meals:', err);
      } else {
        console.log(`✅ Updated ${this.changes} salmon meal(s) with hm5.jpg\n`);
        
        // Show which meals were updated
        db.all(
          "SELECT id, name, image_url FROM meals WHERE name LIKE '%salmon%' OR name LIKE '%Salmon%'",
          (err, meals) => {
            if (err) {
              console.error('❌ Error fetching salmon meals:', err);
            } else if (meals.length > 0) {
              console.log('Updated salmon meals:');
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
