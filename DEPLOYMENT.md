# Free Deployment Guide - Expense Tracker 🚀

Deploy your app for FREE using industry-standard platforms!

## 📊 Deployment Architecture

```
Frontend (Netlify/Vercel)  ←→  Backend (Render/Railway)  ←→  Database (Cloud)
```

---

## 🌐 Frontend Deployment (HTML/CSS/JavaScript)

### Option 1: **Netlify** ⭐ Recommended

1. **Go to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Click **Sign Up** (use GitHub)

2. **Deploy**
   - Click **"Add new site"** → **"Deploy manually"**
   - Drag & drop `frontend` folder
   - Site deployed instantly!

3. **Get URL**
   - Your site: `https://your-site-name.netlify.app`

4. **Update Backend URL**
   - In `frontend/js/app.js`:
     ```javascript
     const API_URL = 'https://your-backend-url.com/api';
     ```

### Option 2: **Vercel**

1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"** → Import from GitHub
3. Select your repository
4. Deploy
5. Get URL: `https://your-project.vercel.app`

### Option 3: **GitHub Pages**

1. Push `frontend` to GitHub in `docs` folder
2. Go to repo Settings → Pages
3. Select **docs folder** as source
4. Done! Live at `https://username.github.io/expense-tracker`

---

## 🔧 Backend Deployment (Java/Spring Boot)

### Option 1: **Render.com** ⭐ Recommended FREE

#### Step-by-Step:

1. **Create GitHub Repository**
   ```powershell
   # In your project
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Go to Render**
   - Visit [render.com](https://render.com)
   - Click **Sign Up** (use GitHub)

3. **Create New Web Service**
   - Click **New +** → **Web Service**
   - Select your GitHub repository
   - Connect

4. **Configure**
   - **Name:** `expense-tracker-api`
   - **Environment:** Java
   - **Build Command:** `mvn clean install`
   - **Start Command:** `java -jar target/expense-tracker-1.0.0.jar`
   - **Instance Type:** Free

5. **Deploy**
   - Click **Create Web Service**
   - Wait 2-3 minutes
   - Get URL: `https://expense-tracker-api.onrender.com`

#### Important Notes:
- Free tier goes to sleep after 15 mins of inactivity
- First request will be slow (wakes up server)
- Upgrade to paid for always-on ($7/month)

### Option 2: **Railway.app**

1. Go to [railway.app](https://railway.app)
2. Click **New Project** → **Deploy from GitHub**
3. Select repository
4. Add PostgreSQL (free)
5. Deploy
6. Get URL in Deployments tab

### Option 3: **Heroku** (Paid, but cheapest)

1. Go to [heroku.com](https://heroku.com)
2. Create app
3. Connect GitHub
4. Deploy branch
5. Auto-deploys on push

---

## 🗄️ Database Deployment (Optional)

### Current Setup
- Using **H2 in-memory** (resets on server restart)
- Fine for learning/testing

### Upgrade to Persistent Database

#### Option 1: **Cloud SQL (Google Cloud)**
- Free tier: 1 GB storage
- Setup takes 5 mins

#### Option 2: **AWS RDS**
- Free tier: 1 year, 20 GB
- Auto-backups

#### Option 3: **MongoDB Atlas**
- Free forever: 512 MB
- Easiest setup

#### Switch to MySQL Cloud

1. **Create MySQL Database**
   - Visit [db4free.net](https://db4free.net) - Free MySQL
   - Create account
   - Create database

2. **Update Backend**
   - Edit `backend/src/main/resources/application.properties`:
     ```properties
     spring.datasource.url=jdbc:mysql://your-server:3306/expensedb
     spring.datasource.username=your_user
     spring.datasource.password=your_password
     spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
     spring.jpa.hibernate.ddl-auto=update
     ```

3. **Uncomment MySQL in pom.xml**
   - Uncomment MySQL driver dependency

4. **Rebuild & Deploy**
   ```powershell
   mvn clean install
   ```

---

## 🔗 Complete Deployment Example

### Frontend on Netlify
```
Your Site: https://expense-tracker.netlify.app
```

### Backend on Render
```
API Server: https://expense-tracker-api.onrender.com
```

### Update Frontend URL
Edit `frontend/js/app.js`:
```javascript
const API_URL = 'https://expense-tracker-api.onrender.com/api';
```

---

## ✅ Deployment Checklist

- [ ] Backend running locally on `http://localhost:8080`
- [ ] Frontend running locally on `http://localhost:5500`
- [ ] Test all features locally
- [ ] Push code to GitHub
- [ ] Deploy backend to Render/Railway
- [ ] Get backend production URL
- [ ] Update API_URL in `app.js`
- [ ] Deploy frontend to Netlify/Vercel
- [ ] Test in production
- [ ] Share URL with users!

---

## 📊 Cost Breakdown (Monthly)

| Service | Free Tier | Paid |
|---------|-----------|------|
| **Frontend (Netlify)** | Unlimited | Upgrade later |
| **Backend (Render)** | Free w/ sleep | $7 (always-on) |
| **Database (db4free)** | Free | - |
| **Total** | **FREE** | **$7-15** |

---

## 🚀 Quick Deploy Script

```powershell
# 1. Build
mvn clean install -DskipTests

# 2. Create JAR
mvn package

# 3. Test production build locally
java -jar target/expense-tracker-1.0.0.jar

# 4. Push to GitHub
git add .
git commit -m "Deploy v1"
git push origin main

# 5. Render will auto-deploy!
```

---

## 🔄 Continuous Deployment (Auto-deploy on Push)

### With Render (Recommended)

1. **Connect GitHub** (already done)
2. **Every time you push:**
   ```powershell
   git push origin main
   ```
   - Render automatically rebuilds & deploys! ✅

### With Netlify

1. **Connect GitHub** during initial deployment
2. **Every push to main** = auto-deploy frontend

---

## 🐛 Troubleshooting Deployment

| Error | Solution |
|-------|----------|
| "Build failed" | Check `mvn clean install` locally first |
| "CORS error" | Update API_URL in `app.js` |
| "Port already in use" | Use different port in `application.properties` |
| "Database connection failed" | Check `application.properties` credentials |
| "Render free tier slow" | Upgrade to paid for always-on |
| "Frontend can't reach backend" | Check CORS in `ExpenseTrackerApplication.java` |

---

## 🎯 Next Steps After Deployment

1. **Share URL** - Send production URL to users
2. **Monitor** - Check Render/Netlify dashboards
3. **Add Features** - Update code, push, auto-deploys
4. **Scale** - Upgrade paid tiers if needed
5. **Security** - Add authentication (JWT tokens)
6. **Analytics** - Add Google Analytics

---

## 📞 Support Links

- **Render Docs:** [render.com/docs](https://render.com/docs)
- **Netlify Docs:** [netlify.com/blog](https://netlify.com/blog)
- **Spring Boot:** [spring.io/guides](https://spring.io/guides)

---

**You're all set! Your app is now live on the internet! 🎉**
