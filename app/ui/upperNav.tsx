import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { type JSX } from 'react';

import Search from '@/app/ui/search';
import { ModeToggle } from './modeToggle';

export default function UpperNav (): JSX.Element {
  return (
    <nav>
      <div className="container mx-auto flex justify-normal">
        <Link href="/" className="flex-none m-1 p-2">
          <Image
            src="/logo.webp"
            alt="logo"
            height={50}
            width={50}
            className="h-7 w-7"
          />
        </Link>
        <div className="flex-grow my-auto flex">
          <a href="/">
            <h2 className="my-auto text-lg font-semibold uppercase">
              Bedrinth
            </h2>
          </a>
        </div>
        <Suspense>
          <div className="flex-grow mx-2 my-auto">
            <Search />
          </div>
        </Suspense>
        <ModeToggle/>
      </div>
    </nav>
  );
}
