package com.phonepe.service;

import com.phonepe.model.Lender;
import com.phonepe.model.LoanRequest;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoanService {

    // Sample list of lenders for demonstration (this could be fetched from a database or repository)
    private List<Lender> lenders = List.of(
            new Lender(101, "Lender1", "Pune", 10.5, 12, 10000),
            new Lender(102, "Lender2", "Mumbai", 12.0, 24, 20000),
            new Lender(103, "Lender3", "Pune", 9.0, 6, 50000),
            new Lender(104, "Lender4", "Delhi", 11.0, 12, 5000),
            new Lender(105, "Lender5", "Pune", 10.0, 18, 7500)
    );

    // Method to get all lenders (this can be used for getting lenders from DB)
    public List<Lender> getLenders() {
        return lenders;
    }

    // Updated method: Accepts both List<Lender> and LoanRequest
    public List<Lender> matchLendersWithBorrower(List<Lender> lenders, LoanRequest loanRequest) {
        return lenders.stream()
                .filter(lender -> lender.getRoi() <= loanRequest.getInterestRate())  // Match on ROI
                .filter(lender -> lender.getMaxDuration() >= loanRequest.getDurationMonths())  // Match on duration
                .filter(lender -> lender.getLocation().equalsIgnoreCase(loanRequest.getUserId()))  // Match on location
                .collect(Collectors.toList());  // Collect the matched lenders into a list
    }
}
