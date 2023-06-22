'use client';

import React, { useEffect, useRef, useState } from 'react';
import screenfull from 'screenfull';

import { Movie } from '@prisma/client';
import ReactPlayer from 'react-player/lazy';
import Controls from '@/app/components/Controls';

type MovieClientProps = {
  movie: Movie;
};

const MovieClient = ({ movie }: MovieClientProps) => {
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true);
    }
  }, []);

  const videoPlayerRef = useRef<ReactPlayer>(null);
  const videoPLayerContainerRef = useRef();

  const [videoPlayer, setVideoPlayer] = useState({
    playing: true,
    volume: 0.5,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    seeking: false,
  });

  const [totalDuration, setTotalDuration] = useState<number>(0);

  const { playing, volume, muted, played, loaded, duration, playbackRate } =
    videoPlayer;

  const handlePlayPause = () => {
    setVideoPlayer({ ...videoPlayer, playing: !videoPlayer.playing });
  };

  const handleRewind = () => {
    const currentTime = videoPlayerRef.current?.getCurrentTime();
    const durations = videoPlayerRef.current?.getDuration();

    if (currentTime === undefined || durations === undefined) {
      return;
    }

    const rewindTime = Math.min(currentTime - 10, durations);
    videoPlayerRef.current?.seekTo(rewindTime);

    setVideoPlayer({ ...videoPlayer, played: rewindTime / durations });
  };

  const handleForward = () => {
    const currentTime = videoPlayerRef.current?.getCurrentTime();
    const durations = videoPlayerRef.current?.getDuration();

    if (currentTime === undefined || durations === undefined) {
      return;
    }

    const forwardTime = Math.min(currentTime + 10, durations);
    videoPlayerRef.current?.seekTo(forwardTime);

    setVideoPlayer({ ...videoPlayer, played: forwardTime / durations });
  };

  const handleToggleMuted = (): void => {
    let newMuted: boolean = !videoPlayer.muted;
    let newVolume: number = videoPlayer.volume;

    if (newVolume === 0) {
      newMuted = false;
      newVolume = 0.5;
    } else if (newVolume > 0 && newVolume <= 1) {
      newVolume = 0;
    } else {
      newVolume = 1;
    }

    setVideoPlayer({ ...videoPlayer, muted: newMuted, volume: newVolume });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newVolume: number = parseFloat(e.currentTarget.value);
    setVideoPlayer({
      ...videoPlayer,
      volume: newVolume,
    });
  };

  // const handleSetPlaybackRate = (
  //   e: React.SyntheticEvent<HTMLButtonElement>
  // ) => {
  //   setVideoPlayer({
  //     ...videoPlayer,
  //     playbackRate: parseFloat(e.currentTarget.value),
  //   });
  // };

  const handlePlay = () => {
    setVideoPlayer({ ...videoPlayer, playing: true });
  };

  const handlePause = () => {
    setVideoPlayer({ ...videoPlayer, playing: false });
  };

  const handleSeekMouseDown = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setVideoPlayer({ ...videoPlayer, seeking: true });
  };

  const handleSeekChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setVideoPlayer({
      ...videoPlayer,
      played: parseFloat(e.currentTarget.value),
    });
  };

  const handleSeekMouseUp = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setVideoPlayer({ ...videoPlayer, seeking: false });
    if (videoPlayerRef) {
      videoPlayerRef.current?.seekTo(parseFloat(e.currentTarget.value));
    }
  };

  const handleProgress = (progress: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    if (!videoPlayer.seeking) {
      const { played, loaded = 0 } = progress;
      setVideoPlayer({
        ...videoPlayer,
        played: played,
        loaded: loaded,
      });
    }
  };

  const handleDuration = (duration: number) => {
    console.log('onDuration', duration);
    setVideoPlayer({
      ...videoPlayer,
      duration: duration,
    });

    setTotalDuration(duration);
  };

  const handleClickFullscreen = () => {
    screenfull.toggle(videoPLayerContainerRef.current);
  };

  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setShowControls(false), 3500);
    };

    // Set the timeout when the component mounts
    resetTimeout();

    // Reset the timeout whenever there is activity
    const handleActivity = () => {
      setShowControls(true);
      resetTimeout();
    };
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    // Remove the event listeners when the component unmounts
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, []);

  return (
    <div className=' bg-black w-screen h-screen relative'>
      {hasWindow && (
        <>
          <ReactPlayer
            width={'100%'}
            height={'100%'}
            ref={videoPlayerRef}
            url={movie.videoUrl}
            playing={playing}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            onPlay={handlePlay}
            onPause={handlePause}
            onProgress={handleProgress}
            onDuration={handleDuration}
          />
          {showControls && (
            <Controls
              title={movie.title}
              played={played}
              playing={playing}
              duration={totalDuration}
              muted={muted}
              volume={volume}
              handlePlayPause={handlePlayPause}
              handleRewind={handleRewind}
              handleForward={handleForward}
              handleVolumeChange={handleVolumeChange}
              handleToggleMuted={handleToggleMuted}
              handleSeekChange={handleSeekChange}
              handleSeekMouseDown={handleSeekMouseDown}
              handleSeekMouseUp={handleSeekMouseUp}
              handleClickFullscreen={handleClickFullscreen}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MovieClient;
