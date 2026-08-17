import React from "react";
import DocContent from "../ui/DocContent";
import { faqs } from "../../../utils/docFaqs";
import Accordion from "../ui/Accordion";

export default function FAQs() {
  return (
    <div className="flex flex-col justify-center font-bold">
      <DocContent
        title="Frequently Asked Questions"
        titleClassName="text-5xl"
        includeHashTag={true}
      >
        <div className="flex flex-col justify-center gap-8">
          <p>
            This section answers common questions about configuring,
            integrating, and deploying Rate Forge
          </p>
          <div className="flex flex-col justify-center">
            {faqs.map((faq, index) => {
              return (
                <Accordion
                  key={index}
                  data={[{ title: faq.question, content: faq.answer }]}
                />
              );
            })}
          </div>
        </div>
      </DocContent>
    </div>
  );
}
