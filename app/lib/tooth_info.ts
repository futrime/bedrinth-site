export interface ToothInfo {
    toothRepoPath: string;
    toothRepoOwner: string;
    toothRepoName: string;
    version: string;
    releaseTime: number;
    versions: {
        version: string;
        releaseTime: number;
    }[];
    name: string;
    description: string;
    author: string;
    tags: string[];
    hotness: number;
    readme: string;
}

export async function fetchToothInfo(user: string, repo: string, version: string): Promise<ToothInfo> {
    const lippkgApiData = await fetchFromLippkgApi(user, repo, version);
    const readme = await fetchReadme(user, repo, version);

    return {
        toothRepoPath: lippkgApiData.toothRepoPath,
        toothRepoOwner: lippkgApiData.toothRepoOwner,
        toothRepoName: lippkgApiData.toothRepoName,
        version: lippkgApiData.version,
        releaseTime: lippkgApiData.releaseTime * 1000, // Convert to milliseconds.
        versions: lippkgApiData.versions.map((v: { version: string; releaseTime: number }) => {
            return {
                version: v.version,
                releaseTime: v.releaseTime,
            };
        }),
        name: lippkgApiData.name,
        description: lippkgApiData.description,
        author: lippkgApiData.author,
        tags: lippkgApiData.tags.map((t: string) => t),
        hotness: lippkgApiData.hotness,
        readme,
    };
}

async function fetchFromLippkgApi(user: string, repo: string, version: string): Promise<any> {
    // Encode all parts of the URL.
    const encodedUser = encodeURIComponent(user);
    const encodedRepo = encodeURIComponent(repo);
    const encodedVersion = encodeURIComponent(version);

    const url = `https://api.lippkg.com/teeth/${encodedUser}/${encodedRepo}/${encodedVersion}`;
    const response = await fetch(url, { cache: 'no-store' });
    const data = await response.json();

    return data.data;
}

async function fetchReadme(user: string, repo: string, version: string): Promise<string> {
    // Encode all parts of the URL.
    const encodedUser = encodeURIComponent(user);
    const encodedRepo = encodeURIComponent(repo);
    const encodedVersion = encodeURIComponent(version);

    const url = `https://cdn.jsdelivr.net/gh/${encodedUser}/${encodedRepo}@${encodedVersion}/README.md`;
    const response = await fetch(url, { cache: 'no-store' });
    const data = await response.text();

    return data;
}
