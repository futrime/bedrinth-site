import Link from "next/link";
import { fetchToothSearch } from "./lib/tooth_search"

export default async function Page({
  searchParams,
}: Readonly<{
  searchParams?: {
    q?: string;
  };
}>) {
  const query = searchParams?.q ?? ""
  const results = await fetchToothSearch(query)

  return (
    <>
      <main>
        <div className='container mx-auto'>
          {
            results.items.map((result) => (
              <>
                <Link href={`/${result.toothRepoOwner}/${result.toothRepoName}/latest`} className='block py-5'>
                  <h2>{result.name}</h2>
                  <p>{result.description}</p>
                </Link>
                <div className='border-t-2'/>
              </>
            ))
          }
        </div >
      </main>
    </>
  )
}
