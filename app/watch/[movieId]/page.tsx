import getCurrentUser from '@/app/actions/getCurrentUser';
import getMovie from '@/app/actions/getMovie';
import MovieClient from './MovieClient';
import { redirect } from 'next/navigation';
import ClientOnly from '@/app/components/ClientOnly';

type Params = {
  movieId?: string;
};

const ProfilesPage = async ({ params }: { params: Params }) => {
  const currentUser = await getCurrentUser();
  const movie = await getMovie(params);

  if (!currentUser) {
    redirect('/auth');
  }

  return <MovieClient movie={movie} />;
};

export default ProfilesPage;
