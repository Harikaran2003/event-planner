package com.eventmate.dto;

public class BookingRequest {
    private Long userId;
    private Long eventId;
    private String specialRequests;

    // Constructors
    public BookingRequest() {}

    public BookingRequest(Long userId, Long eventId, String specialRequests) {
        this.userId = userId;
        this.eventId = eventId;
        this.specialRequests = specialRequests;
    }

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public String getSpecialRequests() {
        return specialRequests;
    }

    public void setSpecialRequests(String specialRequests) {
        this.specialRequests = specialRequests;
    }
}