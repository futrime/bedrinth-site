import Link from 'next/link';
import React from 'react';
import {
  CalendarDaysIcon,
  InboxArrowDownIcon,
  CodeBracketSquareIcon,
  FireIcon
} from '@heroicons/react/16/solid';
import type { SearchPackagesResponse } from '../../lib/api';
import { GithubIcon, PypiIcon } from './icons';

type ResultItem = SearchPackagesResponse['items'][number];
export default function pluginCard(result: ResultItem) {
  return (
    <React.Fragment key={result.identifier}>
      <Link
        href={`/${result.source}/${result.identifier}`}
        className='flex flex-col lg:flex-row rounded-xl border bg-card text-card-foreground shadow my-2 hover:bg-primary-foreground'
      >
        <div className='flex-grow px-3 pb-2'>
          <div className='flex flex-col mp:flex-row space-y-1.5 pt-3 pb-1'>
            <h2 className='font-medium text-lg flex flex-col '>
              {result.name}
            </h2>
            <p className='pl-3 text-sm'>by {result.author}</p>
          </div>
          <p className='text-sm pb-1'>{result.description}</p>
          {result.tags.map((tag) => (
            <div
              key={tag}
              className='inline-flex items-center rounded-md px-2.5 py-0.5 mx-0.5 text-xs text-secondary-foreground font-semibold bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
            >
              {tag}
            </div>
          ))}
        </div>
        <div className='p-2 flex flex-row pl-3 lg:pl-0 lg:flex-col lg:basis-40 text-sm text-secondary-foreground'>
          <p className='flex flex-row mr-4 lg:mr-0'>
            <CalendarDaysIcon className='h-5 mr-1 sm:mr-3' />
            {new Date(result.updated).toLocaleDateString()}
          </p>
          <p className='flex flex-row mr-4 lg:mr-0'>
            <InboxArrowDownIcon className='h-5 mr-1 sm:mr-3' />
            {result.packageManager}
          </p>
          <p className='flex flex-row mr-4 lg:mr-0'>
            <CodeBracketSquareIcon className='h-5 mr-1 sm:mr-3' />
            {result.source}
            {result.source == 'github' ? (
              <GithubIcon className='pl-1 h-5 mr-1 sm:mr-3'/>
            ) : result.source == 'pypi' ? (
              <PypiIcon className='pl-1 h-5 mr-1 sm:mr-3'/>
            ) : (
              <></>
            )}
          </p>
          <p className='flex flex-row mr-4 lg:mr-0'>
            <FireIcon className='h-5 mr-1 sm:mr-3' />
            {result.hotness}
          </p>
        </div>
      </Link>
    </React.Fragment>
  );
}
