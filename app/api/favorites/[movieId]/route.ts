import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/lib/prismadb';

type Params = {
  movieId?: string;
};

export async function POST(req: Request, { params }: { params: Params }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const { movieId } = params;

    if (!movieId || typeof movieId !== 'string') {
      throw new Error('Invalid ID');
    }

    const existingMovie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      throw new Error('Movie not found');
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(movieId);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    throw new Error('Something went wrong!');
  }
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const { movieId } = params;

  if (!movieId || typeof movieId !== 'string') {
    throw new Error('Invalid ID');
  }

  const existingMovie = await prisma.movie.findUnique({
    where: {
      id: movieId,
    },
  });

  if (!existingMovie) {
    throw new Error('Movie not found');
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== movieId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}
