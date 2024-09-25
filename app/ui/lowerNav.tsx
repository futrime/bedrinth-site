import Link from 'next/link';
import { type JSX } from 'react';

interface TabItem {
  name: string
  href: string
}

const TAB_ITEM_LIST: TabItem[] = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'Documentation',
    href: 'https://docs.lippkg.com/'
  },
];

export default function LowerNav (): JSX.Element {
  return (
    <nav>
      <div className="container mx-auto">
        <ul className="flex">
          {TAB_ITEM_LIST.map(tabItem => (
            <li key={tabItem.href}>
              <Link
                href={tabItem.href}
                className="block mx-1 px-2 py-3 hover:text-blue-600 transition"
              >
                {tabItem.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
