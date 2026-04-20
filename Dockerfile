FROM maven:3.8-openjdk-17-slim

WORKDIR /app

COPY . .

RUN cd backend && mvn clean install -DskipTests && cd ..

EXPOSE 8080

CMD ["java", "-jar", "backend/target/expense-tracker-1.0.0.jar"]
