import { redirect } from 'next/navigation';
import getCurrentUser from './actions/getCurrentUser';
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import getRandomMovie from './actions/getRandomMovie';
import Billboard from './components/Billboard';
import MovieList from './components/MovieList';
import getAllMovies from './actions/getAllMovies';
import getFavoriteMovies from './actions/getFavoriteMovies';

const Home = async () => {
  const currentUser = await getCurrentUser();
  const randomMovie = await getRandomMovie();
  const movies = await getAllMovies();
  const favorites = await getFavoriteMovies();

  if (!currentUser) redirect('/auth');

  return (
    <ClientOnly>
      <Navbar currentUser={currentUser} />
      <Billboard randomMovie={randomMovie} />
      <div className='pb-40 flex flex-col gap-6 sm:gap-8 md:gap-12 lg:gap-14 xl:gap-20'>
        <MovieList
          movies={movies}
          title='Trending Now'
          currentUser={currentUser}
        />
        <MovieList
          movies={favorites}
          title='My List'
          currentUser={currentUser}
        />
      </div>
    </ClientOnly>
  );
};

export default Home;
