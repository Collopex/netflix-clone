'use client';

import React from 'react';

import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';
import { SafeUser } from '../types';
import useFavorite from '../hooks/useFavorite';

type FavoriteButtonProps = {
  id: string;
  currentUser?: SafeUser | null;
};

const FavoriteButton = ({ id, currentUser }: FavoriteButtonProps) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    id,
    currentUser,
  });

  const Icon = hasFavorited ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      className='cursor-pointer w-8 h-8 bg-[#201f1f] border-2 border-gray-400  hover:border-[#fff]
      rounded-full flex justify-center items-center transition'
      onClick={toggleFavorite}
    >
      <Icon className='w-4 h-4 mx-auto' fill='white' />
    </div>
  );
};

export default FavoriteButton;
