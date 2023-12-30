'use client';

import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline'

export default function Banner({ name, description, tags, version, tooth, releaseTime }: Readonly<{
    name: string,
    description: string,
    tags: string[],
    version: string,
    tooth: string,
    releaseTime: number,
}>) {
    const releaseTimeString = new Date(releaseTime).toLocaleString();

    function handleClipboardClick() {
        navigator.clipboard.writeText(`lip install ${tooth}@${version}`);

        const clipboardIcon = document.querySelector('.lipweb-clipboard-icon');
        const checkIcon = document.querySelector('.lipweb-check-icon');

        clipboardIcon?.classList.add('hidden');
        checkIcon?.classList.remove('hidden');

        // Reset after 1 second
        setTimeout(() => {
            clipboardIcon?.classList.remove('hidden');
            checkIcon?.classList.add('hidden');
        }, 1000);
    }

    return (
        <div className='py-10 bg-slate-100 px-3'>
            <div className='container mx-auto'>
                <div className='flex mt-5'>
                    <h1 className='text-2xl mr-3'>
                        {name}
                    </h1>
                    {
                        tags.map(tag => (
                            <div
                                key={tag}
                                className='rounded-full border flex text-gray-500 mx-1 px-2 py-1'
                            >
                                <span>
                                    {tag}
                                </span>
                            </div>
                        ))
                    }
                </div>
                <div className='mt-5'>
                    <div className='container mx-auto'>
                        <span>
                            {description}
                        </span>
                    </div>
                </div>
                <div className='flex mt-5'>
                    <span className='mr-2'>
                        Version: {version}
                    </span>
                    <span className='mr-2'>
                        |
                    </span>
                    <span>
                        Released: {releaseTimeString}
                    </span>
                </div>
                <div className='mt-5 flex justify-start'>
                    <div className='flex bg-slate-200 p-3'>
                        <code>
                            lip install {tooth}@{version}
                        </code>
                    </div>
                    <button
                        className='flex bg-slate-300 p-3'
                        onClick={e => {
                            handleClipboardClick();
                        }}
                    >
                        <ClipboardIcon className='lipweb-clipboard-icon h-6 w-6' />
                        <CheckIcon className='lipweb-check-icon h-6 w-6 hidden' />
                    </button>
                </div>
            </div>
        </div>
    )
}
