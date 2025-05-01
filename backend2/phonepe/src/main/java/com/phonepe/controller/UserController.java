package com.phonepe.controller;
import com.phonepe.model.Accept; 
import com.phonepe.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Signup (User registration)
    @PostMapping("/register")
    public String registerUser(@RequestBody Accept user) {
        try {
            userService.registerUser(user);
            return "User registered successfully!";
        } catch (RuntimeException e) {
            return "Error during registration: " + e.getMessage();
        }
    }

    // Login
    @PostMapping("/login")
    public String loginUser(@RequestBody Accept user) {
        Optional<Accept> existingUser = userService.loginUser(user.getUsername(), user.getPassword());
        
        if (existingUser.isPresent()) {
            return "Login successful!";
        } else {
            return "Invalid username or password";
        }
    }

    // Get a user by userId
    @GetMapping("/{userId}")
    public Accept getUser(@PathVariable String userId) {
        return userService.getUser(userId);
    }

    // Get all users
    @GetMapping("/all")
    public List<Accept> getAllUsers() {
        return userService.getAllUsers();
    }

    // Delete a user by userId
    @DeleteMapping("/{userId}")
    public String deleteUser(@PathVariable String userId) {
        boolean isDeleted = userService.deleteUser(userId);

        if (isDeleted) {
            return "User deleted successfully!";
        } else {
            return "User not found!";
        }
    }

    // Update Profile Details (called after login for completing profile)
@PutMapping("/complete-profile")
public String completeProfile(@RequestParam String username, @RequestBody Accept updatedData) {
    try {
        boolean updated = userService.completeProfile(username, updatedData);
        if (updated) {
            return "Profile updated and saved successfully!";
        } else {
            return "User not found!";
        }
    } catch (Exception e) {
        return "Error while updating profile: " + e.getMessage();
    }
}

}
