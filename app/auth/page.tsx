import { redirect } from 'next/navigation';
import getCurrentUser from '../actions/getCurrentUser';
import AuthClient from './AuthClient';

const AuthPage = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect('/');
  }

  return <AuthClient />;
};

export default AuthPage;
