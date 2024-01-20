import { type JSX } from 'react';

import { getTooth } from '@/app/lib/lip_index_api';
import { getReadme } from '@/app/lib/jsdelivr';
import Banner from './ui/banner';
import Readme from './ui/readme';

export default async function Page ({
  params
}: Readonly<{ params: { user: string, repo: string, version: string } }>): Promise<JSX.Element> {
  const result = await getTooth(params.user, params.repo, params.version);
  const readme = await getReadme(params.user, params.repo, params.version);

  return (
    <main>
      <Banner
        name={result.name}
        description={result.description}
        tags={result.tags}
        version={result.version}
        tooth={result.repoPath}
        releasedAt={result.releasedAt}
      />
      <Readme readme={readme} />
    </main>
  );
}
