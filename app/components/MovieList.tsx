'use client';

import { Movie } from '@prisma/client';
import React from 'react';
import Container from './Container';
import MovieCard from './MovieCard';
import { SafeUser } from '../types';

type MovieListProps = {
  title: string;
  movies: Movie[];
  currentUser?: SafeUser | null;
};

const MovieList = ({ movies, title, currentUser }: MovieListProps) => {
  if (movies.length === 0) {
    return null;
  }

  return (
    <Container>
      <div className=' -mt-2 sm:-mt-4 md:-mt-6 lg:-mt-8 xl:-mt-10'>
        <p className='text-[#fff]  text:xs sm:text-sm md:text-base lg:text-xl  font-semibold mb-3'>
          {title}
        </p>

        <div className='grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5  gap-[6px]'>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} currentUser={currentUser} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default MovieList;
