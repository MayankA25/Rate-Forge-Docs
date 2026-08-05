"use client";

import Algorithms from '@/components/Algorithms/Algorithms';
import DocIntroduction from '@/components/DocIntroduction/DocIntroduction';
import Stores from '@/components/Stores/Stores';
import { usePathname } from 'next/navigation';
import React from 'react'

const pages = {
  "introduction": <DocIntroduction/>
}

export default function Docs() {

  const pathname = usePathname();

 const key = pathname.split("/").pop() as keyof typeof pages;

  return (
    <div className='w-full py-3'>
      { pages[key] ? pages[key] : <div>Page Not Found</div> }
    </div>
  )
}
