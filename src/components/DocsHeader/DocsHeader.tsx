"use client";

import { usePathname } from 'next/navigation';
import React from 'react'

export default function DocsHeader() {

  const pathname = usePathname();

  console.log("Pathname: ", pathname);


  const text = pathname.split("/")[pathname.split("/").length - 1];
  console.log("Text: ", text);

  const headerText = text.split("%20").map((el)=>{
    return `${el.at(0)?.toUpperCase()}${el.slice(1)}`;
  }).join(" ");

  return (
    <div className='py-6 px-5 bg-neutral-900 sticky top-0 w-full'>
      <h1 className='font-bold text-xl'>{ headerText }</h1>
    </div>
  )
}
