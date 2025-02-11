"use client";

import MemberCards from "@/components/members/MemberCards"
import CNLayout from "@/components/layout/cn-layout";
import { PaginationDemo } from "@/components/layout/PaginationDemo";
import MemberOptions from "@/components/members/MemberOptions";
import CNMemberOptions from "@/components/members/CNMemberOptions"

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Members() {
  return (
    <>
      <CNLayout>
        <div className="py-8 space-y-8">
          {/* <MemberOptions /> */}
          <CNMemberOptions/>
         <MemberCards />

          <PaginationDemo />
        </div>
      </CNLayout>
    </>
  );
}
