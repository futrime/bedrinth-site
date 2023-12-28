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
            <div className='flex border-2'>
                <input
                    type='text'
                    className='px-4 bg-slate-100'
                    placeholder='Search'
                    onChange={e => handleSearch(e.target.value)}
                />
            </div>
        </>
    )
}
