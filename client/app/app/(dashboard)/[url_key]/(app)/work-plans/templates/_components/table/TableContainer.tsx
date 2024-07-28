import { FC } from "react";
import { trpc } from "@/trpc/server";
import { TableData } from "./TableData";
interface TableProps {
  searchParams: {
    limit: number;
    page: number;
  };
  params: {
    url_key: string;
  };
}

export const TableContainer: FC<TableProps> = async ({
  searchParams,
  params,
}) => {
  const initialData = await trpc.db.work_plan_template.get.byWorkspace({
    url_key: params.url_key,
    range: {
      start: (searchParams.page - 1) * searchParams.limit,
      end: (searchParams.page - 1) * searchParams.limit + searchParams.limit,
    },
  });

  return (
    <TableData
      initialData={initialData}
      params={params}
      searchParams={searchParams}
    />
  );
};
