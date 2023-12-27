export default async function Description({ description }: Readonly<{
    description: string,
}>) {
    return (
        <div>
            <span>
                {description}
            </span>
        </div>
    )
}
