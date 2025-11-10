package com.eventmate.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventmate.model.Enquiry;
import com.eventmate.model.User;
import com.eventmate.repository.EnquiryRepository;

@Service
public class EnquiryService {

    @Autowired
    private EnquiryRepository enquiryRepository;

    public List<Enquiry> getAllEnquiries() {
        return enquiryRepository.findAll();
    }

    public List<Enquiry> getEnquiriesByUser(User user) {
        return enquiryRepository.findByUser(user);
    }

    public Optional<Enquiry> getEnquiryById(Long id) {
        return enquiryRepository.findById(id);
    }

    public Enquiry saveEnquiry(Enquiry enquiry) {
        return enquiryRepository.save(enquiry);
    }

    public void deleteEnquiry(Long id) {
        enquiryRepository.deleteById(id);
    }

    public List<Enquiry> getEnquiriesByStatus(String status) {
        return enquiryRepository.findByStatus(status);
    }

    // Add this method for updating enquiry status
    public Enquiry updateEnquiryStatus(Long id, String status) {
        Optional<Enquiry> enquiryOptional = enquiryRepository.findById(id);
        if (enquiryOptional.isPresent()) {
            Enquiry enquiry = enquiryOptional.get();
            enquiry.setStatus(status);
            return enquiryRepository.save(enquiry);
        }
        return null;
    }
}