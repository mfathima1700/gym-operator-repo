'use client'

import Title from "@/components/layout/title";
import Sidebar from "@/components/layout/sidebar";
import { OwnerAccountCard } from "@/components/cards/OwnerAccountCard";

import { useState } from 'react'
import {  Field, Label, Switch } from '@headlessui/react'
import Header from "@/components/layout/header";


function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}


export default function Example() {
 

  return (
    <>
     <Header />

      <div className="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8 ">
        <h1 className="sr-only">General Settings</h1>

        <Sidebar />

        <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
          <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
           <Title />
           <div className="mx-auto">
           <OwnerAccountCard />
           </div>
          
          </div>
        </main>
      </div>
    </>
  )
}
