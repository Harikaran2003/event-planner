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

import com.eventmate.model.EventService;
import com.eventmate.service.EventServiceService;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    @Autowired
    private EventServiceService eventServiceService;

    @GetMapping
    public List<EventService> getAllServices() {
        return eventServiceService.getAllServices();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventService> getServiceById(@PathVariable Long id) {
        Optional<EventService> service = eventServiceService.getServiceById(id);
        if (service.isPresent()) {
            return ResponseEntity.ok(service.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public EventService createService(@RequestBody EventService service) {
        return eventServiceService.saveService(service);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventService> updateService(@PathVariable Long id, @RequestBody EventService serviceDetails) {
        Optional<EventService> service = eventServiceService.getServiceById(id);
        if (service.isPresent()) {
            EventService updatedService = service.get();
            updatedService.setName(serviceDetails.getName());
            updatedService.setDescription(serviceDetails.getDescription());
            return ResponseEntity.ok(eventServiceService.saveService(updatedService));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        eventServiceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }
}