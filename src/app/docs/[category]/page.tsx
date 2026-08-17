import DocAdvanced from '@/components/DocAdvanced/DocAdvanced';
import DocAlgos from '@/components/DocAlgos/DocAlgos';
import DocAPIReference from '@/components/DocAPIReference/DocAPIReference';
import DocConfiguration from '@/components/DocConfiguration/DocConfiguration';
import DocExamples from '@/components/DocExamples/DocExamples';
import DocGuide from '@/components/DocGuide/DocGuide';
import DocIntroduction from '@/components/DocIntroduction/DocIntroduction';
import DocStores from '@/components/DocStores/DocStores';
import FAQs from '@/components/FAQs/FAQs';
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

    case "guides":
      return <DocGuide/>

    case "api%20reference":
      return <DocAPIReference/>

    case "examples":
      return <DocExamples/>

    case "advanced":
      return <DocAdvanced/>

    case "faqs":
      return <FAQs/>

    default: 
      return <div>Page Not Found</div>
  }
}
