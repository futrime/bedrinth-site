'use client';

import type { GetPackageResponse } from '@/lib/api';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState, type JSX } from 'react';

function commandBuilder(pkg: GetPackageResponse,version?:string): string {
  if (pkg.packageManager == 'lip') {
    if (pkg.source == 'github') {
      return `lip install github.com/${pkg.identifier}${version?`@${version}`:''}`;
    }
  } else if (pkg.packageManager == 'pip') {
    if (pkg.source == 'pypi') {
      return `pip install ${pkg.identifier}${version?`==${version}`:''}`;
    }
  }
  return '';
}

function reamMeLinkBuilder(pkg: GetPackageResponse): string {
  if (pkg.packageManager == 'lip') {
    if (pkg.source == 'github') {
      return `https://github.com/${pkg.identifier}`;
    }
  } else if (pkg.packageManager == 'pip') {
    if (pkg.source == 'pypi') {
      return `https://pypi.org/project/${pkg.identifier}`;
    }
  }
  return '';
}

export default function Banner({
  pkg,
}: Readonly<{
  pkg: GetPackageResponse;
}>): JSX.Element {
  const [version, setVersion] = useState<string|undefined>();
  const releaseTimeString = new Date(
    pkg.versions[0].releasedAt
  ).toLocaleString();
  const installCmd = commandBuilder(pkg,version);
  const handleClipboardClick = (): void => {
    navigator.clipboard.writeText(installCmd).catch(() => {
      console.error('Failed to copy to clipboard');
    });

    const clipboardIcon = document.querySelector('.lipweb-clipboard-icon');
    const checkIcon = document.querySelector('.lipweb-check-icon');

    clipboardIcon?.classList.add('hidden');
    checkIcon?.classList.remove('hidden');

    // Reset after 1 second
    setTimeout(() => {
      clipboardIcon?.classList.remove('hidden');
      checkIcon?.classList.add('hidden');
    }, 1000);
  };

  return (
    <div className='py-10 bg-background px-3 text-foreground'>
      <div className='container mx-auto'>
        <div className='flex mt-24'>
          <h1 className='text-2xl mr-3'>{pkg.name}</h1>
          {pkg.tags.map((tag) => (
            <div
              key={tag}
              className='rounded-lg border bg-secondary flex mx-1 px-4 py-1'
            >
              <span>{tag}</span>
            </div>
          ))}
        </div>
        <div className='mt-5'>
          <div className='container mx-auto'>
            <span>{pkg.description}</span>
          </div>
        </div>
        <div className='flex mt-5 text-sm'>
          <span className='mr-2'>Latest Version: {pkg.versions[0].version}</span>
          <span className='mr-2'>|</span>
          <span>Released: {releaseTimeString}</span>
        </div>
        <div className='mt-5 flex justify-start'>
          <select className='flex bg-slate-300 dark:bg-slate-600 p-3 rounded-l-md' onChange={(e)=>{
            setVersion(e.target.value);
          }}>
            {pkg.versions.map(({version}) => (<option key={version} value={version}>{version}</option>))}
          </select>
          <div className='flex bg-slate-200 dark:bg-slate-700 p-3 break-all'>
            <code>{installCmd}</code>
          </div>
          <button
            className='flex bg-slate-300 dark:bg-slate-600 p-3 rounded-r-md hover:bg-slate-400 dark:hover:bg-slate-500 transition'
            onClick={() => handleClipboardClick()}
          >
            <ClipboardIcon className='lipweb-clipboard-icon h-6 w-6' />
            <CheckIcon className='lipweb-check-icon h-6 w-6 hidden' />
          </button>
        </div>
        <Link href={reamMeLinkBuilder(pkg)} className='pt-4 text-blue-400'>
          Go to the source
        </Link>
      </div>
    </div>
  );
}
