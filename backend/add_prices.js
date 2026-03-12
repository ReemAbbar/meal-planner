const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'meal_planner.db');
const db = new sqlite3.Database(dbPath);

console.log('🔧 Adding prices to meals...\n');

db.serialize(() => {
  // Add price column if it doesn't exist
  db.run(`ALTER TABLE meals ADD COLUMN price REAL`, (err) => {
    if (err && !err.message.includes('duplicate column')) {
      console.error('❌ Error adding price column:', err);
      return;
    }
    console.log('✅ Price column added (or already exists)\n');

    // Update existing meals with default prices
    const defaultPrices = [
      { id: 1, price: 12.99 },
      { id: 2, price: 10.99 },
      { id: 3, price: 16.99 },
      { id: 4, price: 9.99 },
      { id: 5, price: 13.99 },
      { id: 6, price: 11.99 },
      { id: 7, price: 8.99 },
      { id: 8, price: 15.99 },
      { id: 9, price: 14.99 },
      { id: 10, price: 10.99 },
      { id: 11, price: 9.99 },
      { id: 12, price: 12.99 },
      { id: 13, price: 11.99 },
      { id: 14, price: 13.99 },
      { id: 15, price: 14.99 },
      { id: 16, price: 10.99 },
      { id: 17, price: 9.99 },
      { id: 18, price: 12.99 },
      { id: 19, price: 11.99 },
      { id: 20, price: 13.99 },
    ];

    console.log('📦 Setting default prices for existing meals...\n');

    let completed = 0;
    defaultPrices.forEach((item) => {
      db.run(
        'UPDATE meals SET price = ? WHERE id = ?',
        [item.price, item.id],
        (err) => {
          if (err) {
            console.error(`❌ Error setting price for meal ${item.id}:`, err);
          }
          completed++;
          if (completed === defaultPrices.length) {
            console.log('✅ All meal prices updated!\n');
            console.log('🎉 Database migration complete!\n');
            db.close();
          }
        }
      );
    });
  });
});
