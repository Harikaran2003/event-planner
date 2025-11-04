# Admin User Setup

This document provides instructions for manually creating an admin user if the automatic creation fails or if you need to create additional admin users.

## Automatic Admin User Creation

The application automatically creates a default admin user on first run:

- **Email**: `admin@eventmate.com`
- **Password**: `admin123`
- **Full Name**: `Admin User`

This is handled by the `DataInitializer` class in the backend.

## Manual Admin User Creation

If you need to create an admin user manually, you have several options:

### Option 1: Direct Database Insert

Connect to your MySQL database and run the following SQL command:

```sql
INSERT INTO users (full_name, email, password, role) 
VALUES ('Admin User', 'admin@eventmate.com', '$2a$10$wHjp1ZW2Pz.3tB1s5zoW5u6JCLq8I2G7dGqj4DvK.8bK3Q1dQx7eG', 'ADMIN');
```

Note: The password is already BCrypt hashed for "admin123".

### Option 2: Using Backend API

If the backend is running, you can temporarily modify the signup endpoint to allow admin creation:

1. Update the `UserService.registerUser()` method to allow admin role during signup
2. Register through the signup form with role set to "ADMIN"
3. Restore the original restriction

### Option 3: Create a Management Endpoint

Add a temporary endpoint to create admin users:

```java
@PostMapping("/admin/create")
public ResponseEntity<?> createAdminUser(@RequestBody SignupRequestDto signupRequest) {
    try {
        // Set role to ADMIN regardless of input
        // Rest of the registration logic
        // Remove this endpoint after creating admin users
    } catch (Exception e) {
        return ResponseEntity.badRequest().body("{\"error\": \"" + e.getMessage() + "\"}");
    }
}
```

## Verifying Admin User

To verify that an admin user exists, you can:

### Database Query:
```sql
SELECT * FROM users WHERE role = 'ADMIN';
```

### Application Logs:
Check the console output when starting the backend application. You should see:
```
Default admin user created with email: admin@eventmate.com and password: admin123
```

## Security Considerations

1. **Change Default Password**: Immediately after first login, change the default admin password
2. **Limit Admin Users**: Only create as many admin users as necessary
3. **Secure Credentials**: Store admin credentials securely
4. **Remove Temporary Endpoints**: If you create temporary endpoints for admin creation, remove them after use

## Troubleshooting

### Issue: Admin User Not Created
**Solution**: 
1. Check application logs for errors
2. Verify database connection
3. Ensure the `DataInitializer` class is being executed

### Issue: Cannot Login as Admin
**Solution**:
1. Verify the user exists in the database
2. Check that the password is correctly hashed
3. Ensure the role is set to 'ADMIN'

### Issue: Multiple Admin Users Created
**Solution**:
1. The application should prevent this, but if it happens, you can remove extra admin users:
   ```sql
   DELETE FROM users WHERE role = 'ADMIN' AND email != 'admin@eventmate.com';
   ```

## Best Practices

1. **Regular Audits**: Periodically review admin users
2. **Password Policies**: Implement strong password policies for admin accounts
3. **Two-Factor Authentication**: Consider implementing 2FA for admin accounts
4. **Activity Logging**: Log admin activities for security monitoring