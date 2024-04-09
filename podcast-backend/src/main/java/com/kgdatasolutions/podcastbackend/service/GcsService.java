package com.kgdatasolutions.podcastbackend.service;


import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

public interface GcsService {

    String saveFileToGCS(String userId, String type, MultipartFile file) throws IOException;

    InputStream downloadFromGCS(String filePath) throws IOException;

    String updateFileToGCS(String filePath, MultipartFile file) throws IOException;

    void deleteFileFromGCS(String filePath) throws IOException;

    String generateSignedUrlForUpload(String userId, String fileName, String type) throws IOException;

    String generateSignedUrlForUpdate(String filePath) throws IOException;

    String generateSignedUrlForDownload(String fileName) throws IOException;

    String generateUniqueImageName();


}

