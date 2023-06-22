'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { IoMdPlay } from 'react-icons/io';

type PlayButtonProps = {
  movieId: string;
};

const PlayButton = ({ movieId }: PlayButtonProps) => {
  const router = useRouter();
  return (
    <button
      className='bg-white hover:bg-white/60  transition rounded-md font-semibold  py-1 md:py-[9px] px-2 md:pr-7 md:pl-6 w-auto text-xs lg:text-lg  flex flex-row items-center gap-2 outline-white'
      onClick={() => router.push(`/watch/${movieId}`)}
    >
      <IoMdPlay className='w-4 h-4 lg:w-6 lg:h-6' /> Play
    </button>
  );
};

export default PlayButton;
