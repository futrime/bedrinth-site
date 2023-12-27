import { fetchToothInfo } from "@/app/lib/data"
import Banner from "./ui/banner"
import Description from "./ui/description"
import Readme from "./ui/readme"

export default async function Page({
  params
}: Readonly<{ params: { user: string, repo: string, version: string } }>) {
  const toothInfo = await fetchToothInfo(params.user, params.repo, params.version)
  return (
    <main>
      <Banner name={toothInfo.info.name} tags={toothInfo.info.tags} version={toothInfo.version}
        tooth={toothInfo.toothRepoPath} releaseTime={toothInfo.releaseTime} />
      <Description description={toothInfo.info.description} />
      <Readme readme={toothInfo.readme} />
    </main>
  )
}
