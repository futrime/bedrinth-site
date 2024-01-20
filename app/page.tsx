import Link from 'next/link';
import React, { type JSX } from 'react';

import { searchTooth } from '@/app/lib/lip_index_api';

export default async function Page ({
  searchParams
}: Readonly<{
  searchParams?: {
    q?: string
  }
}>): Promise<JSX.Element> {
  const result = await searchTooth(searchParams?.q);

  return (
    <main>
      <div className="container mx-auto px-3 mt-24">
        {result.items.map(result => (
          <React.Fragment key={result.repoPath}>
            <Link
              href={`/${result.repoOwner}/${result.repoName}/${result.latestVersion}`}
              className="block py-5 mx-2 transition hover:text-blue-600 hover:transition"
            >
              <h2 className="font-medium text-lg">{result.name}</h2>
              <p className="text-sm text-gray-500">{result.description}</p>
            </Link>
            <div className="border-t-2" />
          </React.Fragment>
        ))}
      </div>
    </main>
  );
}
