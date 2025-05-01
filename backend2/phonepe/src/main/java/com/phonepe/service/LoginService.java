package com.phonepe.service;

import com.phonepe.storage.LoginStorage;
import com.phonepe.model.Accept;
import com.phonepe.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    private final UserRepository userRepository;

    public LoginService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<Accept> login(String username, String password) {
        Optional<Accept> user = userRepository.findByUsername(username);
        
        // Validate the password
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            // Store login credentials temporarily
            LoginStorage.addCredentials(username, password);
            return user;
        } else {
            return Optional.empty();
        }
    }
}
