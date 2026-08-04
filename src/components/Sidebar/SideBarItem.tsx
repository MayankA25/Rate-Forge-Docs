"use client";
import { ChevronDown, ChevronRight } from 'lucide-react';
import React, { useState } from 'react'
import Sidebar from './Sidebar';

interface SidebarItem{
    title: string;
    slug: string;
    items?: SidebarItem[]
}

export default function SideBarItem({ item }: { item: SidebarItem }) {

    const [ block, setBlock ] = useState(false);

    const handleClick = ()=>{
        if(!block){
            setBlock(true);
        }
        else{
            setBlock(false);
        }
    }

  return (
    <li className='my-3'>
        <span onClick={item.items && handleClick} className="flex items-center hover:bg-neutral-900 px-3 py-2.5 rounded-lg cursor-pointer w-100">
            {item.items && ( block ? <span><ChevronDown/></span> : <span><ChevronRight/></span> )}
            <span className='font-semibold text-md'>{ item.title }</span>
        </span>
        { item.items && <Sidebar items={item.items} displayBlock={block} /> }
    </li>
  )
}
