package com.phonepe.controller;

import com.phonepe.model.Accept;
import com.phonepe.model.AuthRequest;
import com.phonepe.repository.UserRepository;
import com.phonepe.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GooglePublicKeysManager;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.googleapis.util.Utils;
import java.util.Collections;
import java.util.Map;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth") // Matches frontend service
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("users/signup")
    public ResponseEntity<String> signup(@RequestBody Accept user) {
        Optional<Accept> existing = userRepository.findByUsername(user.getUsername());
        if (existing.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }

        userRepository.save(user); // Register user
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthRequest request) {
        Optional<Accept> user = userService.loginUser(request.getUsername(), request.getPassword());
        if (user.isPresent()) {
            return ResponseEntity.ok("Login successful!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }


@PostMapping("/google")
public ResponseEntity<String> googleSignup(@RequestBody Map<String, String> body) {
    String token = body.get("token");

    try {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                Utils.getDefaultTransport(), Utils.getDefaultJsonFactory())
                .setAudience(Collections.singletonList("928398342317-imh2rqn0jt5amm9k1vt6glur3550kkdg.apps.googleusercontent.com")) // <-- Replace this!
                .build();

        GoogleIdToken idToken = verifier.verify(token);

        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();

            Optional<Accept> existing = userRepository.findByUsername(email);
            if (existing.isEmpty()) {
                Accept newUser = new Accept();
                newUser.setUsername(email);
                newUser.setPassword(""); // Not used
                newUser.setName((String) payload.get("name"));
                userRepository.save(newUser);
            }

            return ResponseEntity.ok("Google signup/login successful!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Google auth failed");
    }
}
}
