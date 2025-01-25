"use client";

import CNLayout from "@/components/layout/cn-layout";
import OldGoalsList from "@/components/goals/OldGoalsList";
import NewGoalsList from "@/components/goals/NewGoalsList"

export default function Members() {
  return (
    <>
      <CNLayout>
      <div className="flex h-full">

        

{/* Content area */}
<div className="flex flex-1 flex-col overflow-hidden">
  

  {/* Main content */}
  <div className="flex flex-1 items-stretch overflow-hidden">
    <main className="flex-1 overflow-y-auto">
      {/* Primary column */}
      <section aria-labelledby="primary-heading" className="flex h-full min-w-0 flex-1 flex-col lg:order-last px-4">
        <h1 id="primary-heading" className="sr-only">
          Photos
        </h1>
        {/* Your content */}
        <NewGoalsList/>
      </section>
    </main>

    {/* Secondary column (hidden on smaller screens) */}
    <aside className="hidden w-96 overflow-y-auto  lg:block px-4">
      {/* Your content */}

      <OldGoalsList/>
    </aside>
  </div>
</div>
</div>
      </CNLayout>
      </>
  )}