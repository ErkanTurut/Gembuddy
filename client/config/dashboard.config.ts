import { type SidebarNavItem, type SettingsNavItem } from "@/types";
import { Database } from "@/types/supabase.types";
import { NavItem } from "@/types";
import { useId } from "react";

export interface TDashboardConfig {
  sidebarNav: {
    isCollapsed: boolean;
    header: NavItem[];
    main: NavItem[];
    footer: NavItem[];
  };
  settingsNav?: {
    isCollapsed: boolean;
    header: NavItem[];
    main: NavItem[];
    footer: NavItem[];
  };
}

export const appNavItems: {
  isCollapsed: boolean;
  header: NavItem[];
  main: NavItem[];
  footer: NavItem[];
  teamNav: NavItem[];
} = {
  isCollapsed: false,
  header: [
    {
      title: "Research",
      href: "/research",
      icon: "search",
      id: "research",
    },
    {
      title: "Account",
      href: "/account",
      icon: "user",
      id: "account",
    },
  ],
  main: [],
  teamNav: [
    {
      title: "Members",
      icon: "user",
      variant: "ghost",
      href: "/members",
      id: "members",
    },
    {
      title: "Templates",
      icon: "dashboard",
      variant: "ghost",
      href: "/templates",
      id: "templates",
      items: [
        {
          title: "Work plans",
          href: "/plans",
          variant: "ghost",
          id: "plans",
        },
        {
          title: "Steps",
          href: "/steps",
          variant: "ghost",
          id: "steps",
        },
      ],
    },
    {
      title: "Repports",
      icon: "fileText",
      variant: "ghost",
      href: "/repports",
      id: "repports",
    },
  ],
  footer: [
    {
      title: "Notifications",
      href: "/",
      icon: "bell",
      id: "notifications",
    },
    {
      title: "Back to website",
      href: "/",
      icon: "externalLink",
      id: "back-to-website",
    },
  ],
};

export const settingsNavItems: {
  header: NavItem[];
  main: NavItem[];
  footer: NavItem[];
} = {
  header: [
    {
      title: "Settings",
      icon: "chevronLeft",
      href: "/",
      id: "settings",
    },
  ],
  main: [
    {
      title: "Account",
      icon: "user",
      href: "/account",
      id: "account",
      items: [
        {
          title: "Profile",
          href: "/profile",
          id: "profile",
        },
        {
          title: "Security",
          href: "/security",
          id: "security",
        },
        {
          title: "Preferences",
          href: "/preferences",
          id: "preferences",
        },
      ],
    },
    {
      title: "Your teams",
      href: "/team",
      id: "team",
      items: [
        {
          title: "Your teams",
          href: "/all",
          id: "all",
        },
        {
          title: "Create a team",
          icon: "plusCircled",
          href: "/create",
          id: "create",
        },
      ],
    },
    {
      title: "Workspace",
      href: "/workspace",
      id: "workspace",
      items: [
        {
          title: "General",
          href: "/general",
          id: "general",
        },
        {
          title: "Billing",
          href: "/billing",
          id: "billing",
        },
      ],
    },
  ],
  footer: [],
};
