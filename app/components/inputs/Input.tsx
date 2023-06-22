'use client';
import React, { ChangeEventHandler } from 'react';

type InputProps = {
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  label: string;
  type?: string;
};

const Input = ({ id, onChange, value, label, type }: InputProps) => {
  return (
    <div className='relative '>
      <input
        id={id}
        value={value}
        type={type}
        onChange={onChange}
        className='block rounded-md px-[22px] w-full pt-6 pb-[6px] text-base text-white bg-[#333] appearance-none 
        focus:outline-none focus:ring-0 peer '
        placeholder=' '
      />
      <label
        htmlFor={id}
        className='absolute text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-[14px] left-5 z-10 
        origin-[0]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75 peer-focus:-translate-y-3 '
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
