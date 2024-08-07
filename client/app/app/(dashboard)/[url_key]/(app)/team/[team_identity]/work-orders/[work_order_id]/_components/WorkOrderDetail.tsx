import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  MoreVertical,
  Truck,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/trpc/server";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface WorkOrderDetailProps {
  params: {
    work_order_id: string;
  };
  work_order: NonNullable<
    Awaited<
      ReturnType<(typeof trpc)["db"]["work_order"]["get"]["detail"]>
    >["data"]
  >;
}

export default function WorkOrderDetail({
  params,
  work_order,
}: WorkOrderDetailProps) {
  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {work_order.id}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>
            Created at
            {formatDate({ date: work_order.created_at, format: "LLLL" })}
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Trash</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Contract Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Service contract</dt>
              <dd>{work_order.company?.name}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Activity line</dt>
              <dd>ABC</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">WBS</dt>
              <dd>ABC-123</dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Customer Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Customer</dt>
              <dd>{work_order.company?.name} </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                <a className="underline" href="mailto:">
                  contact@acme.com
                </a>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Phone</dt>
              <dd>
                <a className="underline" href="tel:">
                  +1 234 567 890
                </a>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Requestor</dt>
              <dd>
                <Link
                  className="text-sm font-medium text-primary underline"
                  href={"#"}
                >
                  {work_order.user?.first_name} {work_order.user?.last_name}
                </Link>
              </dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4" />

        <div className="grid grid-cols-2 gap-4">
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Start date</div>
            <div className="text-muted-foreground">
              {work_order.sheduled_start
                ? formatDate({ date: work_order.sheduled_start, format: "lll" })
                : "Not scheduled yet"}
            </div>
          </div>
          <div className="grid gap-3">
            <div className="font-semibold">End date</div>
            <div className="text-muted-foreground">
              {work_order.sheduled_end
                ? formatDate({ date: work_order.sheduled_end, format: "lll" })
                : "Not scheduled yet"}
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="grid grid-cols-2 gap-4">
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Location name</div>
            {work_order.location ? (
              <Link
                className="text-xs font-medium text-primary underline underline-offset-4"
                href={`/${work_order.location.workspace_id}/locations/customers/${work_order.location.id}`}
              >
                {work_order.location.name}
              </Link>
            ) : (
              <p className="text-muted-foreground">Not assigned yet</p>
            )}
          </div>
          <div className="grid gap-3">
            <div className="font-semibold">Location address</div>
            {work_order.location ? (
              <address className="grid gap-0.5 not-italic text-muted-foreground">
                <span>{work_order.location.address?.street}</span>
                <span>{work_order.location.address?.state}</span>
                <span>{work_order.location.address?.postal_code}</span>
                <span>{work_order.location.address?.country}</span>
              </address>
            ) : (
              <p className="text-muted-foreground">Not assigned yet</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated at{" "}
          <time dateTime="2023-11-23">
            {formatDate({ date: work_order.updated_at, format: "LLL" })}
          </time>
        </div>
        <Pagination className="ml-auto mr-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="sr-only">Previous Order</span>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="sr-only">Next Order</span>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}
