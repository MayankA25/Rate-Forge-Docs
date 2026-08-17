import React from "react";

export default function Header() {
  return (
    <div className="sticky top-0 z-50 bg-neutral-950 px-10 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="cursor-default text-2xl font-bold text-neutral-200/80 transition-all duration-200 hover:text-neutral-200">
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
