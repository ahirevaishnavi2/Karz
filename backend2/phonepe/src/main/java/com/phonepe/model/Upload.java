package com.phonepe.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "uploads")
public class Upload {
    @Id
    private String id;
    private String userId;
    private String fileName;
    private String fileType;
    private String storagePath;
    private LocalDateTime uploadedAt;
    private String status; // uploaded | parsed | error

    private ParsedData parsedData;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ParsedData {
        private double totalCredits;
        private double totalDebits;
        private double monthlyAvgBalance;
    }
}
