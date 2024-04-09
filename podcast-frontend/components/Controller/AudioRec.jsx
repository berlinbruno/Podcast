"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import {
  MicIcon,
  PauseIcon,
  PlayIcon,
  SaveIcon,
  StepForwardIcon,
  StopCircleIcon,
} from "lucide-react";
import AudioPlayer from "./AudioPlayer";
import Image from "next/image";
import { formatTimehhmmss } from "@/utils/format";
import { AspectRatio } from "../ui/aspect-ratio";

export default function AudioRec() {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [audio, setAudio] = useState(null);
  const [play, setPlay] = useState(false);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    let intervalId;
    if (recording && !paused) {
      intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000); // Update every second
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [recording, paused, startTime]);

  const startRecording = () => {
    setStartTime(Date.now()); // Reset start time to current time
    setRecording(true);
    setPaused(false);
    setAudioChunks([]);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.addEventListener("dataavailable", (event) => {
          setAudioChunks((prevChunks) => [...prevChunks, event.data]);
        });
        if (paused) {
          mediaRecorderRef.current.resume(); // Resume recording from paused state
        } else {
          mediaRecorder.start();
        }
      })
      .catch((error) => console.error("Error accessing microphone:", error));
  };

  const pauseRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.pause();
      setPaused(true);
      setElapsedTime(Date.now() - startTime);
    }
  };

  const resumeRecording = () => {
    if (paused) {
      setPaused(false);
      setStartTime(Date.now() - elapsedTime);
      mediaRecorderRef.current.resume();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      setPaused(false);
      setStartTime(null);
      setElapsedTime(0);
    }
  };

  const playRecording = () => {
    if (audioChunks.length > 0) {
      const audioBlob = new Blob(audioChunks, { type: "audio/weba" });
      const audioUrl = URL.createObjectURL(audioBlob);

      setAudio(audioUrl);
      setPlay(!play);
    }
  };

  const saveRecording = () => {
    if (audioChunks.length > 0) {
      const audioBlob = new Blob(audioChunks, { type: "audio/weba" });
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "recording.weba";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center p-2">
      <h1 className=" title">Record</h1>
      <div className=" flex flex-col gap-2 justify-center items-center  w-full max-w-[250px]">
        <AspectRatio ratio={1 / 1}>
          <Image
            src="/podcast.jpg"
            fill
            alt="icon"
            className=" rounded-md object-cover"
          />
        </AspectRatio>
        {!paused ? (
          <span className="flex gap-2 justify-center items-center">
            <div
              className={`${
                recording ? "animate-pulse block" : " hidden"
              } h-4 w-4 bg-red-600 rounded-full`}
            ></div>
            {formatTimehhmmss(elapsedTime)}
          </span>
        ) : (
          <span className=" flex items-center">
            <PauseIcon /> {formatTimehhmmss(elapsedTime)}
          </span>
        )}
      </div>
      {audio && <AudioPlayer src={audio} play={play} />}
      <div className="flex flex-col lg:flex-row justify-center gap-2">
        <Button onClick={startRecording} disabled={recording}>
          <MicIcon />
          <span>Start Recording</span>
        </Button>
        {!paused && (
          <Button onClick={pauseRecording} disabled={!recording || paused}>
            <StepForwardIcon />
            <span>Pause Recording</span>
          </Button>
        )}
        {paused && (
          <Button onClick={resumeRecording} disabled={!paused}>
            <StepForwardIcon />
            <span>Resume Recording</span>
          </Button>
        )}
        <Button onClick={stopRecording} disabled={!recording && !paused}>
          <StopCircleIcon />
          <span>Stop Recording</span>
        </Button>
        <Button onClick={playRecording} disabled={audioChunks.length === 0}>
          <PlayIcon />
          <span>Play Recording</span>
        </Button>
        <Button onClick={saveRecording} disabled={audioChunks.length === 0}>
          <SaveIcon />
          <span>Save Recording</span>
        </Button>
      </div>
    </div>
  );
}
