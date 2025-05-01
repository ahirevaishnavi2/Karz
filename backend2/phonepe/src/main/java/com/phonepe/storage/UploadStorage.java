package com.phonepe.storage;

import com.phonepe.model.Upload;
import java.util.HashMap;

public class UploadStorage {
    private static HashMap<String, Upload> uploads = new HashMap<>();

    public static void addUpload(Upload upload) {
        System.out.println("Adding upload: " + upload);
        uploads.put(upload.getId(), upload);
    }

    public static Upload getUpload(String uploadId) {
        return uploads.get(uploadId);
    }

    public static HashMap<String, Upload> getAllUploads() {
        return uploads;
    }

    public static void removeUpload(String uploadId) {
        uploads.remove(uploadId);
    }
}
