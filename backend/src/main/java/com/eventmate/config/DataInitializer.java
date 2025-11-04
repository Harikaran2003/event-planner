package com.eventmate.config;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.eventmate.model.Event;
import com.eventmate.model.EventService;
import com.eventmate.model.Package;
import com.eventmate.model.User;
import com.eventmate.repository.EventRepository;
import com.eventmate.repository.EventServiceRepository;
import com.eventmate.repository.PackageRepository;
import com.eventmate.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PackageRepository packageRepository;

    @Autowired
    private EventServiceRepository eventServiceRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Check if admin user exists, if not create one
        if (userRepository.findByEmail("admin@example.com").isEmpty()) {
            User admin = new User();
            admin.setFullName("Admin User");
            admin.setEmail("admin@example.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(User.Role.ADMIN);
            
            userRepository.save(admin);
            System.out.println("Admin user created with email: admin@example.com and password: admin123");
        }

        // Check if regular user exists, if not create one
        if (userRepository.findByEmail("user@example.com").isEmpty()) {
            User user = new User();
            user.setFullName("Regular User");
            user.setEmail("user@example.com");
            user.setPassword(passwordEncoder.encode("password"));
            user.setRole(User.Role.USER);
            
            userRepository.save(user);
            System.out.println("Regular user created with email: user@example.com and password: password");
        }

        // Create sample packages if none exist
        if (packageRepository.findAll().isEmpty()) {
            List<Package> packages = Arrays.asList(
                new Package("Basic", "Essential event planning services", new BigDecimal("1500.00")),
                new Package("Premium", "Comprehensive event planning with premium services", new BigDecimal("5000.00")),
                new Package("Deluxe", "All-inclusive luxury event planning", new BigDecimal("8000.00"))
            );
            
            packageRepository.saveAll(packages);
            System.out.println("Sample packages created");
        }

        // Create sample services if none exist
        if (eventServiceRepository.findAll().isEmpty()) {
            List<EventService> services = Arrays.asList(
                new EventService("Catering", "Professional catering services"),
                new EventService("Audio Visual", "Sound and lighting equipment"),
                new EventService("Decorations", "Floral arrangements and decorations"),
                new EventService("Entertainment", "DJ, band, or other entertainment")
            );
            
            eventServiceRepository.saveAll(services);
            System.out.println("Sample services created");
        }

        // Create sample events if none exist
        if (eventRepository.findAll().isEmpty()) {
            List<Package> packages = packageRepository.findAll();
            List<EventService> services = eventServiceRepository.findAll();
            
            if (!packages.isEmpty() && !services.isEmpty()) {
                Event event1 = new Event("Corporate Conference", "Annual corporate conference with keynote speakers and networking opportunities", LocalDateTime.now().plusDays(30));
                event1.setEventPackage(packages.get(1)); // Premium package
                event1.setServices(Arrays.asList(services.get(0), services.get(1))); // Catering and Audio Visual
                
                Event event2 = new Event("Wedding Reception", "Elegant wedding reception with full service", LocalDateTime.now().plusDays(60));
                event2.setEventPackage(packages.get(2)); // Deluxe package
                event2.setServices(Arrays.asList(services.get(0), services.get(2))); // Catering and Decorations
                
                Event event3 = new Event("Birthday Party", "Fun birthday celebration for all ages", LocalDateTime.now().plusDays(15));
                event3.setEventPackage(packages.get(0)); // Basic package
                event3.setServices(Arrays.asList(services.get(3))); // Entertainment
                
                eventRepository.saveAll(Arrays.asList(event1, event2, event3));
                System.out.println("Sample events created");
            }
        }
    }
}