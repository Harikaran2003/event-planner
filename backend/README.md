# EventMate Backend

This is the backend for the EventMate application, built with Spring Boot.

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- MySQL 8.0 or higher

## Setup Instructions

1. **Database Setup**
   - Create a MySQL database named `eventmate_db`
   - Update the database credentials in `src/main/resources/application.properties`

2. **Configuration**
   - Open `src/main/resources/application.properties`
   - Update the following properties with your MySQL credentials:
     ```
     spring.datasource.username=your_username
     spring.datasource.password=your_password
     ```

3. **Build and Run**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

## API Endpoints

### Authentication

- **POST** `/api/auth/signup` - Register a new user
  - Request Body:
    ```json
    {
      "fullName": "John Doe",
      "email": "john@example.com",
      "password": "password123",
      "confirmPassword": "password123"
    }
    ```

- **POST** `/api/auth/login` - Login user
  - Request Body:
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```
  - Response:
    ```json
    {
      "message": "Login successful",
      "success": true,
      "role": "USER",
      "userId": 1
    }
    ```

## Default Admin User

On first run, the application will create a default admin user:
- Email: `admin@eventmate.com`
- Password: `admin123`

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/eventmate/
│   │   │   ├── controller/     # REST controllers
│   │   │   ├── dto/           # Data Transfer Objects
│   │   │   ├── entity/        # JPA entities
│   │   │   ├── repository/    # Spring Data JPA repositories
│   │   │   ├── service/       # Business logic services
│   │   │   ├── config/        # Configuration classes
│   │   │   └── EventmateBackendApplication.java # Main application class
│   │   └── resources/
│   │       └── application.properties # Configuration file
└── pom.xml # Maven dependencies
```