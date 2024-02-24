'use client';
import { useTheme } from 'next-themes';
import { SunIcon,MoonIcon } from '@heroicons/react/24/outline';

export function ModeToggle() {
  const { resolvedTheme,setTheme } = useTheme();
  return <button className='items-center h-9 w-9 p-1 my-auto rounded-md hover:bg-primary-foreground cursor-pointer'
    onClick={()=> setTheme(resolvedTheme=='dark'?'light':'dark')}
  >
    {resolvedTheme=='dark'?
      (<MoonIcon />):
      (<SunIcon />)
    }
  </button>;
}