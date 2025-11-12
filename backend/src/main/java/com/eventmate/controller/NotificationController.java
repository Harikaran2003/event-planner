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

import com.eventmate.model.Notification;
import com.eventmate.model.User;
import com.eventmate.service.NotificationService;
import com.eventmate.service.UserService;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;
    
    @Autowired
    private UserService userService;

    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @GetMapping("/unread/{userId}")
    public List<Notification> getUnreadNotificationsByUserId(@PathVariable Long userId) {
        // Fetch the user by ID
        // Return unread notifications for the user
        Optional<User> userOptional = userService.findById(userId);
        if (userOptional.isPresent()) {
            return notificationService.getUnreadNotificationsByUser(userOptional.get());
        }
        return List.of(); // Return empty list if user not found
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notification> getNotificationById(@PathVariable Long id) {
        Optional<Notification> notification = notificationService.getNotificationById(id);
        if (notification.isPresent()) {
            return ResponseEntity.ok(notification.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) {
        return notificationService.saveNotification(notification);
    }

    @PutMapping("/{id}/mark-as-read")
    public ResponseEntity<Notification> markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
        Optional<Notification> notification = notificationService.getNotificationById(id);
        if (notification.isPresent()) {
            return ResponseEntity.ok(notification.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.noContent().build();
    }
}