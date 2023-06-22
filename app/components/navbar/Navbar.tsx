'use client';

import React, { useCallback, useEffect, useState } from 'react';
import NetflixLogo from '@/public/icons/NetflixLogo';
import NavbarItems from './NavbarItems';
import { BsBell, BsChevronDown, BsSearch } from 'react-icons/bs';
import MobileMenu from './MobileMenu';
import Image from 'next/image';
import AccountMenu from './AccountMenu';
import { SafeUser } from '@/app/types';

const navLabel = [
  { label: 'Home' },
  { label: 'TV Shows' },
  { label: 'Movies' },
  { label: 'New & Popular' },
  { label: 'My List' },
  { label: 'Browse by Languages' },
];

type NavbarProps = {
  currentUser?: SafeUser | null;
};

const Navbar = ({ currentUser }: NavbarProps) => {
  const [showMobileMenu, setShowMobileMenu] = useState(true);
  const [showAccountMenu, setShowAccountMenu] = useState(true);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY >= 1 ? setActive(true) : setActive(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className='w-full fixed z-50'>
      <div
        className={`${
          active ? 'bg-black' : 'bg-transparent'
        } px-5 lg:px-16  flex flex-row items-center transition duration-500 `}
      >
        <NetflixLogo height={67} width={89} />
        <div className=' flex-row ml-12  gap-5 hidden lg:flex flex-1'>
          {navLabel.map((item) => (
            <NavbarItems key={item.label + 1} label={item.label} />
          ))}
        </div>
        <div
          onClick={toggleMobileMenu}
          className='lg:hidden flex flex-row items-center gap-2 ml-9 relative cursor-pointer flex-1'
        >
          <p className='text-white text-sm'>Browse</p>
          <BsChevronDown
            fill='#fff'
            className={` transition ${
              showMobileMenu ? 'rotate-0' : 'rotate-180'
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className='flex flex-row gap-6 items-center relative'>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer'>
            <BsSearch fill='#fff' size={20} />
          </div>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer'>
            <BsBell fill='#fff' size={20} />
          </div>
          <div
            onClick={() => toggleAccountMenu()}
            className='flex items-center gap-6 cursor-pointer '
          >
            <div className='w-[30px] h-[30px] lg:w-9 lg:h-9 overflow-hidden relative'>
              <Image
                fill
                sizes='auto'
                src='/images/default.png'
                className='rounded-md overflow-hidden'
                alt='default blue'
              />
            </div>
            <div className='-ml-4 hidden lg:block '>
              <BsChevronDown
                fill='#fff'
                className={`transition ${
                  showAccountMenu ? 'rotate-0' : 'rotate-180'
                }`}
              />
            </div>
            <AccountMenu currentUser={currentUser} visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
