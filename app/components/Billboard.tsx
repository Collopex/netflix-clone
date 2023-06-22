'use client';
import { Movie } from '@prisma/client';
import React from 'react';
import { RiNetflixFill } from 'react-icons/ri';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import PlayButton from './PlayButton';

type BillboardProp = {
  randomMovie: Movie[];
};

const Billboard = ({ randomMovie }: BillboardProp) => {
  return (
    <div className='relative h-[56.25vw]'>
      {randomMovie.map((movie) => (
        <div key={movie.id}>
          <video
            className='w-full h-[52vw] object-cover brightness-[85%]'
            src={movie?.videoUrl}
            poster={movie?.thumbnailUrl}
            autoPlay
            muted
          />
          <div className='absolute top-[30%] md:top-[40%] ml-4 md:ml-4 lg:ml-[60px]'>
            <p className='text-[#fff] text-xl md:text-3xl h-full w-full lg:text-6xl font-black drop-shadow-xl'>
              <span className='lg:flex flex-row gap-1 items-center justify-start text-xs uppercase tracking-[0.2rem] hidden mb-2'>
                <RiNetflixFill size={25} fill='#d81f26' /> <span> Movies </span>
              </span>
              {movie?.title}
            </p>
            <p className='text-white text-[9px] md:text-sm mt-3 md:mt-5 w-[55%] md:w-[60%] lg:w-1/2 drop-shadow-xl'>
              {movie?.description}
            </p>

            <div className='flex flex-row items-center gap-3 mt-3 md:mt-4'>
              <div>
                <PlayButton movieId={movie.id} />
              </div>
              <div>
                <button className='text-white  bg-[#6D6D6E]/40 hover:bg-[#6D6D6E]/25 transition rounded-md py-1 md:py-[9px] px-2  md:pr-7 md:pl-6 w-auto text-xs lg:text-lg flex flex-row items-center gap-[10px] outline-white'>
                  <AiOutlineInfoCircle className='w-4 h-4 lg:w-6 lg:h-6' /> More
                  Info
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Billboard;
