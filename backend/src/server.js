require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// SQLite database connection
const dbPath = path.join(__dirname, '..', 'meal_planner.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database at', dbPath);
  }
});

// Routes
app.get('/api/meals', (req, res) => {
  db.all('SELECT * FROM meals ORDER BY id', [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch meals' });
    }
    res.json(rows);
  });
});

app.get('/api/meals/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM meals WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch meal' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    res.json(row);
  });
});

app.post('/api/meals', (req, res) => {
  const { name, calories, protein, carbs, fat, ingredients, image_url, price } = req.body;
  db.run(
    'INSERT INTO meals (name, calories, protein, carbs, fat, ingredients, image_url, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [name, calories, protein || 0, carbs || 0, fat || 0, ingredients || '', image_url || '', price || 0],
    function(err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to add meal' });
      }
      // Get the inserted row
      db.get('SELECT * FROM meals WHERE id = ?', [this.lastID], (err, row) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to retrieve meal' });
        }
        res.status(201).json(row);
      });
    }
  );
});

// Update meal nutrition
app.patch('/api/meals/:id', (req, res) => {
  const { id } = req.params;
  const { calories, protein, carbs, fat, price } = req.body;
  db.run(
    'UPDATE meals SET calories = ?, protein = ?, carbs = ?, fat = ?, price = ? WHERE id = ?',
    [calories, protein, carbs, fat, price || 0, id],
    function(err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to update meal' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Meal not found' });
      }
      // Get the updated row
      db.get('SELECT * FROM meals WHERE id = ?', [id], (err, row) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to retrieve meal' });
        }
        res.json(row);
      });
    }
  );
});

// Orders endpoints
app.get('/api/orders', (req, res) => {
  db.all(
    `SELECT orders.id, orders.meal_id, orders.customization, orders.ordered_at,
            meals.name as meal_name, meals.calories, meals.protein, meals.carbs, meals.fat
     FROM orders
     JOIN meals ON orders.meal_id = meals.id
     ORDER BY orders.ordered_at DESC`,
    [],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch orders' });
      }
      res.json(rows);
    }
  );
});

app.post('/api/orders', (req, res) => {
  const { mealId, customization } = req.body;
  db.run(
    'INSERT INTO orders (meal_id, customization) VALUES (?, ?)',
    [mealId, customization || ''],
    function(err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to create order' });
      }
      // Get the inserted order
      db.get('SELECT * FROM orders WHERE id = ?', [this.lastID], (err, row) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to retrieve order' });
        }
        res.status(201).json({ success: true, order: row });
      });
    }
  );
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
