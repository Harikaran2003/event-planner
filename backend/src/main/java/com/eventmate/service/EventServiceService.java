package com.eventmate.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventmate.model.EventService;
import com.eventmate.repository.EventServiceRepository;

@Service
public class EventServiceService {

    @Autowired
    private EventServiceRepository eventServiceRepository;

    public List<EventService> getAllServices() {
        return eventServiceRepository.findAll();
    }

    public Optional<EventService> getServiceById(Long id) {
        return eventServiceRepository.findById(id);
    }

    public EventService saveService(EventService service) {
        return eventServiceRepository.save(service);
    }

    public void deleteService(Long id) {
        eventServiceRepository.deleteById(id);
    }
}