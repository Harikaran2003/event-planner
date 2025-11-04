package com.eventmate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eventmate.model.EventService;

@Repository
public interface EventServiceRepository extends JpaRepository<EventService, Long> {
}