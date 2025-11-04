package com.eventmate.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventmate.dto.LoginRequest;
import com.eventmate.dto.SignupRequest;
import com.eventmate.model.User;
import com.eventmate.service.UserService;
import com.eventmate.util.JwtUtil;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody SignupRequest signupRequest) {
        // Validate password confirmation
        if (!signupRequest.getPassword().equals(signupRequest.getConfirmPassword())) {
            return ResponseEntity.badRequest()
                .body("{\"message\": \"Passwords do not match\", \"success\": false}");
        }
        
        // Register user
        boolean isRegistered = userService.registerUser(signupRequest);
        
        if (isRegistered) {
            return ResponseEntity.ok()
                .body("{\"message\": \"User registered successfully\", \"success\": true}");
        } else {
            return ResponseEntity.badRequest()
                .body("{\"message\": \"Email already exists\", \"success\": false}");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest) {
        Optional<User> authenticatedUser = userService.authenticateUser(loginRequest);
        
        if (authenticatedUser.isPresent()) {
            User user = authenticatedUser.get();
            // Generate JWT token
            String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole().name());
            
            return ResponseEntity.ok()
                .body("{\"message\": \"Login successful\", \"success\": true, \"role\": \"" + 
                      user.getRole() + "\", \"userId\": " + user.getId() + 
                      ", \"email\": \"" + user.getEmail() + "\", \"token\": \"" + token + "\"}");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("{\"message\": \"Invalid credentials\", \"success\": false}");
        }
    }
}