package com.phonepe.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoanRequestDTO {
    private String borrowerName;
    private String borrowerLocation;
    private double amount;
    private int duration;
    private double creditScore;
    private double rating;

}
