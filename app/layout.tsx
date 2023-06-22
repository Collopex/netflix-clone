import React from 'react';
import './globals.css';

import { Roboto } from 'next/font/google';
import ToasterProvider from './provider/ToasterProvider';
import ClientOnly from './components/ClientOnly';

export const metadata = {
  title: 'Netflix',
  description: 'netflix.com',
};

type RootProp = {
  children: React.ReactNode;
};

const font = Roboto({
  subsets: ['latin'],
  weight: '400',
});

export default async function RootLayout({ children }: RootProp) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
        </ClientOnly>
        <div className='h-full'>{children}</div>
      </body>
    </html>
  );
}
