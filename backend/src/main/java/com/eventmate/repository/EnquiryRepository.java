package com.eventmate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eventmate.model.Enquiry;
import com.eventmate.model.User;

@Repository
public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {
    List<Enquiry> findByUser(User user);
    List<Enquiry> findByStatus(String status);
}