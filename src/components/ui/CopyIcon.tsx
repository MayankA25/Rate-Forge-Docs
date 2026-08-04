"use client";
import { Check, Copy } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function CopyIcon({ text }: { text: string }) {

  const [copy, setCopy] = useState(false);


  return (
    <i className='text-neutral-700 hover:text-neutral-200 transition-all duration-200 cursor-pointer' onClick={()=>{
      setCopy(true);
      navigator.clipboard.writeText(text);
      toast.success("Copied!", {
        className:
          "!bg-neutral-100 dark:!bg-neutral-800 dark:!text-white !font-bold !shadow-xl",
      });
      setTimeout(()=>{
        setCopy(false);
      }, 2000)
    }}>
        {copy ? <Check className='size-5'/> : <Copy className='size-5'/>}
    </i>
  )
}
