package com.phonepe.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "scores")  // MongoDB collection name
public class Score {

    @Id
    private String userId;
    private double creditScore;
    private LocalDateTime analysisDate;

    // Default constructor (needed for deserialization)
    public Score() {
    }

    // Constructor with userId, creditScore, and analysisDate
    public Score(String userId, double creditScore, LocalDateTime analysisDate) {
        this.userId = userId;
        this.creditScore = creditScore;
        this.analysisDate = analysisDate;
    }

    // Constructor with only userId and creditScore
    public Score(String userId, double creditScore) {
        this.userId = userId;
        this.creditScore = creditScore;
        this.analysisDate = LocalDateTime.now();
    }

    // Getters and Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public double getCreditScore() {
        return creditScore;
    }

    public void setCreditScore(double creditScore) {
        this.creditScore = creditScore;
    }

    public LocalDateTime getAnalysisDate() {
        return analysisDate;
    }

    public void setAnalysisDate(LocalDateTime analysisDate) {
        this.analysisDate = analysisDate;
    }

    @Override
    public String toString() {
        return "Score{" +
                "userId='" + userId + '\'' +
                ", creditScore=" + creditScore +
                ", analysisDate=" + analysisDate +
                '}';
    }
}
