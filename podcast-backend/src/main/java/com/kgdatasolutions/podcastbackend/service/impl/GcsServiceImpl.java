package com.kgdatasolutions.podcastbackend.service.impl;


import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.storage.*;
import com.kgdatasolutions.podcastbackend.service.GcsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.TimeUnit;


// GcsServiceImpl.java
@Service
public class GcsServiceImpl implements GcsService {

    @Value("${gcs.bucket.name}")
    private String bucketName;

    @Autowired
    private Storage storage;
    private final String PATH_TO_JSON_KEY = "src/main/resources/key.json";


    @Override
    public String saveFileToGCS(String userId, String type, MultipartFile file) throws IOException {
        try {
            String imageName = generateUniqueImageName();
            String blobId = userId + "/" + type + "/" + imageName;

            Blob blob = storage.create(
                    Blob.newBuilder(bucketName, blobId)
                            .setContentType(file.getContentType())
                            .build(),
                    file.getInputStream()
            );
            return blobId;
        } catch (IOException e) {
            throw new RuntimeException("Failed to save image to GCS", e);
        }
    }

    @Override
    public InputStream downloadFromGCS(String filePath) throws IOException {

            BlobId blobId = BlobId.of(bucketName, filePath);
            Blob blob = storage.get(blobId);
            if (blob != null) {
                return new ByteArrayInputStream(blob.getContent());
            }
            return null;
    }

    @Override
    public String updateFileToGCS(String filePath, MultipartFile file) throws IOException {
        try {

            Blob blob = storage.create(
                    Blob.newBuilder(bucketName, filePath)
                            .setContentType(file.getContentType())
                            .build(),
                    file.getInputStream()
            );

            return filePath;
        } catch (IOException e) {
            throw new RuntimeException("Failed to save image to GCS", e);
        }
    }

    @Override
    public void deleteFileFromGCS(String filePath) throws IOException {
        try {
            // Create BlobId with the bucket name and file path
            BlobId blobId = BlobId.of(bucketName, filePath);

            // Delete the blob from GCS
            boolean deleted = storage.delete(blobId);

            if (!deleted) {
                throw new IOException("Failed to delete file from GCS");
            }
        } catch (StorageException e) {
            // Handle StorageException
            throw new IOException("Failed to delete file from GCS", e);
        }
    }

    @Override
    public String generateSignedUrlForDownload(String filePath) throws IOException {
        Blob blob = storage.get(bucketName, filePath);

        URL signedUrl = null;
        try {
            signedUrl = storage.signUrl(BlobInfo.newBuilder(bucketName, filePath).build(),
                    1, TimeUnit.DAYS, Storage.SignUrlOption.signWith(ServiceAccountCredentials.fromStream(
                            new FileInputStream(PATH_TO_JSON_KEY))));
        } catch (IOException e) {
            e.printStackTrace();
        }
        assert signedUrl != null;
        return signedUrl.toString();
    }

    @Override
    public String generateSignedUrlForUpload(String userId, String type, String fileName) throws StorageException, IOException {

        String filePath = String.format("%s/%s/%s", userId, type, fileName);

        // Define Resource
        BlobInfo blobInfo = BlobInfo.newBuilder(BlobId.of(bucketName, filePath)).build();

        // Generate Signed URL
        Map<String, String> extensionHeaders = new HashMap<>();
        extensionHeaders.put("Content-Type", "application/octet-stream");

        URL url =
                storage.signUrl(
                        blobInfo,
                        30,
                        TimeUnit.MINUTES,
                        Storage.SignUrlOption.httpMethod(HttpMethod.PUT),
                        Storage.SignUrlOption.withExtHeaders(extensionHeaders),
                        Storage.SignUrlOption.signWith(ServiceAccountCredentials.fromStream(
                                new FileInputStream(PATH_TO_JSON_KEY))),
                        Storage.SignUrlOption.withV4Signature());
        return url.toString();
    }

    @Override
    public String generateSignedUrlForUpdate(String filePath) throws StorageException, IOException {


        // Define Resource
        BlobInfo blobInfo = BlobInfo.newBuilder(BlobId.of(bucketName, filePath)).build();

        // Generate Signed URL
        Map<String, String> extensionHeaders = new HashMap<>();
        extensionHeaders.put("Content-Type", "application/octet-stream");

        URL url =
                storage.signUrl(
                        blobInfo,
                        30,
                        TimeUnit.MINUTES,
                        Storage.SignUrlOption.httpMethod(HttpMethod.PUT),
                        Storage.SignUrlOption.withExtHeaders(extensionHeaders),
                        Storage.SignUrlOption.signWith(ServiceAccountCredentials.fromStream(
                                new FileInputStream(PATH_TO_JSON_KEY))),
                        Storage.SignUrlOption.withV4Signature());

        System.out.println("Generated PUT signed URL:");
        System.out.println(url);
        return url.toString();
    }


    @Override
    public String generateUniqueImageName() {
        return UUID.randomUUID().toString();
    }
}


