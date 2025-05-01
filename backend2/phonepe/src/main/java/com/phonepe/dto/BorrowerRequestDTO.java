package com.phonepe.dto;

import lombok.Data;

@Data
public class BorrowerRequestDTO {
    private String userId;
    private String city;
    private double requestedAmount;
    private int requestedDuration;
    private double maxInterestRate;

    // Constructor + Getters and Setters

    public BorrowerRequestDTO(String userId, String city, double requestedAmount, int requestedDuration, double maxInterestRate) {
        this.userId = userId;
        this.city = city;
        this.requestedAmount = requestedAmount;
        this.requestedDuration = requestedDuration;
        this.maxInterestRate = maxInterestRate;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public double getRequestedAmount() {
        return requestedAmount;
    }
    public void setRequestedAmount(double requestedAmount) {
        this.requestedAmount = requestedAmount;
    }
    public int getRequestedDuration() {
        return requestedDuration;
    }
    public void setRequestedDuration(int requestedDuration) {
        this.requestedDuration = requestedDuration;
    }
    public double getMaxInterestRate() {
        return maxInterestRate;
    }
    public void setMaxInterestRate(double maxInterestRate) {
        this.maxInterestRate = maxInterestRate;
    }
    @Override
    public String toString() {
        return "BorrowerRequestDTO{" +
                "userId='" + userId + '\'' +
                ", city='" + city + '\'' +
                ", requestedAmount=" + requestedAmount +
                ", requestedDuration=" + requestedDuration +
                ", maxInterestRate=" + maxInterestRate +
                '}';
    }
}
