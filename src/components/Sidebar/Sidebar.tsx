import React from "react";
import SideBarItem from "./SideBarItem";

interface Items{
    title: string;
    slug: string;
    items?: Items[]
}

export default function Sidebar({ items, displayBlock, isChildren }: { items: Items[]; displayBlock?: boolean; isChildren: boolean}) {
  return (
    <div className="h-full">
      <ul className={`${displayBlock ? "block" : "hidden"} px-3 transition-all duration-200`}>
        {items.map((sidebarItem, index) => {
          return <SideBarItem key={index} item={sidebarItem} isChildren={isChildren} />;
        })}
      </ul>
    </div>
  );
}
