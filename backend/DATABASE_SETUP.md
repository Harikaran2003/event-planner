# Database Setup for EventMate Backend

## Prerequisites

- MySQL 8.0 or higher installed
- MySQL command-line client or MySQL Workbench

## Database Creation

1. Open MySQL command-line client or MySQL Workbench
2. Connect to your MySQL server
3. Run the following SQL commands:

```sql
-- Create the database
CREATE DATABASE eventmate_db;

-- Create a user for the application (optional but recommended)
CREATE USER 'eventmate_user'@'localhost' IDENTIFIED BY 'your_secure_password';

-- Grant privileges to the user
GRANT ALL PRIVILEGES ON eventmate_db.* TO 'eventmate_user'@'localhost';

-- Apply the changes
FLUSH PRIVILEGES;
```

## Update Application Properties

Open `src/main/resources/application.properties` and update the following properties:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/eventmate_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=eventmate_user
spring.datasource.password=your_secure_password
```

## Tables

The application will automatically create the required tables on first run thanks to Hibernate's `ddl-auto=update` setting.

The following table will be created:

### users
- id (BIGINT, PRIMARY KEY, AUTO_INCREMENT)
- full_name (VARCHAR)
- email (VARCHAR, UNIQUE)
- password (VARCHAR)
- role (ENUM: USER, PLANNER, ADMIN)

## Testing the Connection

After setting up the database, you can test the connection by running:

```bash
cd backend
mvn spring-boot:run
```

The application should start without any database connection errors.