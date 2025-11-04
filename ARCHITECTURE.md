# EventMate Application Architecture

## System Architecture Diagram

```mermaid
graph TB
    A[Frontend - React] --> B[Backend API - Spring Boot]
    B --> C[MySQL Database]
    
    subgraph Frontend
        A
    end
    
    subgraph Backend
        B
    end
    
    subgraph Database
        C
    end
    
    D[User Browser] --> A
    B --> E[AI Services - Future]
```

## Component Overview

### 1. Frontend (React)
The frontend is responsible for:
- User interface rendering
- User interaction handling
- Form validation
- API communication with backend
- Role-based view rendering

**Key Components:**
- **LoginForm**: Handles user authentication
- **SignupForm**: Handles user registration
- **Dashboard Components**: Role-specific views (User, Planner, Admin)

### 2. Backend (Spring Boot)
The backend provides:
- RESTful API endpoints
- Business logic implementation
- Data persistence
- Authentication and authorization
- Database interaction

**Key Components:**
- **Controllers**: Handle HTTP requests
- **Services**: Implement business logic
- **Repositories**: Handle data access
- **Entities**: Represent database tables
- **DTOs**: Data Transfer Objects for API communication

### 3. Database (MySQL)
The database stores:
- User information and credentials
- Event data
- Vendor information
- Scheduling information
- Role-based access control data

## Data Flow

1. **User Registration Flow:**
   ```
   User Browser → SignupForm → UserController/signup → UserService → UserRepository → MySQL
   ```

2. **User Login Flow:**
   ```
   User Browser → LoginForm → UserController/login → UserService → UserRepository → MySQL
   ```

3. **Dashboard Access:**
   ```
   User Browser → Dashboard Component → (Role-based routing)
   ```

## Security Implementation

1. **Password Security:**
   - Passwords are hashed using BCrypt before storage
   - Secure comparison during authentication

2. **Role-Based Access:**
   - Three roles: USER, PLANNER, ADMIN
   - Default admin user created on first run
   - Only USER and PLANNER roles available during signup
   - Role verification happens at backend during login

3. **API Security:**
   - CORS configuration for frontend communication
   - Input validation using Bean Validation
   - Secure password handling

## Future Enhancements Architecture

```mermaid
graph TB
    A[Frontend - React] --> B[Backend API - Spring Boot]
    B --> C[MySQL Database]
    B --> D[AI Recommendation Engine]
    B --> E[Notification Service]
    B --> F[Payment Gateway Integration]
    
    subgraph Presentation
        A
    end
    
    subgraph Application
        B
    end
    
    subgraph Data
        C
    end
    
    subgraph Services
        D
        E
        F
    end
    
    G[User Browser] --> A
```

## Technology Stack

### Frontend Technologies:
- **React**: JavaScript library for building user interfaces
- **React Router**: Declarative routing for React applications
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **Lucide React**: Icon library

### Backend Technologies:
- **Spring Boot**: Framework for building Java applications
- **Spring Data JPA**: Data access abstraction
- **Spring Security**: Authentication and authorization
- **Hibernate**: ORM framework
- **MySQL Connector**: Database driver

### Database:
- **MySQL**: Relational database management system

## Deployment Architecture

```mermaid
graph TB
    A[Load Balancer] --> B[Frontend Server 1]
    A --> C[Frontend Server 2]
    A --> D[Frontend Server N]
    
    B --> E[Backend API Server 1]
    C --> E
    D --> E
    
    E --> F[Database Cluster]
    
    subgraph Web Servers
        B
        C
        D
    end
    
    subgraph API Servers
        E
    end
    
    subgraph Database Layer
        F
    end
    
    G[Users] --> A
```

This architecture supports horizontal scaling and high availability for production deployment.