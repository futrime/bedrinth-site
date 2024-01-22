import Link from 'next/link';
import React from 'react';
import { UserIcon, TagIcon, CalendarDaysIcon, StarIcon } from '@heroicons/react/16/solid';
import { SearchToothResult } from '../lib/lip_index_api';

type ResultItem = SearchToothResult['items'][number]
export default function pluginCard(result: ResultItem) {
  return (
    <React.Fragment key={result.repoPath}>
      <Link
        href={`/${result.repoOwner}/${result.repoName}/${result.latestVersion}`}
        className='flex flex-col lg:flex-row rounded-xl border bg-card text-card-foreground shadow my-2 hover:bg-slate-200'
      >
        <div className='flex-grow px-3'>
          <h2 className="font-medium text-lg flex flex-col space-y-1.5 pt-3 pb-1">{result.name}</h2>
          <p className="text-sm text-gray-500 pb-1">{result.description}</p>
          {result.tags.map(tag=>(
            <div key={tag} className='inline-flex items-center rounded-md border px-2.5 py-0.5 mx-0.5 text-xs font-semibold bg-slate-400 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'>
              {tag}
            </div>
          ))}
        </div>
        <div className='p-2 flex flex-row pl-3 lg:pl-0 lg:flex-col lg:basis-40 text-sm text-slate-600'>
          <p className='flex flex-row mr-4 lg:mr-0'><UserIcon className='h-5 mr-1 sm:mr-3' />
            {result.author}
          </p>
          <p className='flex flex-row mr-4 lg:mr-0'><StarIcon className='h-5 mr-1 sm:mr-3' />
            {result.sourceRepoStarCount}
          </p>
          <p className='flex flex-row mr-4 lg:mr-0'><TagIcon className='h-5 mr-1 sm:mr-3' />
            {result.latestVersion}
          </p>
          <p className='flex flex-row invisible min-[452px]:visible'><CalendarDaysIcon className='h-5 mr-1 sm:mr-3' />
            {new Date(result.latestVersionReleasedAt).toLocaleDateString()}
          </p>
        </div>
      </Link>
    </React.Fragment>
  );
}
