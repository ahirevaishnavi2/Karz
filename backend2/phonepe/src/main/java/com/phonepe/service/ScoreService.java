package com.phonepe.service;

import com.phonepe.model.Score;
import com.phonepe.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ScoreService {

    private final ScoreRepository scoreRepository;

    // @Autowired
    public ScoreService(ScoreRepository scoreRepository) {
        this.scoreRepository = scoreRepository;
    }

    public Score saveScore(Score score) {
        return scoreRepository.save(score);
    }

    public Optional<Score> getScoreByUserId(String userId) {
        return scoreRepository.findByUserId(userId);
    }

    public Score uploadAndCalculateScore(MultipartFile file, String userId) {
        int transactionCount = 0;
        double totalSpent = 0;
    
        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            br.readLine(); // Skip header
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                if (data.length >= 3) {
                    try {
                        double amount = Double.parseDouble(data[2]); // Assuming 3rd column is amount
                        totalSpent += amount;
                        transactionCount++;
                    } catch (NumberFormatException e) {
                        System.out.println("Skipping invalid amount: " + line);
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("File processing error: " + e.getMessage());
            throw new RuntimeException("Failed to process bank statement.");
        }
    
        double calculatedScore = 600 + (transactionCount * 0.5) + (totalSpent / 10000);
    
        Score score = new Score(userId, calculatedScore, LocalDateTime.now());
        return saveScore(score); // 👈 Return the saved Score object
    }
    
}
