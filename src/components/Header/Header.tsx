import React from "react";

export default function Header() {
  return (
    <div className="sticky top-0 py-6 px-10 bg-neutral-950 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="font-bold text-2xl text-neutral-200/80 hover:text-neutral-200 cursor-default transition-all duration-200">
            Rate Forge
          </h1>
        </div>
        {/* <div className="flex items-center">
          <Button>
            <div className="flex items-center gap-2">
              <span>Continue</span>
              <i>
                <ChevronRight />
              </i>
            </div>
          </Button>
        </div> */}
      </div>
    </div>
  );
}
