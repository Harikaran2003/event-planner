package com.eventmate.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventmate.dto.BookingRequest;
import com.eventmate.model.Booking;
import com.eventmate.model.Event;
import com.eventmate.model.Notification;
import com.eventmate.model.User;
import com.eventmate.service.BookingService;
import com.eventmate.service.EventService;
import com.eventmate.service.NotificationService;
import com.eventmate.service.UserService;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserService userService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private EventService eventService;

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUserId(@PathVariable Long userId) {
        Optional<User> user = userService.findById(userId);
        if (user.isPresent()) {
            return bookingService.getBookingsByUser(user.get());
        }
        return List.of(); // Return empty list if user not found
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        Optional<Booking> booking = bookingService.getBookingById(id);
        if (booking.isPresent()) {
            return ResponseEntity.ok(booking.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody BookingRequest bookingRequest) {
        // Get user and event
        Optional<User> userOptional = userService.findById(bookingRequest.getUserId());
        Optional<Event> eventOptional = eventService.getEventById(bookingRequest.getEventId());
        
        if (!userOptional.isPresent() || !eventOptional.isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        
        User user = userOptional.get();
        Event event = eventOptional.get();
        
        // Create booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setEvent(event);
        booking.setSpecialRequests(bookingRequest.getSpecialRequests());
        
        // Save the booking
        Booking savedBooking = bookingService.saveBooking(booking);
        
        // Create notification for admin
        Notification notification = new Notification();
        notification.setTitle("New Booking Request");
        notification.setMessage("User " + user.getFullName() + " has requested to book the event: " + event.getName());
        notification.setRelatedBookingId(savedBooking.getId());
        
        // Find admin user to assign notification to
        List<User> admins = userService.findByRole(User.Role.ADMIN);
        if (!admins.isEmpty()) {
            notification.setUser(admins.get(0)); // Assign to first admin found
        }
        
        notificationService.saveNotification(notification);
        
        return ResponseEntity.ok(savedBooking);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody Booking bookingDetails) {
        Optional<Booking> booking = bookingService.getBookingById(id);
        if (booking.isPresent()) {
            Booking updatedBooking = booking.get();
            String oldStatus = updatedBooking.getStatus();
            updatedBooking.setStatus(bookingDetails.getStatus());
            updatedBooking.setSpecialRequests(bookingDetails.getSpecialRequests());
            
            // Save the updated booking
            Booking savedBooking = bookingService.saveBooking(updatedBooking);
            
            // If status changed to CONFIRMED or CANCELLED, notify the user
            if (!oldStatus.equals(bookingDetails.getStatus()) && 
                ("CONFIRMED".equals(bookingDetails.getStatus()) || "CANCELLED".equals(bookingDetails.getStatus()))) {
                
                // Create notification for the user
                Notification userNotification = new Notification();
                userNotification.setUser(updatedBooking.getUser());
                userNotification.setTitle("Booking " + bookingDetails.getStatus());
                userNotification.setMessage("Your booking for " + updatedBooking.getEvent().getName() + " has been " + 
                    bookingDetails.getStatus().toLowerCase() + ".");
                userNotification.setRelatedBookingId(savedBooking.getId());
                notificationService.saveNotification(userNotification);
            }
            
            return ResponseEntity.ok(savedBooking);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
}