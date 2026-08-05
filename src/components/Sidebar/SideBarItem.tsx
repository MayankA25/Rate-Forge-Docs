"use client";
import { ChevronDown, ChevronRight } from 'lucide-react';
import React, { useState } from 'react'
import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface SidebarItem{
    title: string;
    slug: string;
    items?: SidebarItem[]
}

export default function SideBarItem({ item, isChildren }: { item: SidebarItem, isChildren?: boolean }) {

    const [ block, setBlock ] = useState(false);

    const handleClick = ()=>{
        if(!block){
            setBlock(true);
        }
        else{
            setBlock(false);
        }
    }

    const pathname = usePathname();

    const extractedTitle = pathname.split("/")[pathname.split("/").length-1];

    console.log(extractedTitle);

  return (
    <li className='my-3'>
        <Link href={!isChildren ? `/docs/${item.title.toLowerCase()}` :""} onClick={item.items && handleClick} className={`flex items-center ${extractedTitle == item.title.toLowerCase() ? "bg-neutral-900" : ""} hover:bg-neutral-900 px-3 py-2.5 rounded-lg cursor-pointer w-90`}>
            {item.items && ( block ? <span><ChevronDown/></span> : <span><ChevronRight/></span> )}
            <span className='font-semibold text-md'>{ item.title }</span>
        </Link>
        { item.items && <Sidebar items={item.items} displayBlock={block} isChildren={true} /> }
    </li>
  )
}
