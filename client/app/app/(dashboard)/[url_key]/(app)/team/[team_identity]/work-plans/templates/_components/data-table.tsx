"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";

import { DataTablePagination } from "@/components/table/data-table-pagination";
import { useSearchParams } from "next/navigation";
import { DataTableToolbar } from "./data-table-toolbar";
import { trpc } from "@/trpc/server";
import { api } from "@/trpc/client";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<
    NonNullable<
      Awaited<
        ReturnType<
          (typeof trpc)["db"]["work_plan_template"]["get"]["byId"]["query"]
        >
      >["data"]
    >
  >[];
  initialData: NonNullable<
    Awaited<
      ReturnType<
        (typeof trpc)["db"]["work_plan_template"]["get"]["byTeamId"]["query"]
      >
    >
  >;

  params: {
    team_identity: string;
  };
}

export function DataTable<TData, TValue>({
  columns,
  initialData,
  params,
}: DataTableProps<TData, TValue>) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") as string) || 1;
  const limit = parseInt(searchParams.get("limit") as string) || 10;
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: page - 1,
    pageSize: limit,
  });

  const {
    data: { data, count },
  } = api.db.work_plan_template.get.byTeamId.useQuery(
    {
      team_identity: params.team_identity,
      range: {
        start: pageIndex * pageSize,
        end: pageIndex * pageSize + pageSize,
      },
    },
    { initialData },
  );

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: {
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    },
    enableRowSelection: true,
    pageCount: Math.ceil(count || 0 / pageSize),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader className="  border-foreground bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className=" text-xs" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={columns.length}>
                <DataTablePagination table={table} />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
