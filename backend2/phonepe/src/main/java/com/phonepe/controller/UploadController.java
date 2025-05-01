package com.phonepe.controller;

// import com.phonepe.model.Upload;
// import com.phonepe.service.UploadService;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/uploads")
// public class UploadController {
//     private final UploadService uploadService;

//     public UploadController(UploadService uploadService) {
//         this.uploadService = uploadService;
//     }

//     @PostMapping("/upload")
//     public String uploadFile(@RequestBody Upload upload) {
//         uploadService.saveUpload(upload);
//         return "File uploaded!";
//     }

//     @GetMapping("/user/{userId}")
//     public List<Upload> getUserUploads(@PathVariable String userId) {
//         return uploadService.getUploadsByUser(userId);
//     }
// }



import com.phonepe.model.Accept;
import com.phonepe.model.Upload;
import com.phonepe.service.UploadService;
import com.phonepe.storage.LoginStorage;
import com.phonepe.storage.UserStorage;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/uploads")
@CrossOrigin(origins = "http://localhost:5000") 
public class UploadController {

    private final UploadService uploadService;

    public UploadController(UploadService uploadService) {
        this.uploadService = uploadService;
    }

    // ✅ NEW Endpoint
    @PostMapping("/user-upload")
    public ResponseEntity<String> uploadForLoggedInUser(@RequestParam("file") MultipartFile file) {
        // 1. Get logged in user
        String username = LoginStorage.getLoginCredentials().keySet().stream().findFirst().orElse(null);
        if (username == null) return ResponseEntity.status(401).body("User not logged in");

        Accept user = UserStorage.getUser(username);
        if (user == null) return ResponseEntity.status(404).body("User not found");

        // 2. Save file to disk (you can change path)
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        String uploadDir = "uploads/" + user.getUserId(); 
        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        File destination = new File(dir, fileName);
        try {
            file.transferTo(destination);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error saving file: " + e.getMessage());
        }

        // 3. Create Upload object
        Upload upload = new Upload();
        upload.setUserId(user.getUserId());
        upload.setFileName(file.getOriginalFilename());
        upload.setFileType(file.getContentType());
        upload.setStoragePath(destination.getAbsolutePath());
        upload.setUploadedAt(LocalDateTime.now());
        upload.setStatus("uploaded");

        // 4. Save Upload + update score
        uploadService.saveUpload(upload);

        return ResponseEntity.ok("File uploaded successfully and linked to user: " + user.getUserId());
    }
}
