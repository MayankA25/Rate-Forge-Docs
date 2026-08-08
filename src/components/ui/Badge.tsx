import React from 'react'

export default function Badge({ text, className }: { text: string, className?: string }) {
  return (
    <span className={`bg-neutral-800 font-bold ${className ? className : "text-sm"} px-3 py-1 rounded-md`}>
      { text }
    </span>
  )
}
