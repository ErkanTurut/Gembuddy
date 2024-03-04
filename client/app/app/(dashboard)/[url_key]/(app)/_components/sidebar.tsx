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

import { getTeams } from "@/lib/service/team/fetch";

import { getSession } from "@/lib/service/auth/fetch";
import { getUser } from "@/lib/service/user/fetch";

import TeamListSkeleton from "@/components/team/team-list-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { getWorkspaces } from "@/lib/service/workspace/fetch";
import { createClient } from "@/lib/supabase/server";
import { generateAvatar } from "@/lib/utils";
import { redirect } from "next/navigation";

interface sidebarProps {
  params: {
    url_key: string;
  };
}

const Sidebar: FC<sidebarProps> = async ({ params }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout
    ? (JSON.parse(layout.value) as number[])
    : undefined;
  const defaultCollapsed = collapsed
    ? (JSON.parse(collapsed.value) as boolean)
    : undefined;
  const {
    data: { session },
    error,
  } = await getSession(supabase);
  if (!session || error) {
    redirect("/login");
  }

  const { data: workspaces } = await getWorkspaces({ client: supabase });

  if (!workspaces) {
    redirect("/create");
  }
  const workspace = workspaces.find(
    (workspace) => workspace.url_key === params.url_key,
  );

  if (!workspace) {
    redirect("/create");
  }

  return (
    <SidebarLayout
      defaultLayout={defaultLayout}
      defaultCollapsed={defaultCollapsed}
      className="hidden h-screen bg-background md:flex"
    >
      <div>
        <SidebarHeader className="flex flex-col gap-2 p-2">
          <Suspense fallback={<WorkspaceSkeleton />}>
            <WorkspaceNav workspaces={workspaces} workspace={workspace} />
          </Suspense>
          <Nav rootPath={`/${params.url_key}`} items={appNavItems.header} />
          <Separator />
        </SidebarHeader>
        <SidebarBody className="flex flex-col gap-2 overflow-x-auto overflow-ellipsis whitespace-nowrap	 p-2	">
          <Suspense fallback={<TeamListSkeleton />}>
            {(async () => {
              const { data: teams } = await getTeams({
                supabase,
                workspace_id: workspace.id,
              });

              return (
                <Nav
                  size={"sm"}
                  items={[
                    {
                      title: "Teams",
                      icon: "plusCircled",
                      id: "all",
                      variant: "default",
                      items: teams?.map((team) => ({
                        image_url: generateAvatar({
                          name: team.name,
                        }).image_url,
                        title: team.name,
                        href: `/${team.identity}`,
                        items: appNavItems.teamNav,
                        id: team.identity,
                      })),
                    },
                  ]}
                  rootPath={`/${params.url_key}/team`}
                />
              );
            })()}
          </Suspense>
        </SidebarBody>
      </div>
      <SidebarFooter className="flex flex-col gap-1 p-2">
        <Separator />
        <Nav rootPath={`/${params.url_key}`} items={appNavItems.footer} />
        <Separator />
        <Suspense fallback={<Skeleton className="h-8 w-full" />}>
          {(async () => {
            const { data: user } = await getUser({
              user_id: session.user.id,
              supabase,
            });
            if (!user) {
              redirect("/login");
            }
            return <UserAccountNav className="w-full" user={user} />;
          })()}
        </Suspense>
      </SidebarFooter>
    </SidebarLayout>
  );
};

export default Sidebar;

{
  /* <div class="relative h-full w-full bg-white"><div class="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div></div> */
}
