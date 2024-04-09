package com.kgdatasolutions.podcastbackend.controller;


import com.kgdatasolutions.podcastbackend.service.GcsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;
import java.rmi.RemoteException;


@RestController
@RequestMapping("/cloud")
public class GcsController {

    @Autowired
    private GcsService gcsService;

    @GetMapping("/{userId}/{type}/{id}")
    public ResponseEntity<?> getSignedUrl(@PathVariable String userId, @PathVariable String type,
                                          @PathVariable String id) {
        String filePath = String.format("%s/%s/%s", userId, type, id);
        try {
            String result = gcsService.generateSignedUrlForDownload(filePath);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/signed-url/{userId}/{type}/{contentType}")
    public ResponseEntity<?> getSignedUrlForUpload(@PathVariable String userId, @PathVariable String type) {
        try {
            String result = gcsService.generateSignedUrlForUpload(userId, gcsService.generateUniqueImageName(), type);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/download/{userId}/{type}/{id}")
    public ResponseEntity<InputStreamResource> downloadFile(@PathVariable String userId, @PathVariable String type,
                                                                 @PathVariable String id) {
        String filePath = String.format("%s/%s/%s",userId,type,id);
        try {
            InputStream inputStream = gcsService.downloadFromGCS(filePath);
            if (inputStream != null) {
                InputStreamResource resource = new InputStreamResource(inputStream);

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
                headers.setContentDispositionFormData("filename",filePath);

                return new ResponseEntity<>(resource, headers, HttpStatus.OK);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/signed-url/{filePath}")
    public ResponseEntity<String> getSignedUrl(@PathVariable String filePath) throws IOException {
        try {
            String result = gcsService.generateSignedUrlForDownload(filePath);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteFileFromGcs(@RequestParam String filePath) throws IOException {
        try {
            gcsService.deleteFileFromGCS(filePath);
            return null;
        } catch (IOException e) {
            throw new RemoteException(e.getMessage());
        }
    }

}


