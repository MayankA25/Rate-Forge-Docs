import React from 'react'

export default function MainComponent({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-[80%] mx-auto'>
      { children }
    </div>
  )
}
