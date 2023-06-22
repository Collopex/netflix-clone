import React, { useCallback, useMemo } from 'react';
import { SafeUser } from '../types';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type FavoriteProps = {
  id: string;
  currentUser?: SafeUser | null;
};

const useFavorite = ({ id, currentUser }: FavoriteProps) => {
  const router = useRouter();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(id);
  }, [currentUser, id]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();

      if (!currentUser) {
        return null;
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${id}`);
          toast.success('Successful deleted from favorites');
        } else {
          request = () => axios.post(`/api/favorites/${id}`);
          toast.success('Successful added to favorites');
        }
        await request();
        router.refresh();
      } catch (error) {
        toast.error('Something went wrong while adding to favorites!');
      }
    },
    [currentUser, hasFavorited, id, router]
  );
  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
