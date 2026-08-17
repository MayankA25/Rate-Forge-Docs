import React from "react";
import DocContent from "../ui/DocContent";
import { examples } from "../../../utils/docExamples";
import DocsInfoTemplate2 from "../ui/DocsInfoTemplate2";

export default function DocExamples() {
  return (
    <div className="flex flex-col justify-center font-bold">
      <DocContent
        title="Examples"
        titleClassName="text-5xl"
        includeHashTag={true}
      >
        <div className="flex flex-col justify-center gap-3">
          <p>
            The Examples section demonstrates how Rate Forge can be integrated
            into common application architectures and storage environments.
          </p>
          <p>
            Each example focuses on a practical use case rather than explaining
            the underlying API. You can use these examples as a starting point
            and adapt the configuration to your application&apos;s requirements.
          </p>
        </div>
      </DocContent>
      <div className="flex flex-col justify-center my-5">

      { examples.map((example, index)=>{
          return (
              <DocContent key={index} title={example.title} titleClassName="text-5xl mt-5" includeHashTag={true} >
                { example.data.map((dat, index2)=>{
                    return (
                        <DocsInfoTemplate2 key={index2} data={dat} />
                    )
                }) }
            </DocContent>
        )
    }) }
    </div>
    </div>
  );
}
