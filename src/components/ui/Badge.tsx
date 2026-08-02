import React from 'react'

export default function Badge({ text }: { text: string }) {
  return (
    <span className='bg-neutral-900 font-bold text-sm px-3 py-1 rounded-md'>
      { text }
    </span>
  )
}
