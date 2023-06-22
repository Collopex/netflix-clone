'use client';

import { ChangeEvent, useCallback, useState } from 'react';
import axios from 'axios';
import NetflixLogo from '@/public/icons/NetflixLogo';
import Input from '../components/inputs/Input';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const AuthClient = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setVariant] = useState('login');

  const [isLoading, setIsloading] = useState(false);

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === 'login' ? 'sign up' : 'login'));
  }, []);

  const register = useCallback(async () => {
    setIsloading(true);
    try {
      await axios
        .post('/api/register', {
          email,
          name,
          password,
        })
        .then(() => {
          setIsloading(false);
          toast.success('User successfully created!');

          setVariant('login');
          setEmail('');
          setName('');
          setPassword('');
        });
    } catch (error: any) {
      setIsloading(false);
      toast.error(error?.response?.data);
    }
  }, [email, name, password]);

  const login = useCallback(async () => {
    setIsloading(true);
    signIn('credentials', {
      email,
      password,
      redirect: false,
    }).then((callback) => {
      setIsloading(false);

      if (callback?.ok) {
        toast.success('Logged in successfully');
        router.push('/profiles');
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  }, [email, password, router]);

  return (
    <div
      className="relative h-full w-full bg-[url('/images/netflix-bg.jpg')] bg-no-repeat
    bg-center bg-fixed bg-cover"
    >
      <div className='bg-black w-full h-full lg:bg-opacity-50'>
        <div className='px-12 py-5'>
          <NetflixLogo width={167} height={45} />
        </div>
        <div className=' flex justify-center'>
          <div className='bg-black bg-opacity-75 p-14 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
            <h2 className='text-[#fff] text-[32px] mb-8 font-medium'>
              {variant === 'login' ? 'Sign In' : 'Create an account'}
            </h2>

            <div className='flex flex-col gap-4'>
              {variant === 'sign up' && (
                <Input
                  label='Name'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  id='name'
                  type='text'
                  value={name}
                />
              )}
              <Input
                label='Email or phone number'
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                id='email'
                type='email'
                value={email}
              />
              <Input
                label='Password'
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                id='password'
                type='password'
                value={password}
              />
            </div>
            <button
              onClick={variant === 'login' ? login : register}
              disabled={isLoading}
              className='bg-[#e50914] py-3 text-[#fff] rounded-md w-full mt-10 hover:bg-[#d31a23] transition 
               disabled:opacity-70 disabled:cursor-not-allowed'
            >
              {variant === 'login' ? 'Login' : 'Sign Up'}
            </button>
            <p className='text-[#737373] mt-12'>
              {variant === 'login'
                ? 'New to Netflix?'
                : 'Already have an account?'}
              <span
                onClick={toggleVariant}
                className='text-white ml-1 hover:underline cursor-pointer'
              >
                {variant === 'login' ? 'Sign up now' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthClient;
