import Image from 'next/image';
import Link from 'next/link';
import Search from './search';

export default function UpperNav() {
    return (
        <nav>
            <div className='container mx-auto flex'>
                <Link href='/' className='flex-none m-1 p-2'>
                    <Image src='/logo.webp' alt='logo' height={50} width={50}
                        className='h-7 w-7' />
                </Link>
                <div className='flex-grow my-auto flex'>
                    <a href='/'><h2 className='my-auto text-lg font-semibold uppercase'>lip Index</h2></a>
                </div>
                <div className='flex-grow mx-2 my-auto'>
                    <Search />
                </div>
            </div>
        </nav>
    )
}
