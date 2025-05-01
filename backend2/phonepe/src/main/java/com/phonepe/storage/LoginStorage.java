package com.phonepe.storage;

import java.util.HashMap;

public class LoginStorage {
    // In-memory storage for login credentials (temporary)
    private static HashMap<String, String> loginCredentials = new HashMap<>();
    public static HashMap<String, String> getLoginCredentials() {
        return loginCredentials;
    }
    
    // Store login credentials temporarily
    public static void addCredentials(String username, String password) {
        System.out.println("Storing login credentials for: " + username);
        loginCredentials.put(username, password);
    }

    // Retrieve stored password for a specific username
    public static String getPassword(String username) {
        return loginCredentials.get(username);
    }

    // Optionally, clear credentials (e.g., after user logs out)
    public static void clearCredentials(String username) {
        loginCredentials.remove(username);
    }

    // Clear all credentials (you can call this to reset when the app restarts or logs out)
    public static void clearAll() {
        loginCredentials.clear();
    }
}
