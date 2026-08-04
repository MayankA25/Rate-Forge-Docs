import React from "react";
import SideBarItem from "./SideBarItem";

interface Items{
    title: string;
    slug: string;
    items?: Items[]
}

export default function Sidebar({ items, displayBlock }: { items: Items[], displayBlock?: boolean }) {
  return (
    <div className="h-full px-5">
      <ul className={`${displayBlock ? "block" : "hidden"} px-3 transition-all duration-200`}>
        {items.map((sidebarItem, index) => {
          return <SideBarItem key={index} item={sidebarItem} />;
        })}
      </ul>
    </div>
  );
}
