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
    info: {
        name: string;
        description: string;
        author: string;
        tags: string[];
    },
    readme: string;
}

export async function fetchToothInfo(user: string, repo: string, version: string): Promise<ToothInfo> {
    const lippkgApiData = await fetchFromLippkgApi(user, repo, version);
    const toothJson = await fetchToothJson(user, repo, version);
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
        info: {
            name: toothJson.info.name,
            description: toothJson.info.description,
            author: toothJson.info.author,
            tags: toothJson.info.tags.map((t: string) => t),
        },
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

async function fetchToothJson(user: string, repo: string, version: string): Promise<any> {
    // Encode all parts of the URL.
    const encodedUser = encodeURIComponent(user);
    const encodedRepo = encodeURIComponent(repo);
    const encodedVersion = encodeURIComponent(version);

    const url = `https://cdn.jsdelivr.net/gh/${encodedUser}/${encodedRepo}@${encodedVersion}/tooth.json`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
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
