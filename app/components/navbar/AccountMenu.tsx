'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { SafeUser } from '@/app/types';
import { RiPencilFill, RiQuestionLine } from 'react-icons/ri';
import { BiTransferAlt, BiUser } from 'react-icons/bi';

type AccountMenuProps = {
  currentUser?: SafeUser | null;
  visible?: boolean;
};

const AccountMenu = ({ visible, currentUser }: AccountMenuProps) => {
  if (visible) return null;

  return (
    <div className='bg-black lg:w-[230px] w-[200px] absolute top-[49px] -right-0 flex flex-col border-t-2 border-white '>
      <div className='flex flex-col gap-3 '>
        <div className='px-3 pt-3 pb-1 group/item flex flex-row gap-3 items-center w-full'>
          <div className='w-8 h-8 relative'>
            <Image
              fill
              sizes='auto'
              src='/images/default.png'
              className='rounded-md overflow-hidden'
              alt='default blue'
            />
          </div>
          <div className='text-white hover:underline '>{currentUser?.name}</div>
        </div>
        <hr className='border-zinc-700' />

        <div
          className='px-3 text-center cursor-pointer text-[#fff] text-sm 
          hover:underline flex flex-row items-center justify-start gap-5  '
        >
          <RiPencilFill size={25} className='ml-[2px]' />
          <span>Manage Profiles</span>
        </div>
        <div
          className='px-3 text-center cursor-pointer text-[#fff] text-sm 
          hover:underline flex flex-row items-center justify-start gap-5  '
        >
          <BiTransferAlt size={25} className='ml-[2px]' />
          <span>Transfer Profile</span>
        </div>
        <div
          className='px-3 text-center cursor-pointer text-[#fff] text-sm 
          hover:underline flex flex-row items-center justify-start gap-5  '
        >
          <BiUser size={25} className='ml-[2px]' />
          <span>Account</span>
        </div>
        <div
          className='px-3 text-center cursor-pointer text-[#fff] text-sm 
          hover:underline flex flex-row items-center justify-start gap-5  '
        >
          <RiQuestionLine size={25} className='ml-[2px]' />
          <span>Help Center</span>
        </div>

        <hr className='border-zinc-700' />

        <div
          onClick={() => signOut()}
          className='text-[#fff] text-sm text-center pb-4 cursor-pointer hover:underline'
        >
          Sign out of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
