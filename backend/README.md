# Expense Tracker Backend - Setup & Run

## Quick Start

### Prerequisites
- Java 17+ ([download](https://www.oracle.com/java/technologies/downloads/))
- Maven 3.8+ ([download](https://maven.apache.org/download.cgi))

### Run Backend

```powershell
cd backend
mvn clean install
mvn spring-boot:run
```

**Server runs on:** `http://localhost:8080`

## Project Structure

```
backend/
├── src/main/
│   ├── java/com/expense/tracker/
│   │   ├── ExpenseTrackerApplication.java    # Main App
│   │   ├── controller/
│   │   │   ├── GroupController.java         # Group REST APIs
│   │   │   └── ExpenseController.java       # Expense REST APIs
│   │   ├── service/
│   │   │   ├── GroupService.java
│   │   │   └── ExpenseService.java
│   │   ├── repository/
│   │   │   ├── GroupRepository.java
│   │   │   └── ExpenseRepository.java
│   │   └── model/
│   │       ├── ExpenseGroup.java
│   │       └── Expense.java
│   └── resources/
│       └── application.properties           # Config
└── pom.xml                                  # Dependencies
```

## Database

- **H2 (Embedded):** Default, no setup needed
- **MySQL:** Uncomment in `pom.xml` and update `application.properties`

### H2 Console
While backend is running: `http://localhost:8080/h2-console`

## API Endpoints

- `GET /api/groups` - Get all groups
- `POST /api/groups` - Create group
- `DELETE /api/groups/{id}` - Delete group
- `GET /api/expenses` - Get all expenses
- `POST /api/groups/{groupId}/expenses` - Create expense
- `PUT /api/expenses/{id}` - Update expense
- `DELETE /api/expenses/{id}` - Delete expense

## Maven Commands

```powershell
# Build project
mvn clean install

# Run application
mvn spring-boot:run

# Run tests
mvn test

# Build JAR (production)
mvn clean package
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Maven not found | Add Maven to PATH |
| Port 8080 in use | Edit `server.port=8081` in `application.properties` |
| Dependencies missing | Run `mvn clean install -U` |
| CORS errors | Check `ExpenseTrackerApplication.java` CORS config |

## Production Deployment

### Build JAR
```powershell
mvn clean package
```

### Run JAR
```powershell
java -jar target/expense-tracker-1.0.0.jar
```

### Deploy to Cloud
- **Render:** Upload to GitHub, connect Render, auto-deploy
- **Railway:** Similar process
- **AWS:** Upload JAR to EC2 or use Elastic Beanstalk

---

**Happy coding! 🚀**
