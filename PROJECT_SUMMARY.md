# EventMate Project Summary

## Project Overview

EventMate is an AI-powered event planning and scheduling application built using Java (Spring Boot) for the backend and React for the frontend. The main goal is to simplify and automate event planning — whether it's a birthday, wedding, conference, or corporate meet — by helping users:

- Plan events based on their budget, preferences, and guest count
- Suggest suitable venues, decorators, caterers, and entertainment options
- Automatically generate schedules (timelines, reminders, vendor coordination)
- Use AI recommendations to improve efficiency, cost, and timing

## Implementation Details

### Backend (Spring Boot)

#### Features Implemented:
1. **User Management System**
   - User registration with validation
   - User authentication and login
   - Role-based access control (USER, PLANNER, ADMIN)
   - Password hashing for security

2. **Database Integration**
   - MySQL database integration
   - JPA/Hibernate for ORM
   - Automatic schema generation

3. **API Endpoints**
   - POST `/api/auth/signup` - User registration
   - POST `/api/auth/login` - User authentication

4. **Security**
   - Password encryption using BCrypt
   - Default admin user creation on first run

#### Project Structure:
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
├── README.md                  # Setup instructions
├── DATABASE_SETUP.md          # Database setup guide
├── run.bat                    # Script to run the backend
└── pom.xml                   # Maven dependencies
```

### Frontend (React)

#### Features Implemented:
1. **User Interface**
   - Signup page with form validation
   - Login page with form validation
   - Dashboard pages for different user roles

2. **Authentication Flow**
   - Signup form that sends data to backend
   - Login form that authenticates with backend
   - Role-based redirection to appropriate dashboard

3. **Component Structure**
   - LoginForm component
   - SignupForm component
   - Dashboard components for User, Planner, and Admin

#### Project Structure:
```
frontend/
├── src/
│   ├── components/
│   │   ├── LoginForm.jsx
│   │   └── SignupForm.jsx
│   ├── pages/
│   │   ├── AdminDashboard.jsx
│   │   ├── LoginPage.jsx
│   │   ├── PlannerDashboard.jsx
│   │   ├── SignupPage.jsx
│   │   └── UserDashboard.jsx
│   ├── App.jsx
│   └── index.js
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Setup Instructions

### Backend Setup:
1. Create a MySQL database named `eventmate_db`
2. Update database credentials in `backend/src/main/resources/application.properties`
3. Run the backend using `mvn spring-boot:run` or the `run.bat` script

### Frontend Setup:
1. Navigate to the frontend directory
2. Install dependencies with `npm install`
3. Start the development server with `npm start`

## Default Admin User

On first run, the backend automatically creates a default admin user:
- Email: `admin@eventmate.com`
- Password: `admin123`

## Future Enhancements

1. **AI Integration**
   - Implement AI algorithms for event planning recommendations
   - Add machine learning models for budget optimization

2. **Advanced Features**
   - Event scheduling and calendar integration
   - Vendor management system
   - Budget tracking and analytics
   - Guest management and invitation system

3. **Security Improvements**
   - JWT token-based authentication
   - OAuth2 integration for social logins
   - Enhanced password policies

4. **UI/UX Enhancements**
   - Responsive design improvements
   - Dark mode support
   - Real-time notifications
   - Drag-and-drop scheduling interface

## Technologies Used

### Backend:
- Java 17
- Spring Boot 3.3.4
- Spring Data JPA
- Spring Security
- MySQL 8.0+
- Maven

### Frontend:
- React 18+
- React Router v6+
- Tailwind CSS
- Framer Motion
- Lucide React Icons

This implementation provides a solid foundation for the EventMate application with a clean separation of concerns between frontend and backend, proper authentication flow, and extensible architecture for future enhancements.