export interface ToothSearch {
    pageIndex: number;
    totalPages: number;
    items: {
        toothRepoPath: string;
        toothRepoOwner: string;
        toothRepoName: string;
        latestVersion: string;
        latestVersionReleaseTime: number;
        name: string;
        description: string;
        author: string;
        tags: string[];
        hotness: number;
    }[]
}

export async function fetchToothSearch(query: string): Promise<ToothSearch> {
    const lippkgApiData = await fetchFromLippkgApi(query);

    return {
        pageIndex: lippkgApiData.pageIndex,
        totalPages: lippkgApiData.totalPages,
        items: lippkgApiData.items.map((item: {
            toothRepoPath: string;
            toothRepoOwner: string;
            toothRepoName: string;
            latestVersion: string;
            latestVersionReleaseTime: number;
            name: string;
            description: string;
            author: string;
            tags: string[];
            hotness: number;
        }) =>
        ({
            toothRepoPath: item.toothRepoPath,
            toothRepoOwner: item.toothRepoOwner,
            toothRepoName: item.toothRepoName,
            latestVersion: item.latestVersion,
            latestVersionReleaseTime: item.latestVersionReleaseTime * 1000, // Convert to milliseconds.
            name: item.name,
            description: item.description,
            author: item.author,
            tags: item.tags.map((t: string) => t),
            hotness: item.hotness,
        })
        ),
    };
}

async function fetchFromLippkgApi(query: string): Promise<any> {
    // Encode all parts of the URL.
    const encodedQuery = encodeURIComponent(query);

    const url = `https://api.lippkg.com/search/teeth?q=${encodedQuery}`;
    const response = await fetch(url, { cache: 'no-store' });
    const data = await response.json();

    return data.data;
}
