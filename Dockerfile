# Build stage
FROM maven:3.8-openjdk-17 as builder
WORKDIR /app
COPY . .
RUN mvn clean install -DskipTests

# Runtime stage
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=builder /app/backend/target/expense-tracker-1.0.0.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
