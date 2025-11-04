# Running the EventMate Application

This guide explains how to run both the frontend and backend components of the EventMate application.

## Prerequisites

Before running the application, ensure you have the following installed:

1. **Java 17 or higher**
2. **Maven 3.6 or higher**
3. **Node.js 14 or higher**
4. **npm 6 or higher**
5. **MySQL 8.0 or higher**

## Database Setup

1. Start your MySQL server
2. Create a database named `eventmate_db`
3. Create a user with appropriate privileges (optional but recommended)
4. Update the database credentials in `backend/src/main/resources/application.properties`

## Running the Backend

### Option 1: Using Maven (Recommended)
```bash
cd backend
mvn spring-boot:run
```

### Option 2: Using the Batch Script
```bash
cd backend
run.bat
```

### Option 3: Build and Run as JAR
```bash
cd backend
mvn clean package
java -jar target/eventmate-backend-0.0.1-SNAPSHOT.jar
```

The backend will start on port 8080 by default.

## Running the Frontend

1. Open a new terminal/command prompt
2. Navigate to the frontend directory
3. Install dependencies (first time only):
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

The frontend will start on port 3000 by default and will automatically open in your browser.

## Accessing the Application

Once both frontend and backend are running:

1. Open your browser and navigate to `http://localhost:3000`
2. You can now use the application:
   - Register as a new user (User or Planner role)
   - Login with your credentials
   - Access your role-specific dashboard

## Default Admin User

On first run of the backend, a default admin user is automatically created:
- Email: `admin@eventmate.com`
- Password: `admin123`

You can login with these credentials and access the admin dashboard.

## Development Workflow

For development, it's recommended to:

1. Start the backend server first
2. Start the frontend development server
3. Make changes to either frontend or backend code
4. The servers will automatically reload on code changes (Hot Reload)

## Troubleshooting

### Backend Issues

1. **Database Connection Failed**
   - Check if MySQL server is running
   - Verify database credentials in `application.properties`
   - Ensure the database `eventmate_db` exists

2. **Port Already in Use**
   - Change the port in `application.properties`:
     ```properties
     server.port=8081
     ```

### Frontend Issues

1. **Dependency Installation Failed**
   - Delete `node_modules` folder and `package-lock.json`
   - Run `npm install` again

2. **Proxy Error**
   - Ensure the backend server is running on port 8080
   - Check if the API endpoints are accessible

3. **Port Already in Use**
   - Set the PORT environment variable:
     ```bash
     PORT=3001 npm start
     ```

## API Endpoints

The backend exposes the following REST API endpoints:

### Authentication
- `POST http://localhost:8080/api/auth/signup` - Register a new user
- `POST http://localhost:8080/api/auth/login` - Login user

### Testing API Endpoints

You can test the API endpoints using tools like Postman or curl:

**User Registration:**
```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

**User Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## Stopping the Application

To stop the application:

1. **Backend**: Press `Ctrl+C` in the terminal where it's running
2. **Frontend**: Press `Ctrl+C` in the terminal where it's running

## Building for Production

### Backend
```bash
cd backend
mvn clean package
```
This creates a JAR file in the `target` directory that can be deployed to a server.

### Frontend
```bash
cd frontend
npm run build
```
This creates an optimized production build in the `build` directory that can be deployed to a web server.