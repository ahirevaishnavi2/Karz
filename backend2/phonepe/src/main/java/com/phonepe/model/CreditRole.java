package com.phonepe.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "credit_roles")
public class CreditRole {
    @Id
    private String id;

    private String userId;
    private String role; // "borrower" or "lender"
    private double amount;
    private double interestRate;
    private int durationMonths;
    private String status; // active/pending
    private Date createdAt;

    // Getters and Setters
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }   
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public double getAmount() {
        return amount;
    }
    public void setAmount(double amount) {
        this.amount = amount;
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
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public Date getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
    @Override
    public String toString() {
        return "CreditRole{" +
                "id='" + id + '\'' +
                ", userId='" + userId + '\'' +
                ", role='" + role + '\'' +
                ", amount=" + amount +
                ", interestRate=" + interestRate +
                ", durationMonths=" + durationMonths +
                ", status='" + status + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
