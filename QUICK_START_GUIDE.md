# EventMate - Quick Start Guide

## Getting Started Quickly

### Prerequisites
Make sure you have these installed:
- Java 17 or higher
- Maven 3.6 or higher
- Node.js 14 or higher
- npm 6 or higher
- MySQL 8.0 or higher

### Quick Setup

1. **Start MySQL Database**
   - Make sure MySQL is running on your system

2. **Update Database Credentials**
   - Open `backend/src/main/resources/application.properties`
   - Update these lines with your MySQL credentials:
   ```
   spring.datasource.username=your_mysql_username
   spring.datasource.password=your_mysql_password
   ```

3. **Run Everything Automatically**
   - Double-click `start_all.bat` to start both backend and frontend
   - Wait for both applications to compile (this may take a few minutes)

4. **Access the Application**
   - Open your browser and go to http://localhost:3000

### Using the Application

#### For Regular Users
1. **Sign Up**
   - Click "Sign Up" on the login page
   - Fill in your details and create an account

2. **Log In**
   - Use your email and password to log in

3. **Browse Events**
   - View all available events on your dashboard
   - See event details including name, description, date, package, and services

4. **Book an Event**
   - Click "Book Event" on any event
   - Add special requests if needed
   - Submit your booking

5. **Submit an Enquiry**
   - Click "Submit Enquiry" in the sidebar
   - Fill in your subject and message
   - Submit your enquiry

#### For Administrators
1. **Log In**
   - Use these credentials:
     - Email: admin@example.com
     - Password: admin123

2. **View Notifications**
   - Check the notification bell for new booking alerts
   - Click "Mark as read" when you've handled a notification

3. **Manage Bookings**
   - Go to the "Bookings" tab
   - View all user bookings
   - Update booking statuses as needed

4. **Manage Events**
   - Use the admin dashboard to create, update, or delete events
   - Manage packages and services

### Stopping the Application

- **Automatic**: Double-click `stop_all.bat`
- **Manual**: 
  - Close the backend terminal window
  - Close the frontend terminal window

### Troubleshooting

#### Common Issues

1. **Port Already in Use**
   - Run `stop_all.bat` to stop any existing instances
   - Or manually kill processes using ports 8082 and 3000

2. **Database Connection Failed**
   - Verify MySQL is running
   - Check your database credentials in `application.properties`
   - Ensure the database `eventmate_db` exists

3. **Frontend Not Loading**
   - Wait for the frontend to finish compiling
   - Check that the backend is running on port 8082
   - Verify there are no firewall issues

4. **CORS Errors**
   - Make sure both frontend and backend are running
   - Check the browser console for specific error messages

### What's Included

#### Backend Features
- Complete RESTful API
- MySQL database integration
- User authentication and authorization
- Event, package, and service management
- Booking and enquiry systems
- Notification system

#### Frontend Features
- Responsive user dashboard
- Event browsing with detailed information
- Booking and enquiry forms
- Admin notification system
- Mobile-friendly design

### Technology Stack

- **Backend**: Java 17, Spring Boot, MySQL
- **Frontend**: React, Tailwind CSS, JavaScript
- **API**: RESTful endpoints with JSON
- **Security**: Spring Security, BCrypt encryption

### Next Steps

1. **Explore the Application**
   - Try booking an event as a user
   - Log in as admin and check notifications
   - Test all the features

2. **Customize**
   - Modify the database credentials
   - Add your own events, packages, and services
   - Customize the styling

3. **Extend**
   - Add new features using the extension guide
   - Integrate with email services
   - Add payment processing

### Documentation

For more detailed information, check these files:
- `README.md` - Complete project overview
- `HOW_TO_USE.md` - Detailed usage instructions
- `TESTING_GUIDE.md` - Comprehensive testing procedures
- `EXTENSION_GUIDE.md` - Guide for adding new features

### Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the documentation files
3. Verify all prerequisites are installed
4. Ensure all services are running correctly

The EventMate application is ready to use immediately after setup!