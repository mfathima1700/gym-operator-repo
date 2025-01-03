'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from '@headlessui/react'

import {Bars3Icon,
  BellIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  HomeIcon,CubeIcon,
  ChartBarIcon,
  TrophyIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

interface NavigationItem {
  name: string
  href: string
  icon: React.ElementType
  current: boolean
}


const secondaryNavigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'Schedule', href: '#', icon: CalendarDaysIcon, current: false },
  { name: 'Training Sessions', href: '#', icon: BellIcon, current: false },
  { name: 'Goals', href: '#', icon: TrophyIcon, current: false },
  { name: 'Progress', href: '#', icon: ChartBarIcon, current: false },
  { name: 'Settings', href: '#', icon: UserCircleIcon, current: false },

]

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
    <aside className="flex overflow-x-auto border-b  py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
          <nav className="flex-none px-4 sm:px-6 lg:px-0">
            <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
              {secondaryNavigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                      'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm/6 font-semibold',
                    )}
                  >
                    <item.icon
                      aria-hidden="true"
                      className={classNames(
                        'size-6 shrink-0',
                      )}
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
    </>
  )
}
