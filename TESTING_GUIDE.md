# Testing Guide for EventMate Application

## Overview
This guide will help you test the main functionality of the EventMate application, including user registration, login, event viewing, booking, and admin notifications.

## Prerequisites
- Backend running on http://localhost:8082
- Frontend running on http://localhost:3000
- MySQL database properly configured

## Test Cases

### 1. User Registration
1. Open your browser and go to http://localhost:3000
2. Click on "Sign Up" or navigate to http://localhost:3000/signup
3. Fill in the registration form with:
   - Full Name: Test User
   - Email: test@example.com
   - Password: password123
   - Confirm Password: password123
4. Click "Sign Up"
5. You should see a success message and be redirected to the login page

### 2. User Login
1. On the login page, enter:
   - Email: test@example.com
   - Password: password123
2. Click "Login"
3. You should be redirected to the User Dashboard

### 3. View Events
1. On the User Dashboard, you should see a list of available events
2. Each event should display:
   - Event name
   - Description
   - Date and time
   - Package information
   - Services included

### 4. Submit an Enquiry
1. Click on "Submit Enquiry" in the sidebar or quick actions
2. Fill in the enquiry form:
   - Subject: Test Enquiry
   - Message: This is a test enquiry
3. Click "Submit Enquiry"
4. You should see a success message

### 5. Book an Event
1. Click on "Book Event" button for any event
2. In the booking form, add any special requests (optional)
3. Click "Submit Booking"
4. You should see a success message

### 6. Admin Notification (Backend Verification)
1. When a user books an event, a notification should be created in the database
2. You can verify this by checking the notifications table in the database
3. Or by using the API endpoint: GET http://localhost:8082/api/notifications

### 7. Admin Login
1. Log out of the user account
2. Log in with the admin credentials:
   - Email: admin@example.com
   - Password: admin123
3. You should be redirected to the Admin Dashboard

### 8. View Notifications (Admin)
1. On the Admin Dashboard, click on "Notifications" in the sidebar
2. You should see the booking notification from the user
3. Click "Mark as read" to mark the notification as read

### 9. View Bookings (Admin)
1. On the Admin Dashboard, click on "Bookings" in the sidebar
2. You should see a list of all bookings with their status

## API Testing with curl

### Register a new user
```bash
curl -X POST http://localhost:8082/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "API Test User",
    "email": "api_test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8082/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "api_test@example.com",
    "password": "password123"
  }'
```

### Get all events
```bash
curl -X GET http://localhost:8082/api/events
```

### Get all packages
```bash
curl -X GET http://localhost:8082/api/packages
```

### Get all services
```bash
curl -X GET http://localhost:8082/api/services
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Make sure no other instances of the application are running
   - Use `netstat -ano | findstr :8082` to check for processes using port 8082
   - Kill the process with `taskkill /PID <process_id> /F`

2. **Database connection failed**
   - Verify MySQL is running
   - Check database credentials in `application.properties`
   - Ensure the database `eventmate_db` exists

3. **CORS errors**
   - Make sure both frontend and backend are running
   - Check CORS configuration in `SecurityConfig.java`

4. **Frontend not connecting to backend**
   - Verify backend is running on port 8082
   - Check browser console for network errors
   - Ensure API service in frontend is pointing to the correct URL

## Database Schema

The application uses the following tables:
- users: Stores user information (id, full_name, email, password, role)
- events: Stores event information (id, name, description, event_date, package_id)
- packages: Stores package information (id, name, description, price)
- services: Stores service information (id, name, description)
- event_services: Junction table for events and services (event_id, service_id)
- bookings: Stores booking information (id, user_id, event_id, booking_date, status, special_requests)
- enquiries: Stores enquiry information (id, user_id, subject, message, status)
- notifications: Stores notification information (id, user_id, title, message, is_read, related_booking_id)

## Conclusion

This testing guide covers the main functionality of the EventMate application. All features should work as described when the application is properly configured and running.