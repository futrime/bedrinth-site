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
                <div className='flex-grow m-1 flex'>
                    <span className='my-auto'>lip Index</span>
                </div>
                <div className='flex-none m-1 flex'>
                    <Search />
                </div>
            </div>
        </nav>
    )
}
