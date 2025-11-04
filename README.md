# EventMate - AI-Powered Event Planning Application

## Overview
EventMate is a comprehensive event planning application that allows users to browse events, make bookings, and submit enquiries. Administrators can manage events, packages, services, and receive notifications when users make bookings.

## Features

### User Features
- **User Registration and Authentication**: Secure signup and login functionality
- **Event Browsing**: View available events with detailed information including name, description, date, package, and services
- **Event Booking**: Book events with special requests
- **Enquiry Submission**: Submit enquiries to administrators
- **Responsive Dashboard**: Mobile-friendly user interface

### Admin Features
- **Event Management**: Create, update, and delete events
- **Package Management**: Manage event packages with pricing
- **Service Management**: Manage services that can be included in events
- **Booking Management**: View and manage all user bookings
- **Enquiry Management**: View and respond to user enquiries
- **Notifications**: Receive real-time notifications when users make bookings
- **Dashboard**: Comprehensive admin dashboard with tab navigation

### Technical Features
- **RESTful API**: Well-structured backend API with proper endpoints
- **Database Integration**: MySQL database with proper relationships
- **Security**: Spring Security with CORS configuration
- **Real-time Data**: All data is fetched from the backend database
- **Responsive Design**: Mobile-friendly frontend with Tailwind CSS

## Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3.3.4**
- **Spring Data JPA**
- **Spring Security**
- **MySQL 8.0**
- **Maven**

### Frontend
- **React 18**
- **React Router 6**
- **Tailwind CSS**
- **Lucide React Icons**
- **Framer Motion**

## Project Structure

```
eventmate/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/eventmate/
│   │   │   │   ├── config/
│   │   │   │   ├── controller/
│   │   │   │   ├── dto/
│   │   │   │   ├── model/
│   │   │   │   ├── repository/
│   │   │   │   └── service/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── ...
├── HOW_TO_USE.md
├── TESTING_GUIDE.md
├── IMPLEMENTATION_SUMMARY.md
├── EXTENSION_GUIDE.md
└── README.md
```

## Database Schema

The application uses the following tables:
- **users**: Stores user information (id, full_name, email, password, role)
- **events**: Stores event information (id, name, description, event_date, package_id)
- **packages**: Stores package information (id, name, description, price)
- **services**: Stores service information (id, name, description)
- **event_services**: Junction table for events and services (event_id, service_id)
- **bookings**: Stores booking information (id, user_id, event_id, booking_date, status, special_requests)
- **enquiries**: Stores enquiry information (id, user_id, subject, message, status)
- **notifications**: Stores notification information (id, user_id, title, message, is_read, related_booking_id)

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login with existing credentials

### Events
- `GET /api/events` - Get all events
- `GET /api/events/{id}` - Get a specific event
- `POST /api/events` - Create a new event (admin only)
- `PUT /api/events/{id}` - Update an event (admin only)
- `DELETE /api/events/{id}` - Delete an event (admin only)

### Packages
- `GET /api/packages` - Get all packages
- `GET /api/packages/{id}` - Get a specific package
- `POST /api/packages` - Create a new package (admin only)
- `PUT /api/packages/{id}` - Update a package (admin only)
- `DELETE /api/packages/{id}` - Delete a package (admin only)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/{id}` - Get a specific service
- `POST /api/services` - Create a new service (admin only)
- `PUT /api/services/{id}` - Update a service (admin only)
- `DELETE /api/services/{id}` - Delete a service (admin only)

### Bookings
- `GET /api/bookings` - Get all bookings (admin only)
- `GET /api/bookings/user/{userId}` - Get bookings for a specific user
- `GET /api/bookings/{id}` - Get a specific booking
- `POST /api/bookings` - Create a new booking
- `PUT /api/bookings/{id}` - Update a booking (admin only)
- `DELETE /api/bookings/{id}` - Delete a booking

### Enquiries
- `GET /api/enquiries` - Get all enquiries (admin only)
- `GET /api/enquiries/{id}` - Get a specific enquiry
- `POST /api/enquiries` - Create a new enquiry
- `PUT /api/enquiries/{id}` - Update an enquiry (admin only)
- `DELETE /api/enquiries/{id}` - Delete an enquiry

### Notifications
- `GET /api/notifications` - Get all notifications (admin only)
- `GET /api/notifications/unread/{userId}` - Get unread notifications for a user
- `GET /api/notifications/{id}` - Get a specific notification
- `POST /api/notifications` - Create a new notification
- `PUT /api/notifications/{id}/mark-as-read` - Mark a notification as read
- `DELETE /api/notifications/{id}` - Delete a notification

## Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher
- Node.js 14 or higher
- npm 6 or higher
- MySQL 8.0 or higher

### Backend Setup
1. Make sure MySQL is running on your system
2. Update the database credentials in `backend/src/main/resources/application.properties` if needed
3. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
4. Build and run the backend application:
   ```bash
   mvn spring-boot:run
   ```
5. The backend will start on port 8082

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   npm start
   ```
4. The frontend will start on port 3000

### Accessing the Application
1. Open your browser and go to http://localhost:3000
2. You can either:
   - Sign up as a new user
   - Log in with the admin account (email: admin@example.com, password: admin123)

## Documentation

- [HOW_TO_USE.md](HOW_TO_USE.md) - Instructions for setting up and using the application
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - Comprehensive testing guide with test cases
- [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) - Summary of all implemented features and files
- [EXTENSION_GUIDE.md](EXTENSION_GUIDE.md) - Guide for extending the application with new features

## Testing

The application includes comprehensive testing capabilities:
- Unit tests for backend services
- Integration tests for API endpoints
- End-to-end tests for frontend functionality
- Manual testing procedures in TESTING_GUIDE.md

## Extending the Application

The modular architecture makes it easy to extend the application:
- Add new entities and relationships
- Implement additional features like email notifications
- Add file upload capabilities
- Implement pagination for large datasets
- Add security enhancements like JWT authentication
- Set up CI/CD pipelines for automated deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to all contributors who have helped build this application
- Special thanks to the open-source community for the libraries and tools used in this project