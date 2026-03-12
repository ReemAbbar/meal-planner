# 🚀 Deployment Guide: Vercel + Render

## Overview
- **Frontend**: Deploy to Vercel (Free, optimized for React)
- **Backend**: Deploy to Render (Free tier available)
- **Total Cost**: $0 for hobby projects

---

## 📋 Prerequisites

✅ Code pushed to GitHub (you've already done this!)
✅ GitHub account
✅ Email address for sign-ups

---

## Part 1: Deploy Backend to Render (Do This First!)

### Step 1: Sign Up
1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended) or email

### Step 2: Create Web Service
1. Click "New +" button in dashboard
2. Select "Web Service"
3. Click "Connect GitHub" and authorize Render
4. Find and select your `meal-planner` repository

### Step 3: Configure Backend Service
Fill in these settings:

**Name**: `meal-planner-backend` (or any name you like)

**Root Directory**: `backend`

**Environment**: `Node`

**Region**: Choose closest to your users (e.g., Oregon, Frankfurt)

**Branch**: `main`

**Build Command**: `npm install`

**Start Command**: `node src/server.js`

**Instance Type**: `Free` (select the free tier)

### Step 4: Add Environment Variables (Optional)
Click "Advanced" → "Add Environment Variable":
- `NODE_ENV` = `production`
- `PORT` = `10000` (Render assigns this automatically)

### Step 5: Deploy!
1. Click "Create Web Service"
2. Wait 2-5 minutes for deployment
3. **IMPORTANT**: Copy your backend URL - it will look like:
   `https://meal-planner-backend-xxxxx.onrender.com`

### ⚠️ Important Notes for Render:
- Free tier spins down after 15 minutes of inactivity
- First request after sleep takes 30-50 seconds
- Database (SQLite) will reset on each deploy - consider upgrading to PostgreSQL for persistence
- You get 750 hours/month free (enough for one service 24/7)

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Update API Endpoint
**Before deploying frontend**, update the backend URL:

In your frontend code, find all instances of `http://localhost:5000` and replace them with your Render backend URL.

Files to check:
- `frontend/src/MealList.tsx`
- `frontend/src/OrderHistory.tsx`
- `frontend/src/Subscription.tsx`
- `frontend/src/MySubscriptionPlan.tsx`
- `frontend/src/MealDetail.tsx`

Change from:
```typescript
axios.get('http://localhost:5000/api/meals')
```

To:
```typescript
axios.get('https://meal-planner-backend-xxxxx.onrender.com/api/meals')
```

**Better approach**: Create an environment variable (see Optional Enhancement below)

### Step 2: Commit Changes
```bash
git add .
git commit -m "Update API endpoint for production"
git push origin main
```

### Step 3: Sign Up for Vercel
1. Go to https://vercel.com
2. Click "Start Deploying"
3. Sign up with GitHub (recommended)

### Step 4: Import Project
1. Click "Add New..." → "Project"
2. Import your `meal-planner` repository
3. Vercel will detect it's a monorepo

### Step 5: Configure Frontend
**Root Directory**: Click "Edit" and set to `frontend`

**Framework Preset**: Vercel should auto-detect `Create React App`

**Build Command**: `npm run build`

**Output Directory**: `build`

**Install Command**: `npm install`

### Step 6: Deploy!
1. Click "Deploy"
2. Wait 1-3 minutes
3. Your site will be live at: `https://meal-planner-xxxxx.vercel.app`

### Step 7: Get Custom Domain (Optional)
- Vercel provides free `something.vercel.app` domain
- You can add your own domain in project settings (costs $10-15/year from domain registrars)

---

## 🔧 Optional Enhancements

### Use Environment Variables (Recommended)

**Frontend** (`frontend/.env.production`):
```
REACT_APP_API_URL=https://meal-planner-backend-xxxxx.onrender.com
```

Then in your code:
```typescript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
axios.get(`${API_URL}/api/meals`)
```

Add this in Vercel dashboard under Settings → Environment Variables

### Upgrade Database
SQLite resets on every Render deploy. For persistent data:

1. In Render dashboard, click "New +" → "PostgreSQL"
2. Create free PostgreSQL database
3. Get connection string
4. Update backend to use PostgreSQL instead of SQLite
5. Add connection string to environment variables

---

## 🐛 Troubleshooting

### Backend Issues
- **"Application failed to respond"**: Check start command is `node src/server.js`
- **Database errors**: SQLite file resets on deploy, initialize with seed data
- **CORS errors**: Ensure backend has CORS enabled for your Vercel domain

### Frontend Issues
- **API calls fail**: Double-check backend URL in code
- **Build fails**: Run `npm run build` locally first to catch errors
- **Blank page**: Check browser console for errors, usually API endpoint issue

### Render Free Tier Sleep
If backend is slow on first load:
```typescript
// Add to frontend - wake up backend on page load
useEffect(() => {
  axios.get(`${API_URL}/api/health`).catch(() => {});
}, []);
```

Add this endpoint to backend:
```javascript
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});
```

---

## 📊 Cost Breakdown

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **Vercel** | Unlimited sites, 100GB bandwidth/month | $20/month for team features |
| **Render** | 750 hours/month (1 service 24/7) | $7/month for always-on |
| **Domain** | Free .vercel.app | $10-15/year for custom |

**Total for hobby**: $0/month ✅

---

## 🎯 Next Steps After Deployment

1. **Initialize Database**: Visit your backend URL + `/api/meals` to trigger database creation
2. **Test All Features**: Click through every tab and feature
3. **Share Link**: Your app is live! Share your Vercel URL
4. **Monitor**: Check Render dashboard for logs if issues arise
5. **Update Content**: Push to GitHub, both platforms auto-deploy

---

## 📱 Mobile Testing

Your site works on mobile automatically! Test at:
- https://whatismybrowser.com/
- Or scan QR code from Vercel dashboard

---

## 🔄 Continuous Deployment

Both platforms auto-deploy when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Updated meal images"
git push origin main

# Both Vercel and Render will auto-deploy in 2-3 minutes!
```

---

Need help? Check deployment logs in each dashboard.
