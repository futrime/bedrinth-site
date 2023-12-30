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

    let sourceUser = user;
    let sourceRepo = repo;
    // if .source is string and match regex /^github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-\.]+$/
    if (typeof lippkgApiData.source === 'string' && /^github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-.]+$/.test(lippkgApiData.source)) {
        const sourceParts = lippkgApiData.source.split('/');
        sourceUser = sourceParts[1];
        sourceRepo = sourceParts[2];
    }

    const readme = await fetchReadme(sourceUser, sourceRepo, version);

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
    const response = await fetch(url);
    const data = await response.json();

    return data.data;
}

async function fetchReadme(user: string, repo: string, version: string): Promise<string> {
    // Encode all parts of the URL.
    const encodedUser = encodeURIComponent(user);
    const encodedRepo = encodeURIComponent(repo);
    const encodedVersion = encodeURIComponent(version);

    const url = `https://cdn.jsdelivr.net/gh/${encodedUser}/${encodedRepo}@${encodedVersion}/README.md`;
    const response = await fetch(url);
    const data = await response.text();

    return data;
}
