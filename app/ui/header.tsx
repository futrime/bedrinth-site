import { type JSX } from 'react';

import LowerNav from './lowerNav';
import UpperNav from './upperNav';

export default function Header (): JSX.Element {
  return (
    <header className="shadow-md fixed top-0 left-0 right-0 bg-background">
      <UpperNav />
      <LowerNav />
    </header>
  );
}
