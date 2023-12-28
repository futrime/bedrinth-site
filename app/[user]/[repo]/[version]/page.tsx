import { fetchToothInfo } from "@/app/lib/tooth_info"
import Banner from "./ui/banner"
import Readme from "./ui/readme"

export default async function Page({
    params
}: Readonly<{ params: { user: string, repo: string, version: string } }>) {
    const toothInfo = await fetchToothInfo(params.user, params.repo, params.version)
    return (
        <>
            <main>
                <Banner
                    name={toothInfo.name}
                    description={toothInfo.description}
                    tags={toothInfo.tags}
                    version={toothInfo.version}
                    tooth={toothInfo.toothRepoPath}
                    releaseTime={toothInfo.releaseTime}
                />
                <Readme readme={toothInfo.readme} />
            </main>
        </>
    )
}
