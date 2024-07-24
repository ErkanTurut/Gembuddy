"use client";
import { DataTable } from "@/components/table/data-table";
import { api, RouterOutput } from "@/trpc/client";
import { columns } from "./columns";

interface AssetTableProps {
  params: {
    url_key: string;
  };
  initialData: RouterOutput["db"]["asset"]["get"]["byWorkspace"];
  searchParams: {
    limit: number;
    page: number;
  };
}

export function TableData({
  params,
  searchParams,
  initialData,
}: AssetTableProps) {
  const queryResult = api.db.asset.get.byWorkspace.useQuery(
    {
      url_key: params.url_key,
      range: {
        start: (searchParams.page - 1) * searchParams.limit,
        end: (searchParams.page - 1) * searchParams.limit + searchParams.limit,
      },
    },
    { initialData, refetchOnMount: false, staleTime: 1000 * 60 },
  );
  return (
    <DataTable
      filter={{ columnVisibility: { description: false } }}
      columns={columns}
      data={{
        data: queryResult.data.data || [],
        count: queryResult.data.count || 0,
      }}
      searchParams={searchParams}
      queryResult={queryResult}
    />
  );
}
