"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";
import {

  Command,
} from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface Gym {
  name?: string;
  logo?: string;
  description?: string;
}

export function TeamSwitcher({ gym }: { gym?: Gym }) {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            {gym?.logo ? (
              <>
                <img
                  src={gym.logo ? gym.logo : ""}
                  alt={`${gym.name} logo`}
                  className="h-full w-full rounded-lg object-cover"
                  onError={(e) => {
                    // Fallback to command icon if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </>
            ) : (
              <Command className="size-4" />
            )}
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{gym?.name ? gym.name : "Gym"}</span>
            <span className="truncate text-xs">{gym?.description ? gym?.description : "A gym"}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
