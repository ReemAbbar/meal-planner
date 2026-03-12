# 🎉 Meal Store with Images & Adjustable Nutrition - Setup Guide

## ✅ What's Been Added

### 1. **Pre-Existing Meal Store (20 Meals)**
- 20 pre-loaded meals with full nutrition data
- Variety: Bowls, Wraps, Salads, Protein dishes, Vegan options
- All meals ready to order immediately

### 2. **Meal Images Support**
- Image field added to database
- Frontend displays meal images on cards
- Fallback gradient + emoji if image missing
- Images folder created at: `frontend/public/images/meals/`

### 3. **Adjustable Nutrition**
- ✏️ Edit button on each meal card
- Modal to adjust calories, protein, carbs, fat
- Changes persist in database
- PATCH API endpoint for updates

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Update Database Schema
Run this in PostgreSQL:

```powershell
# Connect to database
psql -U postgres -d meal_planner

# Inside psql, run:
\i C:/Users/REEM ABBAR/meal-planner/backend/seed_meals.sql

# Or manually paste the SQL from seed_meals.sql
```

This will:
- Add `image_url` column to meals table
- Load 20 pre-existing meals
- Set up meal images paths

### Step 2: Add Meal Images (Optional)
Images go in: `frontend/public/images/meals/`

**Option A: Download Free Images**
- Visit: https://unsplash.com/s/photos/healthy-meal
- Download 20 meal photos
- Rename them according to the list in `frontend/public/images/IMAGES_README.md`

**Option B: Skip for Now**
- App works perfectly without images!
- Shows beautiful gradient placeholders with food emoji

### Step 3: Restart Servers (if running)
If your servers were already running, refresh them:

**Backend:**
```powershell
# The backend should auto-reload with nodemon
# If not, restart it:
cd backend
npm run dev
```

**Frontend:**
```powershell
# Just refresh your browser
# Or restart if needed:
cd frontend
npm start
```

---

## 🎨 New Features in Action

### 1. Browse Pre-Loaded Meals
- Open http://localhost:3000
- See 20 meals in the "Meals" tab
- Each with image (or gradient placeholder)
- Full nutrition info displayed

### 2. Adjust Nutrition
1. Click the ✏️ (edit) button on any meal card
2. Modal opens with nutrition fields
3. Adjust calories, protein, carbs, or fat
4. Click "Save Changes"
5. Nutrition updates instantly

### 3. Order with Customization
1. Click "Order Now" on any meal
2. See full nutrition breakdown
3. Add customization notes
4. Place order

### 4. View Order History
1. Switch to "Orders" tab
2. See all past orders
3. Review customizations

---

## 📋 Pre-Loaded Meals List

1. **Grilled Chicken Bowl** - 580 cal | 45g protein
2. **Caesar Salad with Grilled Chicken** - 420 cal | 35g protein
3. **Grilled Salmon with Quinoa** - 520 cal | 42g protein
4. **Veggie Buddha Bowl** - 450 cal | 18g protein
5. **Protein Power Bowl** - 620 cal | 55g protein
6. **Mediterranean Wrap** - 480 cal | 28g protein
7. **Steak & Sweet Potato** - 650 cal | 48g protein
8. **Poke Bowl** - 540 cal | 38g protein
9. **Turkey & Avocado Sandwich** - 460 cal | 32g protein
10. **Vegan Burrito Bowl** - 520 cal | 22g protein
11. **Greek Chicken Bowl** - 490 cal | 40g protein
12. **Shrimp Stir Fry** - 440 cal | 35g protein
13. **BBQ Chicken Pizza** - 620 cal | 38g protein
14. **Breakfast Power Bowl** - 520 cal | 28g protein
15. **Miso Glazed Cod** - 460 cal | 42g protein
16. **Falafel Bowl** - 540 cal | 20g protein
17. **Chicken Fajita Bowl** - 580 cal | 42g protein
18. **Tuna Poke Bowl** - 500 cal | 36g protein
19. **Asian Noodle Bowl** - 560 cal | 32g protein
20. **Margherita Flatbread** - 480 cal | 24g protein

