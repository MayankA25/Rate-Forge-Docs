import DocAlgos from '@/components/DocAlgos/DocAlgos';
import DocIntroduction from '@/components/DocIntroduction/DocIntroduction';
import React from 'react'

export default async function Docs({ params }: { params: Promise<{ category: string }> }) {

  const category = (await params).category.toLowerCase();

  switch(category){
    case "introduction": 
      return <DocIntroduction/>
    
    case "algorithms":
      return <DocAlgos/>

    default: 
      return <div>Page Not Found</div>
  }
}
