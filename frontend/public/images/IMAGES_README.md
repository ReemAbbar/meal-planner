# 📸 Meal Images Guide

## Where to Put Your Images

Place all meal images in:
```
frontend/public/images/meals/
```

## Image Names Expected

The seed data references these image filenames:

1. `chicken-bowl.jpg` - Grilled Chicken Bowl
2. `caesar-salad.jpg` - Caesar Salad with Grilled Chicken
3. `salmon-quinoa.jpg` - Grilled Salmon with Quinoa
4. `buddha-bowl.jpg` - Veggie Buddha Bowl
5. `protein-bowl.jpg` - Protein Power Bowl
6. `med-wrap.jpg` - Mediterranean Wrap
7. `steak-potato.jpg` - Steak & Sweet Potato
8. `poke-bowl.jpg` - Poke Bowl
9. `turkey-sandwich.jpg` - Turkey & Avocado Sandwich
10. `burrito-bowl.jpg` - Vegan Burrito Bowl
11. `greek-bowl.jpg` - Greek Chicken Bowl
12. `shrimp-stirfry.jpg` - Shrimp Stir Fry
13. `bbq-pizza.jpg` - BBQ Chicken Pizza
14. `breakfast-bowl.jpg` - Breakfast Power Bowl
15. `miso-cod.jpg` - Miso Glazed Cod
16. `falafel-bowl.jpg` - Falafel Bowl
17. `fajita-bowl.jpg` - Chicken Fajita Bowl
18. `tuna-poke.jpg` - Tuna Poke Bowl
19. `noodle-bowl.jpg` - Asian Noodle Bowl
20. `margherita.jpg` - Margherita Flatbread

## Image Specifications

**Recommended:**
- Format: JPG or PNG
- Size: 800x600px or 1200x900px
- Aspect Ratio: 4:3 or 16:9
- File size: Under 500KB for faster loading

## How to Get Images

### Option 1: Free Stock Photo Sites
- **Unsplash** - https://unsplash.com/s/photos/healthy-meal
- **Pexels** - https://www.pexels.com/search/healthy-food/
- **Pixabay** - https://pixabay.com/images/search/meal/

### Option 2: AI Generated Images
- **DALL-E** - https://openai.com/dall-e-2
- **Midjourney** - https://www.midjourney.com
- **Stable Diffusion** - https://stablediffusionweb.com

### Option 3: Use Placeholder Service (Temporary)
The app will automatically use a placeholder if images are missing!

## Quick Setup (Placeholder Images)

If you don't have images yet, the app will show:
- Colored gradient backgrounds
- Food emoji
- Meal name text

The UI is fully functional without images!

## Adding Your Own Images

1. Download or create your meal images
2. Rename them according to the list above
3. Copy them to `frontend/public/images/meals/`
4. Restart frontend server (if needed)
5. Refresh browser

## Example: Adding Custom Meal with Image

When adding a new meal through the app:

```javascript
{
  "name": "My Custom Meal",
  "calories": 500,
  "protein": 30,
  "carbs": 40,
  "fat": 15,
  "ingredients": "Your ingredients here",
  "image_url": "/images/meals/my-custom-meal.jpg"
}
```

Then place `my-custom-meal.jpg` in `frontend/public/images/meals/`

---

**Note:** Images are served from the `public` folder, so they're accessible at `/images/meals/filename.jpg` in your browser.
