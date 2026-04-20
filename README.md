# Expense Tracker - Complete Setup & Run Guide 🚀

A full-stack **Expense Tracker** application with modern frontend and Java Spring Boot backend.

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Project Structure](#project-structure)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Running the Application](#running-the-application)
7. [API Documentation](#api-documentation)
8. [Testing](#testing)
9. [Troubleshooting](#troubleshooting)
10. [Deployment](#deployment)

---

## 🎯 Project Overview

**Expense Tracker** allows users to:
- ✅ Create expense groups (Trip, College, Family, etc.)
- ✅ Add, edit, and delete expenses
- ✅ View total expenses and balance summary
- ✅ Real-time dashboard with statistics
- ✅ Filter expenses by group
- ✅ Responsive design (works on mobile & desktop)

**Tech Stack:**
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Java 17, Spring Boot 3.1.5
- **Database:** H2 (embedded, no setup needed) / MySQL (optional)
- **API:** REST APIs with CORS support

---

## 📦 Prerequisites

### System Requirements
- **Windows 10/11** (or Linux/Mac)
- **Java 17+** (Download from [oracle.com](https://www.oracle.com/java/technologies/downloads/))
- **Maven 3.8+** (Download from [maven.apache.org](https://maven.apache.org/download.cgi))
- **VS Code** (Download from [code.visualstudio.com](https://code.visualstudio.com))

### Required VS Code Extensions
1. **Extension Pack for Java** (Microsoft) - for Java development
2. **Spring Boot Extension Pack** (VMware) - for Spring Boot
3. **Live Server** (Ritwick Dey) - for frontend development

### Check Java & Maven Installation
```powershell
java -version
mvn -version
```

If not installed, download and add to PATH.

---

## 📁 Project Structure

```
Expense Tracker/
├── frontend/                           # Website files
│   ├── index.html                      # Main page
│   ├── css/
│   │   └── style.css                   # Styles
│   ├── js/
│   │   └── app.js                      # JavaScript logic
│   └── pages/                          # Additional pages (optional)
│
└── backend/                            # Java Spring Boot project
    ├── pom.xml                         # Maven configuration
    ├── src/main/
    │   ├── java/com/expense/tracker/
    │   │   ├── ExpenseTrackerApplication.java   # Main app
    │   │   ├── controller/             # REST Controllers
    │   │   ├── service/                # Business Logic
    │   │   ├── repository/             # Database Access
    │   │   └── model/                  # Entity Classes
    │   └── resources/
    │       └── application.properties  # Config
    └── README.md
```

---

## 🔧 Backend Setup (Java + Spring Boot)

### Step 1: Open Backend in VS Code

```powershell
# Navigate to project root
cd "C:\Users\deepa\OneDrive\Desktop\Expense Tracker"

# Open in VS Code
code .
```

### Step 2: Install Java Extension Pack
- Click **Extensions** (left sidebar)
- Search for **"Extension Pack for Java"** by Microsoft
- Click **Install**
- Reload VS Code

### Step 3: Open Integrated Terminal
- Press `Ctrl + ` (backtick) or go to **Terminal → New Terminal**
- Navigate to backend folder:
```powershell
cd backend
```

### Step 4: Build the Backend

```powershell
# Download dependencies and compile
mvn clean install
```

**Output should show:**
```
[INFO] BUILD SUCCESS
```

### Step 5: Run the Backend

```powershell
# Start Spring Boot server
mvn spring-boot:run
```

**Expected output:**
```
...
Tomcat started on port(s): 8080 (http) with context path ''
Started ExpenseTrackerApplication in 5.234 seconds
```

✅ **Backend is running at:** `http://localhost:8080`

---

## 💻 Frontend Setup (HTML + CSS + JavaScript)

### Step 1: Open Frontend Folder

In VS Code, the frontend files are in `frontend/` directory:
- `index.html` - Main page
- `css/style.css` - Styling
- `js/app.js` - JavaScript logic

### Step 2: Install Live Server Extension

If not already installed:
- Click **Extensions**
- Search for **"Live Server"** by Ritwick Dey
- Click **Install**

### Step 3: Start Live Server

- Right-click on `frontend/index.html`
- Click **"Open with Live Server"**
- Browser opens at `http://localhost:5500` or `http://127.0.0.1:5500`

✅ **Frontend is running!**

---

## 🚀 Running the Complete Application

### Complete Workflow:

**Terminal 1 - Backend:**
```powershell
cd "C:\Users\deepa\OneDrive\Desktop\Expense Tracker\backend"
mvn spring-boot:run
# Server runs on http://localhost:8080
```

**Terminal 2 - Frontend (or VS Code):**
- Right-click `frontend/index.html`
- Click **"Open with Live Server"**
- Opens at `http://localhost:5500`

### Testing the Application:

1. **Dashboard** - See empty dashboard on first load
2. **Create Group** - Click "👥 Groups" → "+ New Group"
   - Name: "Trip to Paris"
   - Description: "Vacation expenses"
   - Click "Create Group"
3. **Add Expense** - Click "💸 Expenses" → "+ Add Expense"
   - Group: Select your group
   - Description: "Hotel"
   - Amount: 5000
   - Date: Today
   - Click "Add Expense"
4. **View Dashboard** - Click "📊 Dashboard" to see totals
5. **Edit/Delete** - Use buttons in Expenses table

---

## 📡 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Endpoints

#### Groups

**Get All Groups**
```
GET /groups
```
Response:
```json
[
  {
    "id": 1,
    "name": "Trip",
    "description": "Vacation",
    "expenses": [...]
  }
]
```

**Create Group**
```
POST /groups
Content-Type: application/json

{
  "name": "Trip",
  "description": "Vacation expenses"
}
```

**Update Group**
```
PUT /groups/{id}
Content-Type: application/json

{
  "name": "Updated Trip",
  "description": "Updated description"
}
```

**Delete Group**
```
DELETE /groups/{id}
```

#### Expenses

**Get All Expenses**
```
GET /expenses
```

**Get Expense by ID**
```
GET /expenses/{id}
```

**Get Expenses by Group**
```
GET /groups/{groupId}/expenses
```

**Create Expense**
```
POST /groups/{groupId}/expenses
Content-Type: application/json

{
  "description": "Hotel",
  "amount": 5000.00,
  "date": "2026-04-20"
}
```

**Update Expense**
```
PUT /expenses/{id}
Content-Type: application/json

{
  "description": "Updated Hotel",
  "amount": 5500.00,
  "date": "2026-04-20"
}
```

**Delete Expense**
```
DELETE /expenses/{id}
```

---

## 🧪 Testing with Postman (Optional)

### Download Postman
- Download from [postman.com](https://www.postman.com/downloads/)

### Test API

1. **Create Group**
   - Method: `POST`
   - URL: `http://localhost:8080/api/groups`
   - Body (JSON):
     ```json
     {
       "name": "Office",
       "description": "Office expenses"
     }
     ```
   - Click **Send**

2. **Add Expense**
   - Method: `POST`
   - URL: `http://localhost:8080/api/groups/1/expenses`
   - Body (JSON):
     ```json
     {
       "description": "Coffee",
       "amount": 100,
       "date": "2026-04-20"
     }
     ```
   - Click **Send**

---

## 🐛 Troubleshooting

### Issue 1: "Maven command not found"
**Solution:**
- Install Maven from [maven.apache.org](https://maven.apache.org/download.cgi)
- Add to PATH (System Environment Variables)
- Restart Terminal

### Issue 2: "Port 8080 already in use"
**Solution:**
```powershell
# Find process using port 8080
netstat -ano | findstr :8080

# Kill process (replace PID)
taskkill /PID {PID} /F

# Or use different port - edit application.properties:
# server.port=8081
```

### Issue 3: Frontend can't connect to backend
**Solution:**
- Ensure backend is running: `mvn spring-boot:run`
- Check CORS configuration in `ExpenseTrackerApplication.java`
- Check frontend URL in `app.js`:
  ```javascript
  const API_URL = 'http://localhost:8080/api';
  ```

### Issue 4: "Cannot find module" errors
**Solution:**
```powershell
# Clear cache and reinstall
mvn clean install -U
```

### Issue 5: H2 Database not persisting data
**Note:** H2 in-memory database (default) clears on restart. To use persistent database:

**Option A: Use MySQL**
- Install MySQL from [mysql.com](https://www.mysql.com/)
- Create database:
  ```sql
  CREATE DATABASE expensedb;
  ```
- Edit `application.properties`:
  ```properties
  spring.datasource.url=jdbc:mysql://localhost:3306/expensedb
  spring.datasource.username=root
  spring.datasource.password=your_password
  ```

**Option B: Use File-based H2**
- Edit `application.properties`:
  ```properties
  spring.datasource.url=jdbc:h2:file:./data/expensedb
  ```

---

## 📊 Database Access (H2 Console)

While backend is running:
- Open: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:expensedb`
- Click **Connect**
- View tables and data

---

## 🌐 Deployment

### Deploy Backend (Free Options)

#### Option 1: **Render** (FREE)
1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Connect GitHub account
4. Create new "Web Service"
5. Select repository
6. Build command: `mvn clean install`
7. Start command: `java -jar target/expense-tracker-1.0.0.jar`
8. Click **Deploy**

#### Option 2: **Railway.app** (FREE credits)
1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Deploy from GitHub
4. Select repository

### Deploy Frontend (FREE)

#### Option 1: **Netlify**
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site"
3. Drag & drop `frontend` folder
4. Done! Site deployed

#### Option 2: **Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Import `frontend` repository from GitHub
3. Deploy

#### Option 3: **GitHub Pages**
1. Push `frontend` folder to GitHub
2. Go to repo settings → Pages
3. Select branch and folder
4. Done!

### Update API URL for Production
In `frontend/js/app.js`:
```javascript
// Change from localhost to production URL
const API_URL = 'https://your-backend-url.com/api';
```

---

## 📸 Features Summary

### ✅ Fully Implemented
- ✅ Create/Read/Update/Delete Groups
- ✅ Create/Read/Update/Delete Expenses
- ✅ Dashboard with statistics
- ✅ Filter expenses by group
- ✅ Responsive design
- ✅ REST API with CORS
- ✅ H2 embedded database
- ✅ Error handling

### 🔄 Data Flow
```
Browser (Frontend) 
  ↓ (HTTP Requests)
JavaScript (CORS enabled)
  ↓ (REST API)
Spring Boot Server (8080)
  ↓ (JPA)
H2 Database (In-Memory)
```

---

## 💡 Next Steps

1. **Customize UI** - Edit `css/style.css`
2. **Add More Features** - Add categories, tags, budgets
3. **Secure Backend** - Add Spring Security (JWT tokens)
4. **Deploy to Cloud** - Use Render, Railway, or AWS
5. **Mobile App** - Convert to React Native or Flutter

---

## 📝 License
Open Source - Feel free to use and modify

---

## ❓ FAQ

**Q: Can I use MySQL instead of H2?**
A: Yes! Uncomment MySQL section in `pom.xml` and update `application.properties`

**Q: How do I change the port?**
A: Edit `application.properties`: `server.port=8081`

**Q: Can I deploy for free?**
A: Yes! Use Render (backend) + Netlify (frontend)

**Q: How do I access the database?**
A: Visit `http://localhost:8080/h2-console` while backend is running

---

## 🤝 Support
If you face issues:
1. Check Troubleshooting section above
2. Check console logs (Terminal/Output)
3. Verify Java and Maven versions
4. Clear Maven cache: `mvn clean install -U`

**Happy Tracking! 🎉**
