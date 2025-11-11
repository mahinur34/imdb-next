"use client"

import {MdLightMode, MdDarkMode} from 'react-icons/md'
import {useTheme} from 'next-themes'
import { useEffect, useState } from 'react';

export default function DarkModeSwitch() {

  const [mounted, setMounted] = useState(false);
  const {theme, setTheme, systemTheme} = useTheme();

  useEffect(()=> {
    setMounted(true);
  },[]);

  if(!mounted) return null;
  const currentTheme = theme ==='system' ? systemTheme : theme;
  return (
    <div>
      {mounted && 
       ( currentTheme === 'dark' ? (
          <MdLightMode 
          onClick={()=> setTheme('light')}
          className='text-xl cursor-pointer hover:text-amber-500'/>
        ) 
        : 
        (<MdDarkMode 
          onClick={()=>setTheme('dark')}
          className='text-xl cursor-pointer hover:text-amber-500'/>)
      )}
    </div>
  )
}
