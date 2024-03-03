import React, { type JSX } from 'react';

import { searchTooth } from '@/app/lib/lip_index_api';
import pluginCard from './ui/pluginCard';
import { Pageination } from './ui/Pagination';

export default async function Page ({
  searchParams
}: Readonly<{
  searchParams?: {
    q?: string
    page?: number
  }
}>): Promise<JSX.Element> {
  const result = await searchTooth(searchParams?.q,void 0,searchParams?.page);
  return (
    <main>
      <div className="container mx-auto px-3 mt-24 pt-4 bg-background text-foreground">
        {result.items.map(pluginCard)}
      </div>
      <Pageination pageIndex={result.pageIndex} totalPages={result.totalPages}/>
    </main>
  );
}
