'use client'

import CNLayout from "@/components/layout/cn-layout"

function classNames(...classes: (string | false | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
  }

  export default function IndividualDashboard() {
 

    return (
      <>
      <CNLayout></CNLayout>
      </>
    )}