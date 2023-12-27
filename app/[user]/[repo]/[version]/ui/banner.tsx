export default async function Banner({ name, tags, version, tooth, releaseTime }: Readonly<{
    name: string,
    tags: string[],
    version: string,
    tooth: string,
    releaseTime: number,
}>) {
    const releaseTimeString = new Date(releaseTime).toLocaleString();

    return (
        <div>
            <div>
                <h1>
                    {name}
                </h1>
                {
                    tags.map(tag => (
                        <span key={tag}>
                            {tag}
                        </span>
                    ))
                }
            </div>
            <div>
                <span>
                    Version: {version}
                </span>
                <span>
                    Released: {releaseTimeString}
                </span>
            </div>
            <div>
                <span>
                    lip install {tooth}@{version}
                </span>
            </div>
        </div>
    )
}
