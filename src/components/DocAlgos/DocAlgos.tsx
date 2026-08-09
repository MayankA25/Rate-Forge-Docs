import React from 'react'
import DocContent from '../ui/DocContent'
import List from '../ui/List'

export default function DocAlgos() {
    const algorithmsOverview = [
        `Fixed Window — Simple and efficient request limiting based on fixed time intervals.`,
        `Sliding Window Log — Precise request tracking using individual request timestamps.`,
        `Sliding Window Counter — A memory-efficient approximation of the sliding window approach.`,
        `Token Bucket — Allows controlled bursts while maintaining a long-term request rate.`,
        `Leaky Bucket — Processes requests at a controlled and consistent rate.`,
        `GCRA — Provides precise rate control using a theoretical arrival-time model.`
    ];
  return (
    <div className='flex flex-col font-bold'>
      <DocContent title="Algorithms Overview" includeHashTag={true} titleClassName='text-5xl'>
        <div className="flex flex-col px-8 gap-4">
            <p>Rate Forge provides multiple rate limiting algorithms, each designed for different traffic patterns and application requirements.</p>
            <p>The algorithms differ in how they track requests, handle bursts, distribute traffic over time, and use storage. Choosing the right algorithm depends on the level of precision, burst tolerance, memory usage, and traffic behavior your application requires.</p>
            <p>Rate Forge currently supports six algorithms:</p>
            <List listArray={algorithmsOverview} listClassName='grid grid-cols-1 gap-5' />
        </div>
      </DocContent>
    </div>
  )
}
