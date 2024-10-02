const apiUrl = 'https://api.bedrinth.com/v2';

export interface SearchPackagesResponse {
  pageIndex: number;
  totalPages: number;
  items: Array<{
    packageManager: 'lip' | 'pip' | 'none';
    source: 'github' | 'pypi';
    identifier: string;
    name: string;
    description: string;
    author: string;
    tags: string[];
    avatarUrl: string | null;
    hotness: number;
    updated: string;
  }>;
}

export interface GetPackageResponse {
  packageManager: 'lip' | 'pip' | 'none';
  source: 'github' | 'pypi';
  identifier: string;
  name: string;
  description: string;
  author: string;
  tags: string[];
  avatarUrl: string | null;
  hotness: number;
  updated: string;
  versions: Array<{
    version: string;
    releasedAt: string;
  }>;
}

export async function searchPackages(
  q?: string,
  perPage?: number,
  page?: number,
  sort?: 'hotness' | 'updated',
  order?: 'asc' | 'desc'
): Promise<SearchPackagesResponse> {
  const url = new URL(apiUrl);
  url.pathname = url.pathname + '/packages';
  if (q !== undefined) {
    url.searchParams.set('q', q);
  }
  if (perPage !== undefined) {
    url.searchParams.set('perPage', perPage.toString());
  }
  if (page !== undefined) {
    url.searchParams.set('page', page.toString());
  }
  if (sort !== undefined) {
    url.searchParams.set('sort', sort);
  }
  if (order !== undefined) {
    url.searchParams.set('order', order);
  }
  const response = await fetch(url);
  return (await response.json()).data;
}

export async function getPackage(
  source: string,
  identifier: string
): Promise<GetPackageResponse> {
  const url = new URL(apiUrl);
  url.pathname = url.pathname + `/packages/${source}/${identifier}`;
  const response = await fetch(url);
  return (await response.json()).data;
}
