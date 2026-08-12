import DocAlgos from '@/components/DocAlgos/DocAlgos';
import DocConfiguration from '@/components/DocConfiguration/DocConfiguration';
import DocIntroduction from '@/components/DocIntroduction/DocIntroduction';
import DocStores from '@/components/DocStores/DocStores';
import React from 'react'

export default async function Docs({ params }: { params: Promise<{ category: string }> }) {

  const category = (await params).category.toLowerCase();

  switch(category){
    case "introduction": 
      return <DocIntroduction/>
    
    case "algorithms":
      return <DocAlgos/>

    case "stores": 
      return <DocStores/>

    case "configuration":
      return <DocConfiguration/>

    default: 
      return <div>Page Not Found</div>
  }
}
