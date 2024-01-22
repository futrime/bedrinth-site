import React, { type JSX } from 'react';

import { searchTooth } from '@/app/lib/lip_index_api';
import pluginCard from './ui/pluginCard';

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
      <div className="container mx-auto px-3 mt-24 pt-4">
        {result.items.map(pluginCard)}
      </div>
    </main>
  );
}
