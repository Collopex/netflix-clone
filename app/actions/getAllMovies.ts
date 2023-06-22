import prisma from '@/app/lib/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getAllMovies() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return [];

    const movies = await prisma.movie.findMany();
    return movies;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
