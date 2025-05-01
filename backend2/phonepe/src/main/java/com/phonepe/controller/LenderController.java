package com.phonepe.controller;

import com.phonepe.model.Lender;
import com.phonepe.model.LoanRequest;
import com.phonepe.service.LoanService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lender")
public class LenderController {

    private final LoanService loanService;

    public LenderController(LoanService loanService) {
        this.loanService = loanService;
    }

    // Endpoint to update the lender profile (not relevant for matching logic, but added for completeness)
    @PostMapping("/profile")
    public String updateLenderProfile(@RequestBody Lender lender) {
        // Save lender profile logic here
        return "Lender profile updated: " + lender.getName();
    }

    // Endpoint to match the loan request with available lenders
    @PostMapping("/match")
    public List<Lender> matchLoanRequest(@RequestBody LoanRequest loanRequest) {
        // Match borrowers with lenders based on the request and list of available lenders
        List<Lender> matchedLenders = loanService.matchLendersWithBorrower(loanService.getLenders(), loanRequest);
        return matchedLenders;
    }
}
