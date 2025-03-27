"use client"

import * as React from "react"
import {
  House, 
  CalendarDays,
Trophy, 
ChartColumnIncreasing,
Dumbbell,
  Apple,
  UsersRound,
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



export function AppSidebar({  user, id, ...props }: React.ComponentProps<typeof Sidebar> & { id?: string; user?: {
  name:string, 
  email: string,
  image:string,
  gymRole:string
  gym:{
    name:string,
    logo:string,
    description:string
  }
} }) {

  // This is sample data.
const data = {
  user: {
    name: user?.name ? user.name : "Unnamed user",
    email: user?.email ? user.email : "Email not set",
    avatar: user?.image ? user.image : "https://avatars.githubusercontent.com/u/10198767?v=4",
  },
  teams: [
    {
      name: user?.gym?.name ?? "Gym",
      logo: user?.gym?.logo ?? "",
      plan: user?.gym?.description ?? "A gym",
    },
  ],
  projects: [
    {
      name: "Home",
      url:  user?.gymRole === "OWNER" ? `/owner/${id}` : `/individual/${id}`, // "/owner"
      icon: House,
    },
    {
      name: "Gym Schedule",
      url: `/gym/${id}/schedule`,
      icon: Dumbbell,
    },
    {
      name: "My Classes",
      url: `/individual/${id}/schedule`,
      icon: CalendarDays,
    },
    {
      name: "Goals",
      url: `/individual/${id}/goals`,
      icon: Trophy,
    },
    {
      name: "Fitness & Nutrition Tracker",
      url: `/individual/${id}/tracker`,
      icon: Apple,
    },

  ],
}

/*navMain: [
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
],*/

if(user?.gymRole === "OWNER"){

  data.projects.push({
    name: "Members",
    url: `/owner/${id}/members`,
    icon: UsersRound,
  });
}




  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher gym={user?.gym}/>
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
