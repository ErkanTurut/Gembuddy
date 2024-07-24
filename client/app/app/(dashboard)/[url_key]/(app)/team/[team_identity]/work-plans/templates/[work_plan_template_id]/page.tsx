import { ResponsiveCard } from "@/components/responsive-card";
import StepDeleteForm from "@/components/work-plan/templates/step/step-delete";
import StepUpdateForm from "@/components/work-plan/templates/step/step-update";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { trpc } from "@/trpc/server";
import { notFound } from "next/navigation";
import CreateWorkOrderForm from "@/components/work-order/work-order-create-form";
import { Input } from "@/components/ui/input";

interface PageProps {
  searchParams: {
    step_id: string | null;
  };
  params: {
    url_key: string;
    team_identity: string;
    work_plan_template_id: string;
  };
}

export default async function Page({ searchParams, params }: PageProps) {
  const { data: work_plan_template } =
    await trpc.db.work_plan_template.get.byId({
      id: params.work_plan_template_id,
    });

  if (!work_plan_template) {
    return notFound();
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>
      <CardContent>
        <Input value={work_plan_template.name} disabled />
        <Input value={work_plan_template.description || ""} disabled />
      </CardContent>
    </Card>
  );
}
