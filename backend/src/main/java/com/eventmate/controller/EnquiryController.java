package com.eventmate.controller;

import java.util.List;
import java.util.Map;
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

import com.eventmate.dto.EnquiryRequest;
import com.eventmate.model.Enquiry;
import com.eventmate.model.Notification;
import com.eventmate.model.User;
import com.eventmate.service.EnquiryService;
import com.eventmate.service.NotificationService;
import com.eventmate.service.UserService;

@RestController
@RequestMapping("/api/enquiries")
public class EnquiryController {

    @Autowired
    private EnquiryService enquiryService;

    @Autowired
    private UserService userService;

    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public List<Enquiry> getAllEnquiries() {
        return enquiryService.getAllEnquiries();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Enquiry> getEnquiryById(@PathVariable Long id) {
        Optional<Enquiry> enquiry = enquiryService.getEnquiryById(id);
        if (enquiry.isPresent()) {
            return ResponseEntity.ok(enquiry.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Enquiry> createEnquiry(@RequestBody EnquiryRequest enquiryRequest) {
        // Get user
        Optional<User> userOptional = userService.findById(enquiryRequest.getUserId());
        
        if (!userOptional.isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        
        User user = userOptional.get();
        
        // Create enquiry
        Enquiry enquiry = new Enquiry();
        enquiry.setUser(user);
        enquiry.setSubject(enquiryRequest.getSubject());
        enquiry.setMessage(enquiryRequest.getMessage());
        
        Enquiry savedEnquiry = enquiryService.saveEnquiry(enquiry);
        
        // Create notification for admin
        Notification notification = new Notification();
        notification.setTitle("New Enquiry");
        notification.setMessage("User " + user.getFullName() + " has submitted an enquiry: " + enquiryRequest.getSubject());
        notification.setRelatedBookingId(null); // No related booking for enquiries
        
        // Find admin user to assign notification to
        List<User> admins = userService.findByRole(User.Role.ADMIN);
        if (!admins.isEmpty()) {
            notification.setUser(admins.get(0)); // Assign to first admin found
        }
        
        notificationService.saveNotification(notification);
        
        return ResponseEntity.ok(savedEnquiry);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Enquiry> updateEnquiry(@PathVariable Long id, @RequestBody Enquiry enquiryDetails) {
        Optional<Enquiry> enquiry = enquiryService.getEnquiryById(id);
        if (enquiry.isPresent()) {
            Enquiry updatedEnquiry = enquiry.get();
            updatedEnquiry.setSubject(enquiryDetails.getSubject());
            updatedEnquiry.setMessage(enquiryDetails.getMessage());
            updatedEnquiry.setStatus(enquiryDetails.getStatus());
            return ResponseEntity.ok(enquiryService.saveEnquiry(updatedEnquiry));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEnquiry(@PathVariable Long id) {
        enquiryService.deleteEnquiry(id);
        return ResponseEntity.noContent().build();
    }

    // Add this endpoint for replying to enquiries
    @PostMapping("/{id}/reply")
    public ResponseEntity<Notification> replyToEnquiry(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        Optional<Enquiry> enquiryOptional = enquiryService.getEnquiryById(id);
        
        if (!enquiryOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        Enquiry enquiry = enquiryOptional.get();
        
        // Update enquiry status to IN_PROGRESS
        enquiry.setStatus("IN_PROGRESS");
        enquiryService.saveEnquiry(enquiry);
        
        // Create notification for the user
        Notification notification = new Notification();
        notification.setUser(enquiry.getUser());
        notification.setTitle("Response to your enquiry: " + enquiry.getSubject());
        notification.setMessage(payload.get("message"));
        notification.setRelatedBookingId(null); // No related booking for enquiries
        
        Notification savedNotification = notificationService.saveNotification(notification);
        
        return ResponseEntity.ok(savedNotification);
    }
}