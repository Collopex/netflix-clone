'use client';

import React, { useRef } from 'react';
import Duration from './Duration';
import ForwardLogo from '@/public/icons/RewindLogo';
import RewindLogo from '@/public/icons/ForwardLogo';
import VolumeMaxLogo from '@/public/icons/VolumeMaxLogo';
import SubtitlesLogo from '@/public/icons/SubtitlesLogo';
import PlaybackRateLogo from '@/public/icons/PlaybackRateLogo';
import FullscreenLogo from '@/public/icons/FullscreenLogo';
import GoBackLogo from '@/public/icons/GoBackLogo';
import { useRouter } from 'next/navigation';
import PlayLogo from '@/public/icons/PlayLogo';
import PauseLogo from '@/public/icons/PauseLogo';
import VolumeMidLogo from '@/public/icons/VolumeMidLogo';
import VolumeMuteLogo from '@/public/icons/VolumeMuteLogo';

type ControlsProps = {
  title: string;
  played: number;
  playing: boolean;
  duration: number;
  muted: boolean;
  volume: number;
  handlePlayPause: () => void;
  handleRewind: () => void;
  handleForward: () => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggleMuted: () => void;
  handleSeekChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  handleSeekMouseDown: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  handleSeekMouseUp: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  handleClickFullscreen: () => void;
};

const Controls = ({
  title,
  played,
  playing,
  duration,
  volume,
  handlePlayPause,
  handleRewind,
  handleForward,
  handleVolumeChange,
  handleToggleMuted,
  handleSeekChange,
  handleSeekMouseDown,
  handleSeekMouseUp,
  handleClickFullscreen,
}: ControlsProps) => {
  const router = useRouter();

  return (
    <>
      <div
        onClick={() => router.back()}
        className='absolute top-[30px] left-[30px] cursor-pointer'
      >
        <GoBackLogo />
      </div>
      <div className='flex flex-col absolute bottom-[38px] px-4 w-full gap-6 '>
        <div className='flex items-center justify-center gap-7 z-10 px-1'>
          <div className='w-full flex items-center justify-center '>
            <input
              className='left-4 bottom-28 accent-[#E50914] h-[3.5px] w-full cursor-pointer bg-slate-950 '
              type='range'
              min={0}
              max={0.999999}
              step='any'
              value={played}
              onChange={handleSeekChange}
              onMouseDown={handleSeekMouseDown}
              onMouseUp={handleSeekMouseUp}
            />
          </div>
          <div className='text-base text-white'>
            <Duration seconds={duration * (1 - played)} />
          </div>
        </div>
        <div className='flex flex-row items-center px-1'>
          <div className='flex flex-row items-center px-1 gap-[32px]'>
            <div
              onClick={handlePlayPause}
              className='hover:scale-[1.30] transition cursor-pointer'
            >
              {!playing ? <PlayLogo /> : <PauseLogo />}
            </div>
            <div
              onClick={handleRewind}
              className='hover:scale-[1.30] transition cursor-pointer'
            >
              <RewindLogo />
            </div>
            <div
              onClick={handleForward}
              className='hover:scale-[1.30] transition cursor-pointer'
            >
              <ForwardLogo />
            </div>
            <div className='group flex flex-row justify-center items-center gap-4 relative '>
              <div
                onClick={handleToggleMuted}
                className='hover:scale-[1.30] cursor-pointer'
              >
                {volume === 0 ? <VolumeMuteLogo /> : <VolumeMaxLogo />}
              </div>
              <div className='flex justify-start items-center w-28 group-hover:scale-x-100 '>
                <input
                  type='range'
                  min={0}
                  max={1}
                  step={0.1}
                  value={volume}
                  onChange={handleVolumeChange}
                  className='cursor-pointer w-0 group-hover:w-28 
                  scale-x-0 group-hover:scale-x-100 accent-[#E50914]'
                />
              </div>
            </div>
          </div>
          <div className='flex justify-center flex-1 -ml-36 text-white text-xl font-medium select-none '>
            {title}
          </div>
          <div className='flex flex-row items-center gap-8'>
            <div className='hover:scale-[1.30] transition cursor-pointer'>
              <SubtitlesLogo />
            </div>
            <div className='hover:scale-[1.30] transition cursor-pointer'>
              <PlaybackRateLogo />
            </div>
            <div
              onClick={handleClickFullscreen}
              className='hover:scale-[1.30] transition cursor-pointer'
            >
              <FullscreenLogo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Controls;
