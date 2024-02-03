export interface GetToothResult {
  repoPath: string
  repoOwner: string
  repoName: string
  version: string
  releasedAt: string
  name: string
  description: string
  author: string
  tags: string[]
  avatarUrl: string | null
  repoCreatedAt: string
  starCount: number
  versions: Array<{ version: string, releasedAt: string }>
}

export interface SearchToothResult {
  pageIndex: number
  totalPages: number
  items: Array<{
    repoPath: string
    repoOwner: string
    repoName: string
    latestVersion: string
    latestVersionReleasedAt: string
    name: string
    description: string
    author: string
    tags: string[]
    avatarUrl: string | null
    repoCreatedAt: string
    starCount: number
  }>
}

export type SearchToothOrder = 'ascending' | 'descending'

export type SearchToothSort = 'createdAt' | 'starCount' | 'updatedAt'

export async function getTooth (
  repoOwner: string,
  repoName: string,
  version: string
): Promise<GetToothResult> {
  const encodedRepoOwner = encodeURIComponent(repoOwner);
  const encodedRepoName = encodeURIComponent(repoName);
  const encodedVersion = encodeURIComponent(version);

  const url = new URL(
    `/teeth/${encodedRepoOwner}/${encodedRepoName}/${encodedVersion}`,
    LIP_INDEX_API_URL
  );

  const response = await fetch(url);
  const data = await response.json();

  return data.data;
}

export async function searchTooth (
  q: string | undefined = undefined,
  perPage: number | undefined = undefined,
  page: number | undefined = undefined,
  sort: SearchToothSort | undefined = undefined,
  order: SearchToothOrder | undefined = undefined
): Promise<SearchToothResult> {
  const params = new URLSearchParams();
  if (q !== undefined) {
    params.append('q', q);
  }
  if (perPage !== undefined) {
    params.append('perPage', perPage.toString());
  }
  if (page !== undefined) {
    params.append('page', page.toString());
  }
  if (sort !== undefined) {
    params.append('sort', sort);
  }
  if (order !== undefined) {
    params.append('order', order);
  }

  const url = new URL('/search/teeth', LIP_INDEX_API_URL);
  url.search = params.toString();

  const response = await fetch(url, { cache: 'no-store' });
  const data = await response.json();

  return data.data;
}

const LIP_INDEX_API_URL = 'https://api.lippkg.com';
