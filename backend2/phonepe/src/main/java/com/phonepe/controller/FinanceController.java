package com.phonepe.controller;

import com.phonepe.dto.*;
import com.phonepe.service.FinanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/finance")
public class FinanceController {

    @Autowired
    private FinanceService financeService;

    // Upload CSV and calculate credit score
    @PostMapping("/upload-bank-statement")
    public double uploadBankStatement(@RequestParam("file") MultipartFile file) {
        return financeService.processBankStatement(file);
    }

    // Borrower matches lenders
    @PostMapping("/borrower/request")
    public List<LenderDTO> getMatchingLenders(@RequestBody BorrowerRequestDTO borrowerRequest) {
        return financeService.findMatchingLenders(borrowerRequest);
    }

    // Lender reviews loan requests
    @PostMapping("/lender/review")
    public List<LoanDecisionDTO> reviewLoanRequests(@RequestBody LenderRequestDTO lenderRequest) {
        return financeService.reviewBorrowerRequests(lenderRequest);
    }
}
