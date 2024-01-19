import Link from "next/link";
import { fetchToothSearch } from "./lib/tooth_search"
import React from "react";

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
    <main>
        <div className='container mx-auto px-3 mt-24'>
          {
            results.items.map((result) => (
              <React.Fragment key={result.toothRepoPath}>
                <Link href={`/${result.toothRepoOwner}/${result.toothRepoName}/latest`} className='block py-5 mx-2 transition hover:text-blue-600 hover:transition'>
                  <h2 className="font-medium text-lg">{result.name}</h2>
                  <p className="text-sm text-gray-500">{result.description}</p>
                </Link>
                <div className='border-t-2'/>
              </React.Fragment>
            ))
          }
        </div >
      </main>
  )
}
