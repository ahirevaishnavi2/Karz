package com.phonepe.repository;

import com.phonepe.model.Accept;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<Accept, String> {
    Optional<Accept> findByUsername(String username);
}
