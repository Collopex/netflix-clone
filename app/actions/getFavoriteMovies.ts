import primsa from '@/app/lib/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getFavoriteMovies() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }

    const favorites = await primsa.movie.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    return favorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
