package com.phonepe.dto;

import lombok.Data;

@Data
public class LenderRequestDTO {
    private String userId;
    private double maxInterestRate;
    private int maxDurationMonths;
    private double amountAvailable;
}
