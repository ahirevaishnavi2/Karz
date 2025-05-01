package com.phonepe.dto;

public class LoanDecisionDTO {
    private String userId;
    private String status;
    private String decisionMessage;

    // Constructor
    public LoanDecisionDTO(String userId, String status, String decisionMessage) {
        this.userId = userId;
        this.status = status;
        this.decisionMessage = decisionMessage;
    }

    // Getters and setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDecisionMessage() {
        return decisionMessage;
    }

    public void setDecisionMessage(String decisionMessage) {
        this.decisionMessage = decisionMessage;
    }
}
