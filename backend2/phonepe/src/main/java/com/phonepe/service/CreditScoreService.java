package com.phonepe.service;

import com.phonepe.model.Upload;
import com.phonepe.model.Score;
import org.springframework.stereotype.Service;

import java.util.*;
import java.time.*;
import java.time.temporal.ChronoUnit;

@Service
public class CreditScoreService {

    public int calculateScore(List<Upload> uploads, int previousScore) {
        int score = previousScore;

        // Sort uploads by date
        uploads.sort(Comparator.comparing(Upload::getUploadedAt));

        // Factor 1: Regularity of uploads
        if (uploads.size() >= 2) {
            long totalGapDays = 0;
            for (int i = 1; i < uploads.size(); i++) {
                LocalDate d1 = uploads.get(i - 1).getUploadedAt().toLocalDate();
                LocalDate d2 = uploads.get(i).getUploadedAt().toLocalDate();
                totalGapDays += ChronoUnit.DAYS.between(d1, d2);
            }
            long avgGap = totalGapDays / (uploads.size() - 1);
            if (avgGap <= 30) score += 20;
            else if (avgGap <= 60) score += 10;
            else score -= 10;
        }

        // Factor 2: Extracted data from file (fake logic here, replace with real one)
        for (Upload u : uploads) {
            if (u.getParsedData() != null) {
                double balance = u.getParsedData().getMonthlyAvgBalance();
                double credits = u.getParsedData().getTotalCredits();

                if (balance > 20000) score += 10;
                if (credits > 100000) score += 15;
            }
        }

        // Clamp score
        return Math.max(300, Math.min(850, score));
    }
}
