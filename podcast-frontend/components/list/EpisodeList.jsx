"use client";
import React, { useEffect, useState } from "react";
import EpisodeCard from "../card/EpisodeCard";
import AudioPlayer from "../Controller/AudioPlayer";
import Loading from "@/app/loading";

const EpisodeList = ({ podcastId }) => {
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [play, setPlay] = useState(false);
  const [duration, setDuration] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    getAllEpisodesById();
  }, []);

  console.log(episodes);

  const getAllEpisodesById = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          // Add headers if required
        },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/get/podcast/${podcastId}/episodes`,
        requestOptions
      );

      if (response.status === 204) {
        // No content returned, resolve with empty array
        setEpisodes([]);
      } else if (!response.ok) {
        // Handle other error cases
        console.error("Error fetching episodes:", response.statusText);
      } else {
        const result = await response.json();
        setEpisodes(result);
      }
    } catch (error) {
      console.error("Error fetching episodes:", error);
    }
  };

  const handleEpisodeClick = (episode) => {
    if (selectedEpisode === episode?.episodeId) {
      setPlay(!play);
    } else {
      setSelectedEpisode(episode?.episodeId);
      setAudioUrl(`${episode?.audioUrl}`);
      setPlay(true);
      setDuration(episode?.duration);
    }
  };

  return (
    <section>
      <h1 className="title">EPISODES</h1>
      {episodes?.map((episode) => {
        return (
          <div key={episode?.episodeId} className="cursor-pointer my-1">
            <div
              onClick={() => handleEpisodeClick(episode)}
              className=" relative"
            >
              <EpisodeCard
                episode={episode}
                play={selectedEpisode === episode?.episodeId && play}
              />
            </div>

            {/* Render AudioPlayer only if the episode is selected and is playing */}
            {selectedEpisode === episode?.episodeId && (
              <AudioPlayer src={audioUrl} play={play} totalTime={duration} />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default EpisodeList;
