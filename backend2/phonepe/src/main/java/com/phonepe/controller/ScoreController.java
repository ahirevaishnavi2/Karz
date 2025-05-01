package com.phonepe.controller;

import com.phonepe.model.Score;
import com.phonepe.service.ScoreService;

import java.util.Optional;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/scores")
public class ScoreController {

    private final ScoreService scoreService;

    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    @PostMapping("/update")
    public String updateScore(@RequestBody Score score) {
        scoreService.saveScore(score);
        return "Score updated successfully!";
    }

    @GetMapping("/{userId}")
    public Optional<Score> getUserScore(@PathVariable String userId) {
        return scoreService.getScoreByUserId(userId);
    }

    // New endpoint to handle file upload for score calculation
    @PostMapping("/upload")
    public Score uploadAndCalculateScore(@RequestParam("file") MultipartFile file, @RequestParam("userName") String userName) {
        return scoreService.uploadAndCalculateScore(file, userName);
    }
    

}
