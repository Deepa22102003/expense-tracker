# ⚡ 5-MINUTE QUICK START

## 🚀 Get Running in 5 Minutes!

### Step 1: Open Project (30 seconds)
```powershell
cd "C:\Users\deepa\OneDrive\Desktop\Expense Tracker"
code .
```

### Step 2: Start Backend (2 minutes)
```powershell
# Terminal 1
cd backend
mvn clean install
mvn spring-boot:run
```
✅ Wait for: `Started ExpenseTrackerApplication in ... seconds`

### Step 3: Start Frontend (1 minute)
- Right-click `frontend/index.html`
- Click **"Open with Live Server"**
- Browser opens automatically!

### Step 4: Test (1.5 minutes)
1. Click **"👥 Groups"** button
2. Click **"+ New Group"**
3. Name: "Test" → Create
4. Click **"💸 Expenses"**
5. Click **"+ Add Expense"**
6. Fill in details → Add
7. Click **"📊 Dashboard"** to see totals

**Done! 🎉 Your app works!**

---

## 📝 Credentials
- **Backend:** http://localhost:8080
- **Frontend:** http://localhost:5500
- **Database Console:** http://localhost:8080/h2-console

---

## 🆘 If Something Fails

### Backend won't start?
```powershell
# Check Java
java -version

# Check Maven
mvn -version

# If not found, download and add to PATH
```

### Frontend not loading?
- Make sure Live Server extension is installed
- Try different port in VS Code (port 5501, 5502)

### Can't connect Frontend to Backend?
- Verify backend is running
- Check browser console (F12) for errors
- Check API_URL in `frontend/js/app.js`

---

## 📚 Full Documentation
- See `README.md` for complete setup guide
- See `DEPLOYMENT.md` for deployment instructions
- See `backend/README.md` for backend details

**You're ready! Start building! 🚀**
