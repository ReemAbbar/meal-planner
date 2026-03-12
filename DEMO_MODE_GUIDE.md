# 🚀 Mock Data Mode - Quick Start

## ✅ You're Now in Demo Mode!

Your app now works **WITHOUT PostgreSQL** using mock data. This lets you explore all features immediately!

## 🎨 What You'll See

### 1. **20 Pre-Loaded Meals**
- Grilled Chicken Bowl
- Caesar Salad
- Salmon with Quinoa
- Buddha Bowl
- And 16 more delicious options!

### 2. **Beautiful UI**
- Gradient placeholders for meal images
- Full nutrition data display
- Card-based layout with hover effects

### 3. **Demo Mode Banner**
Yellow banner at the top tells you:
- "Demo Mode" - showing sample meals
- Link to download PostgreSQL
- Explains why some features are limited

### 4. **What Works in Demo Mode**
- ✅ Browse 20 meals
- ✅ View meal details
- ✅ See nutrition info
- ✅ Order meals (UI only - not saved)
- ✅ View order success animation
- ⚠️ Orders tab (empty - no persistence)
- ❌ Add new meals (disabled)
- ❌ Edit nutrition (disabled)

---

## 🔄 How to See the Changes

### Option 1: Just Refresh Browser
1. Go to http://localhost:3000
2. Press `Ctrl + Shift + R` (hard refresh)
3. You should see 20 meals with a yellow banner

### Option 2: Restart Frontend (if needed)
```powershell
cd frontend
npm start
```

Then visit http://localhost:3000

---

## 🎯 Try These Features

### Browse Meals
- Scroll through the meal grid
- Hover over cards to see animation
- View nutrition badges (calories, protein, carbs, fat)

### Order a Meal
1. Click "Order Now" on any meal
2. Modal opens with full details
3. Add customization (e.g., "No onions")
4. Click "Order This Meal"
5. See success animation ✅

### Check Images
- Each meal shows gradient placeholder
- Purple/blue gradients with 🍽️ emoji
- Ready for real images when you add them

---

## 📸 Adding Real Images (Optional)

Want to see actual meal photos?

1. **Download images** from:
   - Unsplash: https://unsplash.com/s/photos/healthy-meal
   - Pexels: https://www.pexels.com/search/healthy-food/

2. **Save to**: `frontend/public/images/meals/`

3. **Name them**:
   - `chicken-bowl.jpg`
   - `caesar-salad.jpg`
   - `salmon-quinoa.jpg`
   - etc. (see list in mockData.ts)

4. **Refresh browser** - images appear!

---

## 🔧 Upgrade to Full Version

Ready to enable persistence and full features?

### Install PostgreSQL

1. **Download**: https://www.postgresql.org/download/windows/
2. **Install**: Remember your postgres password!
3. **Update .env**:
   ```
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/meal_planner
   ```

4. **Create Database**:
   ```powershell
   # Open SQL Shell (psql)
   CREATE DATABASE meal_planner;
   \q
   ```

5. **Seed Database**:
   ```powershell
   cd backend
   node seed.js
   ```

6. **Restart Backend**:
   ```powershell
   npm run dev
   ```

7. **Refresh Browser** - Full version active! 🎉

---

## 🆚 Demo vs Full Version

| Feature | Demo Mode | Full Version |
|---------|-----------|--------------|
| Browse meals | ✅ 20 samples | ✅ All meals |
| View details | ✅ Yes | ✅ Yes |
| Order meals | ⚠️ UI only | ✅ Saved to DB |
| Add meals | ❌ Disabled | ✅ Enabled |
| Edit nutrition | ❌ Disabled | ✅ Enabled |
| Order history | ⚠️ Empty | ✅ Persisted |
| Images | ✅ Placeholders | ✅ Same + real |

---

## 📋 Files Created

- **mockData.ts** - 20 sample meals
- **Updated MealList.tsx** - Auto-detects DB and uses mock data
- **Updated OrderHistory.tsx** - Shows demo banner
- **Updated MealDetail.tsx** - Works without DB

---

## ⚡ Quick Reference

### Check if Demo Mode is Active
Look for the **yellow banner** at the top:
> ⚠️ **Demo Mode** - Showing 20 sample meals

### Switch to Full Version
1. Install PostgreSQL
2. Run `node seed.js` in backend
3. Restart backend server
4. Refresh browser
5. Yellow banner disappears ✅

---

## 🎉 Enjoy Exploring!

You now have a **fully functional UI** to explore without any database setup!

Try:
- Ordering different meals
- Viewing nutrition info
- Checking the responsive layout
- Testing the order modal

When ready, install PostgreSQL to unlock full features! 🚀
