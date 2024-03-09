import cheerio from 'cheerio';

export async function getReadme(
  repoOwner: string,
  repoName: string,
  version: string
): Promise<string> {
  const encodedRepoOwner = encodeURIComponent(repoOwner);
  const encodedRepoName = encodeURIComponent(repoName);
  const encodedVersion = encodeURIComponent(version);

  const readmeUrls = [new URL(
    `/${encodedRepoOwner}/${encodedRepoName}/v${encodedVersion}/README.md`,
    GITHUB_RAW_URL
  ), new URL(
    `/${encodedRepoOwner}/${encodedRepoName}/v${encodedVersion}/readme.md`,
    GITHUB_RAW_URL
  )];

  try {
    for (const readmeUrl of readmeUrls) {
      const response = await fetch(readmeUrl);
      if (response.ok) {
        return await response.text();
      }
    }

    const repoDirectoryUrl = new URL(
      `/gh/${encodedRepoOwner}/${encodedRepoName}@${encodedVersion}/`,
      JSDELIVR_URL);

    let response = await fetch(repoDirectoryUrl);
    const html = await response.text();

    const $ = cheerio.load(html);

    let readmePath = '';
    $('a').each((_, element) => {
      const href = $(element).attr('href');
      if (href && href.toLowerCase().includes('readme.md')) {
        readmePath = href;
        return false;
      }
    });

    if (!readmePath) {
      return '';
    }

    const readmeUrl = new URL(readmePath, JSDELIVR_URL);
    response = await fetch(readmeUrl);
    return await response.text();
  } catch (error) {
    console.error('Error fetching README:', error);
    return '';
  }
}

const GITHUB_RAW_URL = 'https://raw.githubusercontent.com';
const JSDELIVR_URL = 'https://cdn.jsdelivr.net';