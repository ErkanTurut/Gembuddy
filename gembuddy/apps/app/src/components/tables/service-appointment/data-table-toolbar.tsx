"use client";

import { CaretSortIcon, PlusIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "@/components/tables/data-table/data-table-view-options";
import { Button, buttonVariants } from "@gembuddy/ui/button";
import { Input } from "@gembuddy/ui/input";

import { DataTableFilterCombobox } from "@/components/tables/data-table/data-table-filter-combobox";
import { DataTableFilterItem } from "@/components/tables/data-table/data-table-filter-item";
import { cn } from "@/lib/utils";
import type { DataTableFilterField, DataTableFilterOption } from "@/types";
import { useSearchParams } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { api, RouterOutput } from "@/trpc/client";
import { toast } from "sonner";

interface DataTableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<
    NonNullable<
      RouterOutput["db"]["service_appointment"]["get"]["byWorkOrder"]["data"]
    >[number]
  >;
  filterFields?: DataTableFilterField<
    NonNullable<
      RouterOutput["db"]["service_appointment"]["get"]["byWorkOrder"]["data"]
    >[number]
  >[];
}

export function DataTableToolbar({
  table,
  filterFields = [],
  className,
  ...props
}: DataTableToolbarProps) {
  const searchParams = useSearchParams();
  const utils = api.useUtils();
  const { mutate, isPending } =
    api.db.service_appointment.delete.many.useMutation({
      onSuccess: () => {
        toast.success("Service Appointment deleted successfully");
        utils.db.service_appointment.get.byWorkOrder.invalidate();
        table.toggleAllRowsSelected(false);
      },
    });
  const options = React.useMemo<
    DataTableFilterOption<
      NonNullable<
        RouterOutput["db"]["service_appointment"]["get"]["byWorkOrder"]["data"]
      >[number]
    >[]
  >(() => {
    return filterFields.map((field) => {
      return {
        id: crypto.randomUUID(),
        label: field.label,
        value: field.value,
        options: field.options ?? [],
      };
    });
  }, [filterFields]);

  const initialSelectedOptions = React.useMemo(() => {
    return options
      .filter((option) => searchParams.has(option.value as string))
      .map((option) => {
        const value = searchParams.get(String(option.value)) as string;
        const [filterValue, filterOperator] =
          value?.split("~").filter(Boolean) ?? [];

        return {
          ...option,
          filterValues: filterValue?.split(".") ?? [],
          filterOperator,
        };
      });
  }, [options, searchParams]);

  const [selectedOptions, setSelectedOptions] = React.useState<
    DataTableFilterOption<
      NonNullable<
        RouterOutput["db"]["service_appointment"]["get"]["byWorkOrder"]["data"]
      >[number]
    >[]
  >(initialSelectedOptions);
  const [openFilterBuilder, setOpenFilterBuilder] = React.useState(
    initialSelectedOptions.length > 0 || false
  );
  const [openCombobox, setOpenCombobox] = React.useState(false);

  function onFilterComboboxItemSelect() {
    setOpenFilterBuilder(true);
    setOpenCombobox(true);
  }

  return (
    <div
      className={cn(
        "flex w-full flex-col space-y-2.5 overflow-auto",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Filter name..."
            value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("id")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[250px] focus-visible:ring-0 lg:w-[350px]"
          />
        </div>

        {(table.getIsAllPageRowsSelected() ||
          table.getIsSomePageRowsSelected()) && (
          <Button
            variant="secondary"
            size="icon"
            onClick={() => {
              mutate({
                ids: table
                  .getSelectedRowModel()
                  .rows.map((row) => row.original.id),
              });
            }}
            className="h-7 w-7"
            isLoading={isPending}
          >
            <Icons.trash className="size-4" />
          </Button>
        )}
        {(options.length > 0 && selectedOptions.length > 0) ||
        openFilterBuilder ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpenFilterBuilder(!openFilterBuilder)}
          >
            <CaretSortIcon
              className="mr-2 size-4 shrink-0"
              aria-hidden="true"
            />
            Filter
          </Button>
        ) : (
          <DataTableFilterCombobox
            options={options.filter(
              (option) =>
                !selectedOptions.some(
                  (selectedOption) => selectedOption.value === option.value
                )
            )}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            onSelect={onFilterComboboxItemSelect}
          />
        )}
        <DataTableViewOptions table={table} />
        <Link
          className={buttonVariants({ size: "sm", variant: "default" })}
          href={"./appointments/create"}
        >
          <Icons.plusCircled className="mr-2 size-4 shrink-0" />
          Create
        </Link>
      </div>
      <div
        className={cn(
          "flex items-center gap-2",
          !openFilterBuilder && "hidden"
        )}
      >
        {selectedOptions
          .filter((option) => !option.isMulti)
          .map((selectedOption) => (
            <DataTableFilterItem
              key={String(selectedOption.value)}
              table={table}
              selectedOption={selectedOption}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              defaultOpen={openCombobox}
            />
          ))}
        {/* {selectedOptions.some((option) => option.isMulti) ? (
          <DataTableMultiFilter
            table={table}
            allOptions={options}
            options={selectedOptions.filter((option) => option.isMulti)}
            setSelectedOptions={setSelectedOptions}
            defaultOpen={openCombobox}
          />
        ) : null} */}
        {options.length > 0 && options.length > selectedOptions.length ? (
          <DataTableFilterCombobox
            options={options}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            onSelect={onFilterComboboxItemSelect}
          >
            <Button
              variant="outline"
              size="sm"
              role="combobox"
              className="h-7 rounded-full"
              onClick={() => setOpenCombobox(true)}
            >
              <PlusIcon className="mr-2 size-4 opacity-50" aria-hidden="true" />
              Add filter
            </Button>
          </DataTableFilterCombobox>
        ) : null}
      </div>
    </div>
  );
}
