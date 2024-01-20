export async function getReadme (
  repoOwner: string,
  repoName: string,
  version: string
): Promise<string> {
  const encodedRepoOwner = encodeURIComponent(repoOwner);
  const encodedRepoName = encodeURIComponent(repoName);
  const encodedVersion = encodeURIComponent(version);

  const url = new URL(
    `/gh/${encodedRepoOwner}/${encodedRepoName}@${encodedVersion}/README.md`,
    JSDELIVR_URL
  );

  const response = await fetch(url);
  const data = await response.text();

  return data;
}

const JSDELIVR_URL = 'https://cdn.jsdelivr.net';
