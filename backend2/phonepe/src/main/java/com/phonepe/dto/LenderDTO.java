package com.phonepe.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
// @AllArgsConstructor
public class LenderDTO {
    private String userId;
    private String name;
    private String location;
    private double interestRate;
    private int durationMonths;
    private double availableAmount;

    // Constructor + Getters and Setters

    public LenderDTO(String userId, String name, String location, double interestRate, int durationMonths, double availableAmount) {
        this.userId = userId;
        this.name = name;
        this.location = location;
        this.interestRate = interestRate;
        this.durationMonths = durationMonths;
        this.availableAmount = availableAmount;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public double getInterestRate() {
        return interestRate;
    }
    public void setInterestRate(double interestRate) {
        this.interestRate = interestRate;
    }
    public int getDurationMonths() {
        return durationMonths;
    }
    public void setDurationMonths(int durationMonths) {
        this.durationMonths = durationMonths;
    }
    public double getAvailableAmount() {
        return availableAmount;
    }
    public void setAvailableAmount(double availableAmount) {
        this.availableAmount = availableAmount;
    }
    @Override
    public String toString() {
        return "LenderDTO{" +
                "userId='" + userId + '\'' +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", interestRate=" + interestRate +
                ", durationMonths=" + durationMonths +
                ", availableAmount=" + availableAmount +
                '}';
    }
}
