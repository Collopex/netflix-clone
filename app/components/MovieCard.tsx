'use client';

import { Movie } from '@prisma/client';
import Image from 'next/image';
import React from 'react';
import { IoMdPlay } from 'react-icons/io';
import { AiOutlineLike } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';
import FavoriteButton from './FavoriteButton';
import { SafeUser } from '../types';
import { useRouter } from 'next/navigation';

type MovieCardProps = {
  movie: Movie;
  currentUser?: SafeUser | null;
};

const MovieCard = ({ movie, currentUser }: MovieCardProps) => {
  const {
    id,
    title,
    cast,
    maturityRating,
    director,
    writer,
    genres,
    description,
    videoUrl,
    duration,
    thumbnailUrl,
  } = movie;

  const router = useRouter();

  return (
    <div className='group bg-[#141414] rounded-sm relative'>
      <Image
        unoptimized
        width={200}
        height={150}
        className='cursor-pointer transition duration-[400ms] shadow-xl 
        rounded-md sm:group-hover:opacity-0 group-hover:opacity-90  h-full w-full'
        src={thumbnailUrl}
        alt={title}
      />
      <div
        className='opacity-0 absolute top-0 transition duration-[400ms] z-10 invisible sm:visible 
        w-full scale-0 group-hover:scale-125 group-hover:-translate-y-[5vw] group-hover:translate-x-[3vw]
        group-hover:opacity-100 '
      >
        <Image
          unoptimized
          width={200}
          height={150}
          src={thumbnailUrl}
          alt={title}
          className=' w-full h-full cursor-pointer shadow-xl transition duration-[400ms] rounded-t-md'
        />
        <div className='z-10 bg-[#191919] p-2 lg:p-4 absolute w-full transition shadow-xl rounded-b-md'>
          <div className='flex flex-row items-center gap-3'>
            <div
              className='cursor-pointer w-8 h-8 bg-white 
              rounded-full flex justify-center items-center transition hover:bg-neutral-300'
              onClick={() => router.push(`/watch/${id}`)}
            >
              <IoMdPlay className='w-4 h-4 mx-auto' />
            </div>
            <div>
              <FavoriteButton id={id} currentUser={currentUser} />
            </div>
            <div
              className='cursor-pointer w-8 h-8 bg-[#201f1f] border-2 border-gray-400  hover:border-[#fff]
              rounded-full flex  justify-center items-center transition'
              onClick={() => {}}
            >
              <AiOutlineLike className='w-4 h-4 mx-auto' fill='white' />
            </div>

            <div
              className='cursor-pointer w-8 h-8 bg-[#201f1f] border-2 border-gray-400  hover:border-[#fff]
              rounded-full flex justify-center items-center transition ml-auto'
              onClick={() => {}}
            >
              <BsChevronDown className='w-4 h-4 mx-auto' fill='white' />
            </div>
          </div>
          <div className='flex flex-row items-center gap-2 mt-4'>
            <p className='text-[#46d369] text-sm font-semibold '>New</p>
            <span className='text-white text-xs px-2 border border-gray-400'>
              {maturityRating}+
            </span>
            <span className='text-white text-xs'>{duration}</span>
            <span className='text-white text-[8px] px-1 border border-gray-400'>
              HD
            </span>
          </div>
          <div className='mt-4 text-[#fff] text-xs mr-'>
            <span className='mr-1 font-bold text-[10px]'>·</span> {genres}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
