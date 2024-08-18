"use client";

import {
  type ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { DataTable } from "@/components/tables/data-table/data-table";
import { RouterOutput } from "@/trpc/client";
import { Database } from "@/types/supabase.types";
import {
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { DataTableToolbar } from "../data-table/data-table-toolbar";
import { getColumns } from "./asset-columns";
import { usePathname, useSearchParams } from "next/navigation";
import { DataTableFilterField } from "@/types";

interface AssetTableProps {
  data: NonNullable<RouterOutput["db"]["work_order"]["get"]["detail"]>["asset"];
  rowCount: number;
}

export const statuses: {
  value: Database["public"]["Enums"]["Status"];
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}[] = [
  {
    value: "OPEN",
    label: "Open",
    icon: QuestionMarkCircledIcon,
    withCount: true,
  },
  {
    value: "ON_HOLD",
    label: "On Hold",
    icon: CircleIcon,
    withCount: true,
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
    icon: StopwatchIcon,
    withCount: true,
  },
  {
    value: "COMPLETED",
    label: "Done",
    icon: CheckCircledIcon,
    withCount: true,
  },
  {
    value: "CANCELED",
    label: "Cancelled",
    icon: CrossCircledIcon,
    withCount: true,
  },
];

export function AssetTable({ data, rowCount }: AssetTableProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const columns = React.useMemo(() => getColumns(), []);
  const filterFields: DataTableFilterField<
    NonNullable<
      RouterOutput["db"]["work_order"]["get"]["detail"]
    >["asset"][number]
  >[] = [
    {
      label: "Status",
      value: "status",
      options: statuses,
    },
    // options: data
    // .flatMap((asset) => asset.location)
    // .reduce((uniqueLocations, location) => {
    //   const existingLocation = uniqueLocations.find(
    //     (l) => l.value === location?.id
    //   );
    //   if (!existingLocation) {
    //     uniqueLocations.push({
    //       label: location?.name || "",
    //       value: location?.id || "",
    //     });
    //   }
    //   return uniqueLocations;
    // }, []),
    {
      label: "Location",
      value: "location_id",
      options: data
        .flatMap((asset) => asset.location)
        .map((location) => ({
          label: location?.name || "",
          value: location?.name || "",
        })),
    },
  ];

  // Memoize computation of searchableColumns and filterableColumns
  const { searchableColumns, filterableColumns } = React.useMemo(() => {
    return {
      searchableColumns: filterFields.filter((field) => !field.options),
      filterableColumns: filterFields.filter((field) => field.options),
    };
  }, [filterFields]);

  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams],
  );

  const initialColumnFilters: ColumnFiltersState = React.useMemo(() => {
    return Array.from(searchParams.entries()).reduce<ColumnFiltersState>(
      (filters, [key, value]) => {
        const filterableColumn = filterableColumns.find(
          (column) => column.value === key,
        );
        const searchableColumn = searchableColumns.find(
          (column) => column.value === key,
        );

        if (filterableColumn) {
          filters.push({
            id: key,
            value: value.split("."),
          });
        } else if (searchableColumn) {
          filters.push({
            id: key,
            value: [value],
          });
        }

        return filters;
      },
      [],
    );
  }, [filterableColumns, searchableColumns, searchParams]);

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(initialColumnFilters);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    rowCount,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} filterFields={filterFields} />
    </DataTable>
  );
}
