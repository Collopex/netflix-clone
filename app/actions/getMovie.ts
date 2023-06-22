import prisma from '@/app/lib/prismadb';
import getCurrentUser from './getCurrentUser';

type Params = {
  movieId?: string;
};

export default async function getMovie(params: Params) {
  try {
    const currentUser = await getCurrentUser();
    const { movieId } = params;

    if (!currentUser) {
      throw new Error('Please login to continue!');
    }

    if (typeof movieId !== 'string') {
      throw new Error('Movie not found!');
    }

    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      throw new Error('Movie id not found!');
    }

    return movie;
  } catch (error) {}
}
