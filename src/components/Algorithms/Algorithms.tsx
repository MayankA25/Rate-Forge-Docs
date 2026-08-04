import React from 'react'
import { algorithms } from '../../../utils/algorithms'
import AlgoCard from '../ui/AlgoCard'
import CardContent from '../CardContent/CardContent'

export default function Algorithms() {

    

  return (
    <div className='flex flex-col justify-center gap-5 pb-10'>
      <h1 className='font-extrabold text-3xl'>Algorithms</h1>

      <div className="grid grid-cols-2 gap-3">
        { algorithms.map((algorithm, index)=>{
          return (
            <CardContent key={algorithm.id} title={algorithm.title} content={algorithm.shortDescription} timeComplexity={algorithm.complexity} bestForContent={algorithm.bestFor}/>
          )
        }) }
      </div>
    </div>
  )
}
