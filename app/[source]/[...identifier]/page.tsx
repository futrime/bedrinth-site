import { type JSX } from 'react';

import { getPackage } from '@/lib/api';
import { fetchReadme } from '@/lib/readme-fetcher';
import Banner from './ui/banner';
import Readme from './ui/readme';

export default async function Page({
  params,
}: Readonly<{
  params: { source: string; identifier: string[] };
}>): Promise<JSX.Element> {
  const identifier = params.identifier.join('/');
  const pkg = await getPackage(params.source, identifier);
  const readme = await fetchReadme(
    params.source as 'github' | 'pypi',
    identifier
  );

  return (
    <main>
      <Banner pkg={pkg} />
      <Readme readme={readme} pkg={pkg} />
    </main>
  );
}
