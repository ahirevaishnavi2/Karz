package com.phonepe.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.phonepe.model.Accept;
import com.phonepe.repository.UserRepository;
import com.phonepe.storage.UserStorage;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void registerUser(Accept user) {
        userRepository.save(user);
    }

    public Accept getUser(String userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public List<Accept> getAllUsers() {
        return userRepository.findAll();
    }

    // New method to delete a user by userId
    public boolean deleteUser(String userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return true; // User was successfully deleted
        }
        return false; // User not found
    }

    public Optional<Accept> loginUser(String username, String password) {
        Optional<Accept> user = userRepository.findByUsername(username);
    
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user;
        }
        return Optional.empty();
    }

    public boolean completeProfile(String username, Accept updatedData) {
    Optional<Accept> optionalUser = userRepository.findByUsername(username);

    if (optionalUser.isPresent()) {
        Accept existingUser = optionalUser.get();

        // Update fields
        existingUser.setName(updatedData.getName());
        existingUser.setDob(updatedData.getDob());
        existingUser.setMobileNo(updatedData.getMobileNo());
        existingUser.setProfession(updatedData.getProfession());
        existingUser.setCity(updatedData.getCity());
        existingUser.setArea(updatedData.getArea());

        // Update in DS
        UserStorage.addUser(existingUser);

        // Update in MongoDB
        userRepository.save(existingUser);

        return true;
    }
    return false;
}

    
}
