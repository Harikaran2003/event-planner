package com.eventmate.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import com.eventmate.model.Event;
import com.eventmate.model.Feedback;
import com.eventmate.model.User;
import com.eventmate.service.EventService;
import com.eventmate.service.FeedbackService;
import com.eventmate.service.UserService;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private UserService userService;
    
    @Autowired
    private EventService eventService;

    @GetMapping
    public List<Feedback> getAllFeedback() {
        return feedbackService.getAllFeedback();
    }

    @GetMapping("/user/{userId}")
    public List<Feedback> getFeedbackByUserId(@PathVariable Long userId) {
        Optional<User> userOptional = userService.findById(userId);
        if (userOptional.isPresent()) {
            return feedbackService.getFeedbackByUser(userOptional.get());
        }
        return List.of(); // Return empty list if user not found
    }

    @GetMapping("/{id}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long id) {
        Optional<Feedback> feedback = feedbackService.getFeedbackById(id);
        if (feedback.isPresent()) {
            return ResponseEntity.ok(feedback.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Feedback> createFeedback(@RequestBody Map<String, Object> payload) {
        try {
            // Extract data from payload
            Long userId = Long.valueOf(payload.get("userId").toString());
            Long eventId = Long.valueOf(payload.get("eventId").toString());
            Integer rating = Integer.valueOf(payload.get("rating").toString());
            String comment = (String) payload.get("comment");
            
            // Find user and event
            Optional<User> userOptional = userService.findById(userId);
            Optional<Event> eventOptional = eventService.getEventById(eventId);
            
            if (!userOptional.isPresent() || !eventOptional.isPresent()) {
                return ResponseEntity.badRequest().build();
            }
            
            // Create feedback object
            Feedback feedback = new Feedback();
            feedback.setUser(userOptional.get());
            feedback.setEvent(eventOptional.get());
            feedback.setRating(rating);
            feedback.setComment(comment);
            feedback.setCreatedAt(java.time.LocalDateTime.now());
            
            Feedback savedFeedback = feedbackService.saveFeedback(feedback);
            return ResponseEntity.ok(savedFeedback);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedback(id);
        return ResponseEntity.noContent().build();
    }
}