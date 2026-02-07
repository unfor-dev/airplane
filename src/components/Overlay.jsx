import { useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { usePlay } from "../contexts/Play";

export const Overlay = () => {
  const { progress } = useProgress();
  const { play, end, setPlay, hasScroll } = usePlay();
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);
  const musicStarted = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio("/sound/music.mp3");
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Auto-play music on Take Off click
  const handleTakeOff = () => {
    setPlay(true);
    if (audioRef.current && !musicStarted.current) {
      audioRef.current.play();
      setIsMusicPlaying(true);
      musicStarted.current = true;
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div
      className={`overlay ${play ? "overlay--disable" : ""} ${hasScroll ? "overlay--scrolled" : ""}`}
    >
      {/* LOADER */}
      <div className={`loader ${progress === 100 ? "loader--disappear" : ""}`}>
        <div className="loader__content">
          <div className="loader__plane">
            <svg viewBox="0 0 24 24" fill="white" width="32" height="32">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>
          <div className="loader__bar">
            <div
              className="loader__fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="loader__text">
            {progress < 100 ? `${Math.round(progress)}%` : "Ready"}
          </p>
        </div>
      </div>

      {/* INTRO */}
      {progress === 100 && (
        <div className={`intro ${play ? "intro--disappear" : ""}`}>
          <h1 className="logo">
            SKY <span className="logo__accent">FLIGHT</span>
          </h1>
          <p className="intro__scroll">Scroll to explore the skies</p>
          <button className="explore" onClick={handleTakeOff}>
            <span className="explore__icon">
              <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </span>
            Take Off
          </button>
        </div>
      )}

      {/* ENDING */}
      <div className={`ending ${end ? "ending--appear" : ""}`}>
        <div className="ending__content">
          {/* Decorative plane icon */}
          <div className="ending__icon">
            <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>

          <div className="ending__line" />

          <h2 className="ending__title">
            Thank You for <span className="ending__accent">Flying</span>
          </h2>

          <p className="ending__subtitle">
            The sky is not the limit — it's just the beginning.
          </p>

          <div className="ending__line" />

          <p className="ending__credit">
            Crafted with passion above the clouds
          </p>
        </div>
      </div>

      {/* MUSIC */}
      <button
        className={`music-btn ${isMusicPlaying ? "music-btn--playing" : ""}`}
        onClick={toggleMusic}
        aria-label={isMusicPlaying ? "Pause music" : "Play music"}
      >
        {isMusicPlaying ? (
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  );
};
