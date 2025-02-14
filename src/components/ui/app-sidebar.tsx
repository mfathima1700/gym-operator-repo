"use client"

import * as React from "react"
import {
  House, 
  CalendarDays,
Trophy, 
ChartColumnIncreasing,
Dumbbell,
  BookOpen,
  Bot,
  BicepsFlexed, 
  Command,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/ui/nav-main"
import { NavProjects } from "@/components/ui/nav-projects"
import { NavUser } from "@/components/ui/nav-user"
import { TeamSwitcher } from "@/components/ui/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"



export function AppSidebar({  user, id, ...props }: React.ComponentProps<typeof Sidebar> & { id?: string; user?: any }) {

  // This is sample data.
const data = {
  user: {
    name: "Ri",
    email: "m@example.com",
    avatar: "https://avatars.githubusercontent.com/u/10198767?v=4",
  },
  teams: [
    {
      name: "Gym Example",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Home",
      url: `/individual/${id}`, // "/owner"
      icon: House,
    },
    {
      name: "Gym Schedule",
      url: `/gym/${id}/schedule`,
      icon: Dumbbell,
    },
    {
      name: "Schedule",
      url: `/individual/${id}/schedule`,
      icon: CalendarDays,
    },
    {
      name: "Training Sessions",
      url: `/individual/${id}/sessions`,
      icon: BicepsFlexed,
    },
    {
      name: "Goals",
      url: `/individual/${id}/goals`,
      icon: Trophy,
    },
    {
      name: "Progress",
      url: `/individual/${id}/progress`,
      icon: ChartColumnIncreasing,
    },

  ],
}

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
