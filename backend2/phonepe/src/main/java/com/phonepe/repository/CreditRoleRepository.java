package com.phonepe.repository;

import com.phonepe.model.CreditRole;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CreditRoleRepository extends MongoRepository<CreditRole, String> {
    List<CreditRole> findByRoleAndStatus(String role, String status);
}
