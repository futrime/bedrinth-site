'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function Search() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();


    function handleSearch(query: string) {
        const params = new URLSearchParams(searchParams);

        if (query) {
            params.set('q', query);
        } else {
            params.delete('q');
        }
        replace(`/?${params.toString()}`);
    }

    return (
        <>
            <div className='flex'>
                <input
                    type='text'
                    className='w-8/12 ml-auto px-4 bg-gray-200 rounded-md transition-all border-0 focus:ring-2 focus:bg-slate-100 focus:w-full focus:outline-none'
                    placeholder='Search'
                    onChange={e => handleSearch(e.target.value)}
                />
            </div>
        </>
    )
}
