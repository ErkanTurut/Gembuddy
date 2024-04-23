import { Icons } from "@/components/icons";
import { StatusButton } from "@/components/statusButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/trpc/server";
import { notFound } from "next/navigation";
import { Label } from "@/components/ui/label";
import { ComboBox } from "@/components/statusSelector";
import { Database } from "@/types/supabase.types";

interface WorkOrderHeaderProps {
  params: {
    work_order_id: string;
  };
  work_order: NonNullable<
    Awaited<
      ReturnType<(typeof trpc)["db"]["work_order"]["get"]["withSteps"]["query"]>
    >["data"]
  >;
}

const status_config: Record<
  Database["public"]["Enums"]["Status"],
  { icon: keyof typeof Icons; label: string }
> = {
  OPEN: {
    icon: "view",
    label: "Open",
  },
  IN_PROGRESS: {
    icon: "timer",
    label: "In progress",
  },
  COMPLETED: {
    icon: "check",
    label: "Completed",
  },
  ON_HOLD: {
    icon: "pause",
    label: "On hold",
  },
  CANCELED: {
    icon: "CrossCircled",
    label: "Canceled",
  },
};

const options = Object.entries(status_config).map(
  ([status, { icon, label }]) => ({
    value: status as Database["public"]["Enums"]["Status"],
    label,
    icon,
  }),
);

export default async function WorkOrderHeader({
  params,
  work_order,
}: WorkOrderHeaderProps) {
  return (
    <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
      <CardHeader className="pb-3">
        <CardTitle>{work_order.name}</CardTitle>
        <CardDescription className="line-clamp-4 text-pretty  leading-relaxed">
          {work_order.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex w-full items-stretch  pb-2">
        <div className="flex flex-col gap-0.5 rounded-md p-2 text-center">
          <Label
            className="text-pretty text-xs text-muted-foreground "
            htmlFor="status"
          >
            Status :
          </Label>
          <ComboBox options={options} initialValue={work_order.status} />
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="flex flex-col gap-0.5 rounded-md p-2  text-center">
          <Label
            className="text-pretty text-xs text-muted-foreground "
            htmlFor="work_plan"
          >
            Work plan :
          </Label>
          <Button id="work_plan" variant={"link"} size={"sm"}>
            {work_order.work_plan_id}
          </Button>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="flex flex-col gap-0.5 text-pretty  rounded-md p-2 text-center ">
          <Label
            className="text-pretty text-xs text-muted-foreground "
            htmlFor="status"
            id="asset"
          >
            Asset :
          </Label>
          <Button id="asset" variant={"link"} size={"sm"}>
            {work_order.work_plan_id}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
