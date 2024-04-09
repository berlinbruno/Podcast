package com.kgdatasolutions.podcastbackend.mapper;

import com.kgdatasolutions.podcastbackend.Model.AppUser;
import com.kgdatasolutions.podcastbackend.dto.podcast.PodcastResponse;
import com.kgdatasolutions.podcastbackend.service.GcsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class PodcastMapper {

    private final GcsService gcsService;

    public PodcastResponse mapToPodcastResponse(AppUser appUser) {
        PodcastResponse response = new PodcastResponse();
        response.setAuthorName(appUser.getName());
        response.setPodcastId(appUser.getId());
        response.setCategory(appUser.getCategory());
        response.setPodcastTitle(appUser.getTitle());
        response.setPodcastDescription(appUser.getDescription());

        // Generate signed URL for profile image if not null
        if (appUser.getProfileUrl() != null) {
            try {
                String signedProfileImageUrl = gcsService.generateSignedUrlForDownload(appUser.getProfileUrl());
                response.setAuthorProfileUrl(signedProfileImageUrl);
            } catch (IOException e) {
                // Handle the IOException as needed
                // For example, log the error or set a default URL
                e.printStackTrace();
            }
        }

        // Generate signed URL for banner image if not null
        if (appUser.getBannerUrl() != null) {
            try {
                String signedBannerImageUrl = gcsService.generateSignedUrlForDownload(appUser.getBannerUrl());
                response.setAuthorBannerUrl(signedBannerImageUrl);
            } catch (IOException e) {
                // Handle the IOException as needed
                // For example, log the error or set a default URL
                e.printStackTrace();
            }
        }

        // Check if episodes list is not null before including it in the response
        if (appUser.getEpisodes() != null) {
            List<Integer> episodesWithIndexes = new ArrayList<>();
            for (int i = 0; i < appUser.getEpisodes().size(); i++) {
                episodesWithIndexes.add(i);
            }
            response.setEpisodesWithIndexes(episodesWithIndexes);
        }

        return response;
    }
}
