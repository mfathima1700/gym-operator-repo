"use client"

import Title from "@/components/layout/title"
import Sidebar from "@/components/layout/sidebar"
import { AccountCard } from "@/components/cards/AccountCard";

export default function Login() {
  return (
    <>
   
    <Sidebar />
    <>
    <main className="lg:pr-96">
    <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
    <Title />
    </header>
    <AccountCard />
    </main>
    </>
    </>
  );
}