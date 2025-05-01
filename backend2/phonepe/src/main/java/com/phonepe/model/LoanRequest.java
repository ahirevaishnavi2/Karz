package com.phonepe.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "loan_requests")
public class LoanRequest {
    @Id
    private String id;
    private String userId; // Borrower
    private double amount;
    private int durationMonths;
    private double interestRate;
    private String status; // pending / approved / rejected / matched
    private Date createdAt;

    // Getters & Setters
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
    public double getAmount() {
        return amount;
    }
    public void setAmount(double amount) {
        this.amount = amount;
    }
    public int getDurationMonths() {
        return durationMonths;
    }
    public void setDurationMonths(int durationMonths) {
        this.durationMonths = durationMonths;
    }
    public double getInterestRate() {
        return interestRate;
    }
    public void setInterestRate(double interestRate) {
        this.interestRate = interestRate;
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
        return "LoanRequest{" +
                "id='" + id + '\'' +
                ", userId='" + userId + '\'' +
                ", amount=" + amount +
                ", durationMonths=" + durationMonths +
                ", interestRate=" + interestRate +
                ", status='" + status + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
