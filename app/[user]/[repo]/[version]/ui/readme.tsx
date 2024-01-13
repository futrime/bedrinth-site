import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';
import RemarkLinkRewrite from "remark-link-rewrite";

export default async function Readme({ readme ,ropeInfo:{user,repo},version }: Readonly<{ readme: string ,ropeInfo:{ user: string, repo: string},version:string}>) {
    const processedReadme = await remark()
        .use(html)
        .use(remarkGfm)
        // .use(RemarkLinkRewrite, {replacer:(url)=>url})
        .use(RemarkLinkRewrite, {
            replacer: (url: string) => {
                if (
                    url.startsWith("http://") ||
                    url.startsWith("https://") ||
                    url.startsWith("#")
                ) {
                    return url;
                } else {
                    const encodedUser = encodeURIComponent(user);
                    const encodedRepo = encodeURIComponent(repo);
                    const encodedVersion = encodeURIComponent(version);
                    return `https://github.com/${encodedUser}/${encodedRepo}/blob/v${encodedVersion}/${url}`;
                }
            },
        })
        .process(readme);
    const contentHtml = processedReadme.toString();

    return (
        <div className='py-10 px-3'>
            <div
                className='container mx-auto prose'
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
        </div>
    )
}