---

## 🔧 Technical Details

### Backend Changes
- **File**: [backend/src/server.js](../backend/src/server.js)
- Added: `PATCH /api/meals/:id` endpoint
- Updated: POST endpoint to accept `image_url`

### Frontend Changes
- **New Component**: [frontend/src/NutritionEditor.tsx](../frontend/src/NutritionEditor.tsx)
- **Updated**: [frontend/src/MealList.tsx](../frontend/src/MealList.tsx)
  - Added meal images display
  - Added edit button
  - Added nutrition editor modal
- **Updated**: [frontend/src/MealDetail.tsx](../frontend/src/MealDetail.tsx)
  - Added image_url support

### Database Schema
```sql
ALTER TABLE meals ADD COLUMN image_url VARCHAR(500);
```

### Image Paths
Format: `/images/meals/meal-name.jpg`
Example: `/images/meals/chicken-bowl.jpg`

---

## 📸 Image Guidelines

### Where Images Are Stored
```
frontend/
  public/
    images/
      meals/
        chicken-bowl.jpg
        caesar-salad.jpg
        salmon-quinoa.jpg
        ... (etc)
```

### Image Requirements
- **Format**: JPG, PNG, or WebP
- **Recommended Size**: 800x600px or 1200x900px
- **Max File Size**: 500KB (for faster loading)
- **Aspect Ratio**: 4:3 or 16:9

### Finding Images
1. **Unsplash** (free, high quality)
   ```
   https://unsplash.com/s/photos/healthy-meal
   ```

2. **Pexels** (free, no attribution required)
   ```
   https://www.pexels.com/search/healthy-food/
   ```

3. **Pixabay** (free)
   ```
   https://pixabay.com/images/search/meal/
   ```

### Naming Convention
Match the names in `seed_meals.sql`:
- `chicken-bowl.jpg`
- `caesar-salad.jpg`
- `salmon-quinoa.jpg`
- etc.

---

## 🎯 Testing Checklist

- [ ] Database seeded with 20 meals
- [ ] Meals display with images (or placeholders)
- [ ] ✏️ Edit button visible on each meal
- [ ] Clicking edit opens nutrition editor
- [ ] Can adjust nutrition values
- [ ] Changes save and reflect immediately
- [ ] Order button still works
- [ ] Order history shows updated nutrition

---

## 🛠️ Troubleshooting

### Images Not Showing
1. **Check file location**: `frontend/public/images/meals/`
2. **Check filename match**: Must match database `image_url`
3. **Check file format**: Use .jpg, .png, or .webp
4. **Refresh browser**: Hard refresh (Ctrl+Shift+R)

### Nutrition Edit Not Working
1. **Check backend running**: Should be on port 5000
2. **Check console**: Look for errors in browser console
3. **Verify PATCH endpoint**: `curl -X PATCH localhost:5000/api/meals/1 -H "Content-Type: application/json" -d '{"calories":600,"protein":45,"carbs":50,"fat":15}'`

### Meals Not Loading
1. **Run seed script**: Make sure `seed_meals.sql` was executed
2. **Check database**: `SELECT * FROM meals;` in psql
3. **Verify backend logs**: Should show "Connected to PostgreSQL"

---

## 🌟 Next Enhancements

Consider adding:
- **Bulk image upload** tool
- **Image URL input** in Add Meal form
- **Meal categories** (Breakfast, Lunch, Dinner)
- **Search/Filter** by name or nutrition
- **Favorites** system
- **Meal ratings** and reviews
- **Weekly meal prep** planner

---

## 📞 Need Help?

**Image Resources:**
- Read: `frontend/public/images/IMAGES_README.md`

**Database Schema:**
- See: `backend/seed_meals.sql`

**API Endpoints:**
- See: `backend/src/server.js`

---

**Happy Meal Planning! 🍽️✨**
