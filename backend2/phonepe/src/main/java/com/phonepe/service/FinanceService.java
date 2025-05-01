package com.phonepe.service;

import com.phonepe.dto.*;
import com.phonepe.model.CreditRole;
import com.phonepe.repository.CreditRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class FinanceService {

    @Autowired
    private CreditRoleRepository creditRoleRepository;

    // Match lenders based on borrower request
    public List<LenderDTO> findMatchingLenders(BorrowerRequestDTO borrower) {
        List<CreditRole> activeLenders = creditRoleRepository.findByRoleAndStatus("lender", "active");

        List<LenderDTO> lenders = activeLenders.stream()
                .map(role -> new LenderDTO(
                        role.getUserId(),
                        "Lender-" + role.getUserId(),
                        "NA", // City or region if available
                        role.getInterestRate(),
                        role.getDurationMonths(),
                        role.getAmount()
                ))
                .collect(Collectors.toList());

        List<LenderDTO> matchingLenders = new ArrayList<>();

        for (LenderDTO lender : lenders) {
            if (lender.getInterestRate() <= borrower.getMaxInterestRate() &&
                lender.getDurationMonths() >= borrower.getRequestedDuration() &&
                lender.getAvailableAmount() >= borrower.getRequestedAmount()) {
                matchingLenders.add(lender);
            }
        }

        return matchingLenders;
    }

    // Review borrowers and decide on loans based on lender preferences
    public List<LoanDecisionDTO> reviewBorrowerRequests(LenderRequestDTO lenderRequest) {
        List<CreditRole> borrowerRoles = creditRoleRepository.findByRoleAndStatus("borrower", "pending");

        List<LoanDecisionDTO> decisions = new ArrayList<>();

        for (CreditRole borrower : borrowerRoles) {
            // Ensure that the borrower role has all necessary properties
            double borrowerAmount = borrower.getAmount();
            double borrowerInterestRate = borrower.getInterestRate();
            int borrowerDurationMonths = borrower.getDurationMonths();
        
            // Ensure that the lender request is also using correct types
            double lenderAmountAvailable = lenderRequest.getAmountAvailable();
            double lenderMaxInterestRate = lenderRequest.getMaxInterestRate();
            int lenderMaxDurationMonths = lenderRequest.getMaxDurationMonths();
        
            // Check if the conditions for a match are satisfied
            boolean match = lenderMaxInterestRate >= borrowerInterestRate
                    && lenderMaxDurationMonths >= borrowerDurationMonths
                    && lenderAmountAvailable >= borrowerAmount;
        
            // Add the result to the decisions list
            decisions.add(new LoanDecisionDTO(
                    borrower.getUserId(),
                    match ? "approved" : "rejected",
                    match ? "Matched with lender" : "Did not meet lender criteria"
            ));
        }
        
        return decisions;
    }

    // Upload bank statement and calculate dummy credit score
    public double processBankStatement(MultipartFile file) {
        double totalSpent = 0;
        int transactionCount = 0;

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            reader.readLine(); // Skip header
            String line;
            while ((line = reader.readLine()) != null) {
                String[] cols = line.split(",");
                try {
                    double amount = Double.parseDouble(cols[2]); // assuming 3rd column is amount
                    totalSpent += amount;
                    transactionCount++;
                } catch (Exception e) {
                    System.out.println("Skipping row: " + line);
                }
            }
        } catch (Exception e) {
            System.out.println("Error processing file: " + e.getMessage());
            return 0;
        }

        return 600 + (transactionCount * 0.5) + (totalSpent / 10000);
    }
}
