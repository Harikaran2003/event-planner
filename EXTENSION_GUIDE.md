# Extension Guide for EventMate Application

## Overview
This guide explains how to extend the EventMate application with additional features and functionality.

## Adding New Features

### 1. Adding a New Entity

To add a new entity (e.g., Venue):

1. Create the model class in `backend/src/main/java/com/eventmate/model/Venue.java`:
```java
package com.eventmate.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "venues")
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(length = 1000)
    private String address;
    
    // Add other fields as needed
    
    // Constructors, getters, and setters
}
```

2. Create the repository interface in `backend/src/main/java/com/eventmate/repository/VenueRepository.java`:
```java
package com.eventmate.repository;

import com.eventmate.model.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VenueRepository extends JpaRepository<Venue, Long> {
}
```

3. Create the service class in `backend/src/main/java/com/eventmate/service/VenueService.java`:
```java
package com.eventmate.service;

import com.eventmate.model.Venue;
import com.eventmate.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class VenueService {
    @Autowired
    private VenueRepository venueRepository;
    
    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }
    
    public Optional<Venue> getVenueById(Long id) {
        return venueRepository.findById(id);
    }
    
    public Venue saveVenue(Venue venue) {
        return venueRepository.save(venue);
    }
    
    public void deleteVenue(Long id) {
        venueRepository.deleteById(id);
    }
}
```

4. Create the controller class in `backend/src/main/java/com/eventmate/controller/VenueController.java`:
```java
package com.eventmate.controller;

import com.eventmate.model.Venue;
import com.eventmate.service.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/venues")
public class VenueController {
    @Autowired
    private VenueService venueService;
    
    @GetMapping
    public List<Venue> getAllVenues() {
        return venueService.getAllVenues();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Venue> getVenueById(@PathVariable Long id) {
        Optional<Venue> venue = venueService.getVenueById(id);
        if (venue.isPresent()) {
            return ResponseEntity.ok(venue.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public Venue createVenue(@RequestBody Venue venue) {
        return venueService.saveVenue(venue);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Venue> updateVenue(@PathVariable Long id, @RequestBody Venue venueDetails) {
        // Implementation
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVenue(@PathVariable Long id) {
        venueService.deleteVenue(id);
        return ResponseEntity.noContent().build();
    }
}
```

5. Add the repository to the DataInitializer if needed for sample data.

6. Update the SecurityConfig to allow access to the new endpoints if needed.

### 2. Adding a New Field to an Existing Entity

To add a new field to an existing entity (e.g., adding capacity to Event):

1. Add the field to the model class in `backend/src/main/java/com/eventmate/model/Event.java`:
```java
@Column(name = "capacity")
private Integer capacity;
```

2. Add getter and setter methods:
```java
public Integer getCapacity() {
    return capacity;
}

public void setCapacity(Integer capacity) {
    this.capacity = capacity;
}
```

3. The database will be automatically updated by Hibernate due to `spring.jpa.hibernate.ddl-auto=update` setting.

### 3. Adding a New Role

To add a new role (e.g., PLANNER):

1. Update the Role enum in `backend/src/main/java/com/eventmate/model/User.java`:
```java
public enum Role {
    USER, ADMIN, PLANNER
}
```

2. Update the DataInitializer to create a sample planner user if needed.

3. Update the SecurityConfig to define access rules for the new role.

### 4. Adding Frontend Components

To add a new frontend component (e.g., VenueList):

1. Create the component file in `frontend/src/components/VenueList.jsx`:
```jsx
import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';

const VenueList = () => {
    const [venues, setVenues] = useState([]);
    
    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const data = await ApiService.getVenues();
                setVenues(data);
            } catch (error) {
                console.error('Error fetching venues:', error);
            }
        };
        
        fetchVenues();
    }, []);
    
    return (
        <div>
            <h2>Venues</h2>
            <ul>
                {venues.map(venue => (
                    <li key={venue.id}>{venue.name} - {venue.address}</li>
                ))}
            </ul>
        </div>
    );
};

export default VenueList;
```

2. Add the new service method to `frontend/src/services/api.js`:
```java
static async getVenues() {
    const response = await fetch(`${API_BASE_URL}/venues`);
    return response.json();
}
```

3. Import and use the component in the appropriate page.

## Advanced Features

### 1. Email Notifications

To implement email notifications:

1. Add the Spring Boot Mail dependency to `pom.xml`:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```

2. Configure email settings in `application.properties`:
```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

3. Create an EmailService:
```java
@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;
    
    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}
```

4. Use the EmailService in your notification logic.

### 2. File Uploads

To implement file uploads:

1. Add the necessary dependency to `pom.xml`:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

2. Configure file storage in `application.properties`:
```properties
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

3. Create a controller endpoint for file uploads:
```java
@PostMapping("/upload")
public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
    // Implementation
}
```

### 3. Pagination

To implement pagination for large datasets:

1. Update repository methods to support pagination:
```java
Page<Event> findAll(Pageable pageable);
```

2. Update controller to accept page and size parameters:
```java
@GetMapping
public Page<Event> getAllEvents(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size
) {
    Pageable pageable = PageRequest.of(page, size);
    return eventService.getAllEvents(pageable);
}
```

3. Update service to handle pagination:
```java
public Page<Event> getAllEvents(Pageable pageable) {
    return eventRepository.findAll(pageable);
}
```

## Performance Optimization

### 1. Database Indexes

Add indexes to frequently queried columns:
```java
@Table(name = "events", indexes = {
    @Index(name = "idx_event_date", columnList = "event_date"),
    @Index(name = "idx_event_package", columnList = "package_id")
})
```

### 2. Caching

Implement caching for frequently accessed data:
```java
@Service
@EnableCaching
public class EventService {
    @Cacheable("events")
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
}
```

### 3. Lazy Loading

Use lazy loading for related entities:
```java
@ManyToMany(fetch = FetchType.LAZY)
```

## Security Enhancements

### 1. JWT Authentication

Replace the current session-based authentication with JWT:
1. Add JWT dependencies
2. Create JWT utility classes
3. Update SecurityConfig to use JWT filters

### 2. OAuth2 Integration

Add social login options:
1. Add OAuth2 dependencies
2. Configure OAuth2 providers
3. Update authentication flow

## Testing

### 1. Unit Tests

Add unit tests for services:
```java
@Test
void testGetAllEvents() {
    // Implementation
}
```

### 2. Integration Tests

Add integration tests for controllers:
```java
@Test
void testGetEventsEndpoint() {
    // Implementation
}
```

### 3. End-to-End Tests

Add Cypress or Selenium tests for frontend functionality.

## Deployment

### 1. Dockerization

Create Dockerfiles for backend and frontend:
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/eventmate-backend-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

### 2. CI/CD Pipeline

Set up GitHub Actions or Jenkins pipeline for automated testing and deployment.

## Monitoring and Logging

### 1. Actuator Endpoints

Add Spring Boot Actuator for monitoring:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

### 2. Logging Configuration

Configure detailed logging in `application.properties`:
```properties
logging.level.com.eventmate=DEBUG
logging.file.name=application.log
```

## Conclusion

This extension guide provides a comprehensive overview of how to extend the EventMate application with new features and functionality. The modular architecture of the application makes it easy to add new entities, features, and enhancements while maintaining code quality and consistency.