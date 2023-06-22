'use client';
import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className='max-w-[2000px] mx-auto lg:px-16 sm:px-4 px-4'>
      {children}
    </div>
  );
};

export default Container;
