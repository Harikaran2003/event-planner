# How to Use the EventMate Application

## Prerequisites
- Java 17 or higher
- Maven 3.6 or higher
- Node.js 14 or higher
- npm 6 or higher
- MySQL 8.0 or higher

## Backend Setup

1. Make sure MySQL is running on your system
2. Update the database credentials in `backend/src/main/resources/application.properties` if needed:
   ```
   spring.datasource.username=your_mysql_username
   spring.datasource.password=your_mysql_password
   ```
3. Open a terminal and navigate to the backend directory:
   ```
   cd backend
   ```
4. Build and run the backend application:
   ```
   mvn spring-boot:run
   ```
5. The backend will start on port 8082

## Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install the dependencies:
   ```
   npm install
   ```
3. Start the frontend application:
   ```
   npm start
   ```
4. The frontend will start on port 3000

## Using the Application

1. Open your browser and go to http://localhost:3000
2. You can either:
   - Sign up as a new user
   - Log in with the admin account (email: admin@example.com, password: admin123)
3. After logging in, you'll be redirected to the appropriate dashboard based on your role:
   - User Dashboard: For regular users to view events and make bookings
   - Admin Dashboard: For administrators to manage events and view notifications

## Features

### User Features
- View available events with details (name, description, date, package, services)
- Book events with special requests
- Submit enquiries
- Receive notifications about booking status

### Admin Features
- View all bookings and enquiries
- Manage events, packages, and services
- Receive notifications when users make bookings
- Update booking statuses

## API Endpoints

### Authentication
- POST /api/auth/signup - Register a new user
- POST /api/auth/login - Login with existing credentials

### Events
- GET /api/events - Get all events
- GET /api/events/{id} - Get a specific event
- POST /api/events - Create a new event (admin only)
- PUT /api/events/{id} - Update an event (admin only)
- DELETE /api/events/{id} - Delete an event (admin only)

### Packages
- GET /api/packages - Get all packages
- GET /api/packages/{id} - Get a specific package
- POST /api/packages - Create a new package (admin only)
- PUT /api/packages/{id} - Update a package (admin only)
- DELETE /api/packages/{id} - Delete a package (admin only)

### Services
- GET /api/services - Get all services
- GET /api/services/{id} - Get a specific service
- POST /api/services - Create a new service (admin only)
- PUT /api/services/{id} - Update a service (admin only)
- DELETE /api/services/{id} - Delete a service (admin only)

### Bookings
- GET /api/bookings - Get all bookings (admin only)
- GET /api/bookings/user/{userId} - Get bookings for a specific user
- GET /api/bookings/{id} - Get a specific booking
- POST /api/bookings - Create a new booking
- PUT /api/bookings/{id} - Update a booking (admin only)
- DELETE /api/bookings/{id} - Delete a booking

### Enquiries
- GET /api/enquiries - Get all enquiries (admin only)
- GET /api/enquiries/{id} - Get a specific enquiry
- POST /api/enquiries - Create a new enquiry
- PUT /api/enquiries/{id} - Update an enquiry (admin only)
- DELETE /api/enquiries/{id} - Delete an enquiry

### Notifications
- GET /api/notifications - Get all notifications (admin only)
- GET /api/notifications/unread/{userId} - Get unread notifications for a user
- GET /api/notifications/{id} - Get a specific notification
- POST /api/notifications - Create a new notification
- PUT /api/notifications/{id}/mark-as-read - Mark a notification as read
- DELETE /api/notifications/{id} - Delete a notification