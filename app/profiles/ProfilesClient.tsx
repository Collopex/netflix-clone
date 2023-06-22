'use client';

import Image from 'next/image';
import React from 'react';
import { SafeUser } from '../types';
import { useRouter } from 'next/navigation';

type ProfilesClientProps = {
  currentUser?: SafeUser | null;
};

const ProfilesClient = ({ currentUser }: ProfilesClientProps) => {
  const router = useRouter();

  return (
    <div className='flex items-center justify-center h-full '>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-3xl md:text-6xl text-[#fff] text-center'>
          Who&apos;s watching?
        </h1>

        <div className='flex flex-row items-center justify-center gap-8 mt-10'>
          <div onClick={() => router.push('/')}>
            <div className='group flex flex-col items-center  w-44 mx-auto'>
              <div
                className=' relative w-[150px] h-[150px] rounded-md flex items-center justify-center 
                border-[3px] border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden'
              >
                <Image
                  fill
                  sizes='auto'
                  src='/images/default.png'
                  alt='default blue'
                />
              </div>
              <div className='mt-2 text-[#808080] text-2xl text-center group-hover:text-white'>
                {currentUser?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilesClient;
