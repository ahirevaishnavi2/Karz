package com.phonepe.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

@Service
public class CreditScoreCalculator {

    public double calculateFromCsv(MultipartFile file) {
        int transactionCount = 0;
        double totalSpent = 0;

        try (BufferedReader br = new BufferedReader(new FileReader(file.getOriginalFilename()))) {
            String line;
            br.readLine(); // Skip the header line
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                try {
                    double amount = Double.parseDouble(data[2]); // Assuming amount is in column 3
                    totalSpent += amount;
                    transactionCount++;
                } catch (NumberFormatException e) {
                    System.out.println("Skipping invalid row: " + line);
                }
            }
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
            return -1; // Error code
        }

        // Simple credit score calculation based on transaction count and amount spent
        return 600 + (transactionCount * 0.5) + (totalSpent / 10000);
    }
}
