"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@gembuddy/ui/tabs";

import { TCreateWorkOrderWithItemsSchema } from "@gembuddy/trpc/server/routes/work_order/create.schema";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { type UseFormReturn } from "react-hook-form";
import { AssetTableForm } from "./asset-table/asset-table-form";

export function WorkOrderItemsForm({
  form,
}: {
  form: UseFormReturn<TCreateWorkOrderWithItemsSchema>;
}) {
  return (
    <div>
      <PageHeader
        id="work-plan-template-header"
        aria-labelledby="work-plan-template-header-heading"
      >
        <PageHeaderHeading as="h3" size="xs">
          Work order items
        </PageHeaderHeading>
        <PageHeaderDescription size="xs">
          Work order items are the assets, work steps and ressources that are
          part of the work order.
        </PageHeaderDescription>
      </PageHeader>

      <Tabs defaultValue="assets" className="pt-4">
        <TabsList className="">
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger disabled value="work-steps">
            Work steps
          </TabsTrigger>
          <TabsTrigger value="ressources">Ressources</TabsTrigger>
        </TabsList>
        <TabsContent value="assets">
          <AssetTableForm />
        </TabsContent>
        <TabsContent value="work-steps" className="mt-0 grid md:grid-cols-2">
          {/* <WorkSteps form={form} /> */}
        </TabsContent>
        <TabsContent value="ressources"></TabsContent>
      </Tabs>
    </div>
  );
}
