import React from 'react'
import Introduction from '../Introduction/Introduction'
import IntroCode from '../IntroCode/IntroCode'
import Algorithms from '../Algorithms/Algorithms'
import Stores from '../Stores/Stores'

export default function Hero() {
  return (
    <div>
      <Introduction/>
      <IntroCode/>
      <Algorithms/>
      <Stores/>
    </div>
  )
}
