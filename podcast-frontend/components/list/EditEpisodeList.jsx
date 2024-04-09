"use client";
import React, { useState } from "react";
import EpisodeCard from "../card/EpisodeCard";
import AudioPlayer from "../Controller/AudioPlayer";
import { Button } from "../ui/button";
import { EditIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const EditEpisodeList = ({ episodes }) => {
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [play, setPlay] = useState(false);
  const[duration,setDuration] = useState(null)

  const router = useRouter();
  const pathname = usePathname();

  const handleEpisodeClick = (episode) => {
    if (selectedEpisode === episode?.episodeId) {
      setPlay(!play);
    } else {
      setSelectedEpisode(episode?.episodeId);
      setAudioUrl(
        `${episode?.audioUrl}`
      );
      setPlay(true);
      setDuration(episode?.duration)
     
    }
  };

  const handleClick = (episodeId) => {
    const url = `${pathname}/${episodeId}`;
    router.push(url);
  };

  return (
    <section>
      <h1 className="title">EPISODES</h1>

      {episodes?.map((episode) => (
        <div key={episode?.episodeId} className="cursor-pointer my-1">
          <div onClick={() => handleEpisodeClick(episode)}>
            <EpisodeCard
              episode={episode}
              play={selectedEpisode === episode?.episodeId && play}
            />
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleClick(episode?.episodeId);
              }}
              className="my-2"
            >
              <EditIcon />
              <p className=" hidden md:block">Edit Episode {episode.episodeId + 1}</p>
            </Button>
          </div>

          {/* Render AudioPlayer only if the episode is selected and is playing */}
          {selectedEpisode === episode?.episodeId && (
            <AudioPlayer src={audioUrl} play={play} totalTime={duration} />
          )}
        </div>
      ))}
    </section>
  );
};

export default EditEpisodeList;
