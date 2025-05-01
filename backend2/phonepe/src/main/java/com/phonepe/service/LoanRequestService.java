package com.phonepe.service;

import com.phonepe.dto.BorrowerRequestDTO;
import com.phonepe.model.LoanRequest;
import com.phonepe.repository.LoanRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class LoanRequestService {

    @Autowired
    private LoanRequestRepository loanRequestRepository;

    public LoanRequest saveLoanRequest(BorrowerRequestDTO borrower) {
        LoanRequest request = new LoanRequest();
        request.setUserId(borrower.getUserId());
        request.setAmount(borrower.getRequestedAmount());
        request.setDurationMonths(borrower.getRequestedDuration());
        request.setInterestRate(borrower.getMaxInterestRate());
        request.setStatus("pending");
        request.setCreatedAt(new Date());

        return loanRequestRepository.save(request);
    }
}
