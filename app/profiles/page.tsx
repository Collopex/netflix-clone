import { redirect } from 'next/navigation';
import getCurrentUser from '../actions/getCurrentUser';
import ProfilesClient from './ProfilesClient';

const ProfilesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect('/auth');

  return <ProfilesClient currentUser={currentUser} />;
};

export default ProfilesPage;
