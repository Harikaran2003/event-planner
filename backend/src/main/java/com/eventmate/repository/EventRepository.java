package com.eventmate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eventmate.model.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
}