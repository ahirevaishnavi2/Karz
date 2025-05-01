package com.phonepe.service;

import com.phonepe.model.Score;
import com.phonepe.model.Upload;
import com.phonepe.repository.ScoreRepository;
import com.phonepe.repository.UploadRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UploadService {
    private final UploadRepository uploadRepository;
    private final ScoreRepository scoreRepository;
    private final CreditScoreService creditScoreService;

    public UploadService(UploadRepository uploadRepository,
                         ScoreRepository scoreRepository,
                         CreditScoreService creditScoreService) {
        this.uploadRepository = uploadRepository;
        this.scoreRepository = scoreRepository;
        this.creditScoreService = creditScoreService;
    }

    public Upload saveUpload(Upload upload) {
        Upload saved = uploadRepository.save(upload);
    
        // Get all uploads by this user
        List<Upload> uploads = uploadRepository.findByUserId(upload.getUserId());
    
        // Get existing score or default
        Score existing = scoreRepository.findByUserId(upload.getUserId())
                .orElse(new Score(upload.getUserId(), 500, LocalDateTime.now()));  // Use the default constructor if no score is found
    
                int newScore = creditScoreService.calculateScore(uploads, (int) existing.getCreditScore());

        // Update existing score with the new calculated score and set the analysis date
        existing.setCreditScore(newScore);
        existing.setAnalysisDate(LocalDateTime.now());  // Set analysis date to current time
    
        scoreRepository.save(existing);  // Save the updated score
    
        return saved;
    }
    

    public List<Upload> getUploadsByUser(String userId) {
        return uploadRepository.findByUserId(userId);
    }
}
