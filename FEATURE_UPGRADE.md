# Meal Planner - Feature Upgrades

## 🎉 New Features Added

### ✅ 1. Order Meals
- **Order Button**: Click "Order Now" on any meal card
- **Backend**: `/api/orders` endpoint to record orders
- **Frontend**: Beautiful order modal with customization options

### ✅ 2. Customize Meals
- **Customization Form**: Add special instructions for each order
- **Examples**: "No onions", "Extra chicken", "Dressing on the side"
- **Backend**: Customization text stored with each order

### ✅ 3. Nutrition Data
- **Calories**: Already displayed
- **Protein, Carbs, Fat**: Now shown for every meal
- **Ingredients**: Listed ingredients for each meal
- **Backend**: Expanded database schema to store nutrition facts

### ✅ 4. Order History
- **View Orders**: New "Orders" tab to see all past orders
- **Order Details**: Shows meal name, nutrition info, customization, and timestamp
- **Backend**: Orders table with meal references

### ✅ 5. Enhanced UI
- **Modern Design**: Card-based layout with hover effects
- **Tab Navigation**: Switch between Meals and Orders
- **Add Meal Form**: Collapsible form with all nutrition fields
- **Responsive Grid**: Meals displayed in a responsive grid layout

---

## 🗄️ Database Migration Required

Before running the app, you need to update your PostgreSQL database:

### Option 1: Run Migration Script (Recommended)

```powershell
# Connect to PostgreSQL
psql -U postgres -d meal_planner

# Inside psql, run:
\i C:/Users/REEM ABBAR/meal-planner/backend/migrate.sql
```

### Option 2: Manual SQL Commands

```powershell
# Connect to PostgreSQL
psql -U postgres -d meal_planner
```

Then paste these commands:

```sql
-- Add nutrition columns to meals table
ALTER TABLE meals ADD COLUMN IF NOT EXISTS protein INT;
ALTER TABLE meals ADD COLUMN IF NOT EXISTS carbs INT;
ALTER TABLE meals ADD COLUMN IF NOT EXISTS fat INT;
ALTER TABLE meals ADD COLUMN IF NOT EXISTS ingredients TEXT;

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  meal_id INT REFERENCES meals(id) ON DELETE CASCADE,
  customization TEXT,
  ordered_at TIMESTAMP DEFAULT NOW()
);

-- Update existing meals with nutrition data
UPDATE meals SET 
  protein = 40, carbs = 45, fat = 15, 
  ingredients = 'Chicken, Rice, Veggies, Soy Sauce'
WHERE name = 'Chicken Bowl';

UPDATE meals SET 
  protein = 8, carbs = 30, fat = 12, 
  ingredients = 'Lettuce, Tomato, Olive Oil, Grilled Chicken'
WHERE name = 'Salad';

-- Add sample meals with full nutrition
INSERT INTO meals (name, calories, protein, carbs, fat, ingredients)
VALUES 
  ('Grilled Salmon', 480, 45, 20, 22, 'Atlantic Salmon, Lemon, Herbs, Quinoa'),
  ('Veggie Wrap', 420, 12, 52, 18, 'Whole Wheat Tortilla, Hummus, Veggies, Feta'),
  ('Protein Bowl', 550, 50, 48, 14, 'Brown Rice, Grilled Chicken, Black Beans, Avocado')
ON CONFLICT DO NOTHING;
```

---

## 🚀 Running the App

### Backend
```powershell
cd backend
npm run dev
```
Server runs on `http://localhost:5000`

### Frontend
```powershell
cd frontend
npm start
```
App opens at `http://localhost:3000`

---

## 📝 API Endpoints

### Meals
- `GET /api/meals` - Get all meals with nutrition data
- `GET /api/meals/:id` - Get single meal details
- `POST /api/meals` - Add new meal with nutrition data
  ```json
  {
    "name": "Chicken Bowl",
    "calories": 600,
    "protein": 40,
    "carbs": 45,
    "fat": 15,
    "ingredients": "Chicken, Rice, Veggies"
  }
  ```

### Orders
- `GET /api/orders` - Get all orders with meal details
- `POST /api/orders` - Place new order
  ```json
  {
    "mealId": 1,
    "customization": "No onions, extra chicken"
  }
  ```

---

## 🎨 UI Components

### MealList.tsx
- Grid layout displaying all available meals
- Nutrition info cards (calories, protein, carbs, fat)
- "Add Meal" button with collapsible form
- "Order Now" button on each meal card

### MealDetail.tsx
- Modal showing full meal details
- Nutrition facts breakdown
- Ingredients list
- Customization textarea
- Order button with success animation

### OrderHistory.tsx
- List of all past orders
- Order details with timestamp
- Customization notes
- Nutrition summary

### App.tsx
- Tab navigation between Meals and Orders
- Modern header with tab buttons
- Responsive container layout

---

## 🎯 Usage Guide

### Adding a Meal
1. Click "+ Add Meal" button
2. Fill in meal name and calories (required)
3. Optionally add protein, carbs, fat, and ingredients
4. Click "Add Meal"

### Ordering a Meal
1. Browse meals in the "Meals" tab
2. Click "Order Now" on any meal
3. Review nutrition facts and ingredients
4. Add customization notes (optional)
5. Click "🛒 Order This Meal"
6. See success confirmation

### Viewing Orders
1. Click the "📦 Orders" tab
2. See all past orders with timestamps
3. Review customization notes for each order
4. Check nutrition data for ordered meals

---

## 🔧 Troubleshooting

### Database Connection Issues
- Make sure PostgreSQL is running
- Check credentials in `backend/.env`
- Verify database name is `meal_planner`

### Frontend Not Loading Meals
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify database migration was successful

### Orders Not Saving
- Confirm orders table exists in database
- Check foreign key constraint on meal_id
- Review backend console for SQL errors

---

## 🌟 Next Steps

Consider adding these features:
- User authentication
- Meal categories (breakfast, lunch, dinner)
- Favorites system
- Meal ratings and reviews
- Dietary filters (vegetarian, vegan, gluten-free)
- Calorie tracking dashboard
- Weekly meal planning
- Shopping list generator

---

## 📦 File Structure

```
meal-planner/
├── backend/
│   ├── src/
│   │   └── server.js          # API endpoints
│   ├── .env                    # Database config
│   ├── migrate.sql             # Database migration
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.tsx             # Main app with tabs
    │   ├── MealList.tsx        # Meals grid view
    │   ├── MealDetail.tsx      # Order modal
    │   ├── OrderHistory.tsx    # Orders list
    │   ├── index.tsx           # Entry point
    │   └── index.css           # Global styles
    └── package.json
```

---

## ✅ Checklist

- [ ] Database migration completed
- [ ] Backend server running
- [ ] Frontend server running
- [ ] Can add meals with nutrition data
- [ ] Can view meal details
- [ ] Can place orders with customization
- [ ] Can view order history
- [ ] UI looks modern and responsive

---

Enjoy your upgraded Meal Planner! 🍽️✨
