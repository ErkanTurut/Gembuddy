import { Nav } from "@/components/layouts/side-navigation/nav";
import { Separator } from "@/components/ui/separator";
import UserAccountNav from "@/components/user/user-account-nav";
import WorkspaceNav from "@/components/workspace/workspace-navigation";
import WorkspaceSkeleton from "@/components/workspace/workspace-skeleton";
import { appNavItems } from "@/config/dashboard.config";
import { cookies } from "next/headers";
import { FC, Suspense } from "react";
import {
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarLayout,
} from "./sidebar-layout";

import TeamListSkeleton from "@/components/team/team-list-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

import WorkspaceSelector from "./sidebar/workspace-selector";
import TeamNav from "./sidebar/team-nav";
import UserNav from "./sidebar/user-account-nav";
interface sidebarProps {
  params: {
    url_key: string;
  };
}

export default async function Sidebar({ params }: sidebarProps) {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");
  const defaultLayout = layout
    ? (JSON.parse(layout.value) as number[])
    : undefined;
  const defaultCollapsed = collapsed
    ? (JSON.parse(collapsed.value) as boolean)
    : undefined;

  return (
    <SidebarLayout
      defaultLayout={defaultLayout}
      defaultCollapsed={defaultCollapsed}
      className=" hidden h-screen bg-muted/50 backdrop-blur-[2px] lg:flex"
    >
      <div>
        <SidebarHeader className="flex flex-col gap-2 p-2">
          <Suspense fallback={<WorkspaceSkeleton />}>
            <WorkspaceSelector params={params} />
          </Suspense>
          <Nav rootPath={`/${params.url_key}`} items={appNavItems.header} />
          <Separator />
        </SidebarHeader>
        <SidebarBody className="flex flex-col gap-2 overflow-x-auto overflow-ellipsis whitespace-nowrap	 p-2	">
          <Suspense fallback={<TeamListSkeleton />}>
            <TeamNav params={params} />
          </Suspense>
        </SidebarBody>
      </div>
      <SidebarFooter className="flex flex-col gap-1 p-2">
        <Separator />
        <Nav rootPath={`/${params.url_key}`} items={appNavItems.footer} />
        <Separator />
        <Suspense fallback={<Skeleton className="h-9 w-full" />}>
          <UserNav />
        </Suspense>
      </SidebarFooter>
    </SidebarLayout>
  );
}
