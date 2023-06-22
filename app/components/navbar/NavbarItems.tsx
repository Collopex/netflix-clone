'use client';

import React from 'react';

type NavbarItemsProps = {
  label: string;
};

const NavbarItems = ({ label }: NavbarItemsProps) => {
  return (
    <div className='text-white text-sm  cursor-pointer hover:text-[#e5e5e5] transition'>
      {label}
    </div>
  );
};

export default NavbarItems;
