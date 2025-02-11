'use client'

import CNLayout from "@/components/layout/cn-layout"
import {IndividualAccountCard} from "@/components/create/IndividualAccountCard"

function classNames(...classes: (string | false | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
  }

  export default function CreateAccountOwner() {
 

    return (
      <>
      <CNLayout>
        <div className="mx-auto py-8 ">
        <IndividualAccountCard />
        </div>
      </CNLayout>
      
      </>
    )}