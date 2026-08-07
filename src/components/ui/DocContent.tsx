import React from "react";

export default function DocContent({
  title,
  includeHashTag,
  titleClassName,
  children,
}: {
  title: string;
  includeHashTag?: boolean;
  titleClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center gap-7">
        <div className="flex items-center">
          <h1 className={`cursor-default ${titleClassName ? titleClassName : "text-3xl"} font-extrabold text-neutral-200`}>
           {includeHashTag && <span className="text-neutral-400 transition-all duration-200 hover:text-neutral-200">
              #
            </span>}{" "}
            <span>{title}</span>
          </h1>
        </div>
        { children }
      </div>
    </div>
  );
}
