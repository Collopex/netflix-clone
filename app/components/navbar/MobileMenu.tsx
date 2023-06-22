'use client';

import React from 'react';

type MobileMenuProps = {
  visible?: boolean;
};

const MobileMenu = ({ visible }: MobileMenuProps) => {
  if (visible) return null;

  return (
    <div className='bg-black lg:w-[260px] w-[190px] absolute top-11 -left-32  flex flex-col '>
      <div className='flex flex-col gap-3'>
        <div className='p-[14px] text-center font-bold text-[#fff] hover:bg-white/5 text-sm border-t-2 border-white'>
          Home
        </div>
        <div className='p-[14px] text-center text-neutral-400 hover:bg-white/5 text-sm cursor-pointer'>
          TV Shows
        </div>
        <div className='p-[14px] text-center text-neutral-400 hover:bg-white/5 text-sm cursor-pointer'>
          Movies
        </div>
        <div className='p-[14px] text-center text-neutral-400 hover:bg-white/5 text-sm cursor-pointer'>
          New & Popular
        </div>
        <div className='p-[14px] text-center text-neutral-400 hover:bg-white/5 text-sm cursor-pointer'>
          My List
        </div>
        <div className='p-[14px] text-center text-neutral-400 hover:bg-white/5 text-sm cursor-pointer'>
          Browse by Languages
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
