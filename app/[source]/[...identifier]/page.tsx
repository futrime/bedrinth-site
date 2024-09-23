import { type JSX } from 'react';

import { getPackage } from '@/lib/api';
import { fetchReadme } from '@/lib/readme-fetcher';
import Banner from './ui/banner';
import Readme from './ui/readme';

export default async function Page ({
  params
}: Readonly<{ params: { source: string, identifierList: string[] } }>): Promise<JSX.Element> {
  const identifier = params.identifierList.join('/');
  const pkg = await getPackage(params.source, identifier);
  const readme = await fetchReadme(params.source as 'github' | 'pypi', identifier);

  return (
    <main>
      <Banner
        name={pkg.name}
        description={pkg.description}
        tags={pkg.tags}
        version={''}
        tooth={pkg.repoPath}
        releasedAt={pkg.releasedAt}
      />
      <Readme readme={readme} repoInfo = {params} version={pkg.version}/>
    </main>
  );
}
