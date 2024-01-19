import Link from 'next/link';

interface TabItem {
    name: string
    href: string
}

const TAB_ITEM_LIST: TabItem[] = [
    {
        name: 'Basics',
        href: 'https://docs.lippkg.com/',
    },
    {
        name: 'Tutorials',
        href: 'https://docs.lippkg.com/tutorials/create_a_lip_tooth.html',
    },
    {
        name: 'Commands',
        href: 'https://docs.lippkg.com/commands/lip.html',
    },
    {
        name: 'Packages',
        href: '/'
    },
]

export default function LowerNav() {
    return (
        <nav>
            <div className='container mx-auto'>
                <ul className='flex'>
                    {TAB_ITEM_LIST.map((tabItem, index) => (
                        <li key={index}>
                            <Link href={tabItem.href} className="block mx-1 px-2 py-3 hover:text-blue-600 transition">
                                {tabItem.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}
