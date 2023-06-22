import prisma from '@/app/lib/prismadb';

import getCurrentUser from './getCurrentUser';

export default async function getRandomMovie() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return [];

    const movieCount = await prisma.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovie = await prisma.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return randomMovie;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
