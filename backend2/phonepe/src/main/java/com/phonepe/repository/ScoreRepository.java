package com.phonepe.repository;

import com.phonepe.model.Score;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScoreRepository extends MongoRepository<Score, String> {
    Optional<Score> findByUserId(String userId);
}
