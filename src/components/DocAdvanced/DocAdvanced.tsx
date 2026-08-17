import React from 'react'
import DocContent from '../ui/DocContent'
import { advancedData } from '../../../utils/docAdvanced'
import DocsInfoTemplate2 from '../ui/DocsInfoTemplate2'

export default function DocAdvanced() {
  return (
    <div className='flex flex-col justify-center font-bold'>
        <DocContent title="Advanced" titleClassName='text-5xl' includeHashTag={true}>
            <div className="flex flex-col justify-center">
                <p>The Advanced section covers the design decisions and operational considerations that become important when using Rate Forge in production environments. It explains how to select an appropriate algorithm and storage backend, how Rate Forge processes requests, and what to consider when dealing with performance and concurrent requests.</p>
            </div>
        </DocContent>
        <div className="flex flex-col justify-center my-4 gap-8">
            { advancedData.map((data, index)=>{
                return (
                    <DocsInfoTemplate2 key={index} data={data} titleClassName='text-4xl' includeHashTag={true} />
                )
            }) }
        </div>
    </div>
  )
}
