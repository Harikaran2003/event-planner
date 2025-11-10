package com.eventmate.dto;

public class NotificationRequest {
    private Long userId;
    private String title;
    private String message;
    private Long relatedBookingId;

    // Constructors
    public NotificationRequest() {}

    public NotificationRequest(Long userId, String title, String message, Long relatedBookingId) {
        this.userId = userId;
        this.title = title;
        this.message = message;
        this.relatedBookingId = relatedBookingId;
    }

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getRelatedBookingId() {
        return relatedBookingId;
    }

    public void setRelatedBookingId(Long relatedBookingId) {
        this.relatedBookingId = relatedBookingId;
    }
}