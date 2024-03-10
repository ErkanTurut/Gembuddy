import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

import { Shell } from "@/components/shells";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import { trpc } from "@/trpc/server";
import { Suspense } from "react";
import PlansTable from "./_components/plans-table";

interface DashboardLayoutProps {
  params: {
    team_identity: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function DashboardPage({
  params,
  searchParams,
}: DashboardLayoutProps) {
  const page = searchParams["page"]
    ? parseInt(searchParams["page"] as string)
    : 1;
  const limit = searchParams["limit"]
    ? parseInt(searchParams["limit"] as string)
    : 10;
  const offset = (page - 1) * limit;

  return (
    <>
      <PageHeader
        className="pt-10"
        id="account-header"
        aria-labelledby="account-header-heading"
      >
        <PageHeaderHeading size="sm" className="flex items-center gap-1">
          Your Plans
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          List of your inspection Plans
        </PageHeaderDescription>
      </PageHeader>
      <Shell variant="dashboard">
        <Suspense fallback={<TableSkeleton />}>
          <PlansTable props={{ offset, limit, page }} params={params} />
        </Suspense>
      </Shell>
    </>
  );
}
