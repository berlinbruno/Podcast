package com.kgdatasolutions.podcastbackend.dto.episode;

import lombok.Data;

import java.util.Date;

@Data
public class EpisodeResponse {
    private int episodeId;
    private String title;
    private String description;
    private String audioUrl;
    private String podcastId;
    private Long duration;
}
