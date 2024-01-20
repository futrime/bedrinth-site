import { type JSX } from 'react';

import { inter } from '@/app/ui/fonts';
import './ui/global.css';
import Header from './ui/header';

export default function Layout ({
  children
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased h-screen flex flex-col`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
