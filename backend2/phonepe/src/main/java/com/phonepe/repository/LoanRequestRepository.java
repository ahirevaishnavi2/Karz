package com.phonepe.repository;
import com.phonepe.model.LoanRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LoanRequestRepository extends MongoRepository<LoanRequest, String> {
    List<LoanRequest> findByUserId(String userId);
}
