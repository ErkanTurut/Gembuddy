import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { getPlanStepsHandler } from "../plan/get.handler";
import { TCreateWorkOrderSchema } from "./create.schema";
import { TPlanSchema } from "../plan/plan.schema";
// import { cache } from "react";

type opts = {
  input: TCreateWorkOrderSchema;
  db: SupabaseClient;
};

export const createWorkOrderHandler = async ({ input, db }: opts) => {
  const { data: plan } = await db
    .from("plan")
    .select("*, step(*) ")
    .eq("id", input.plan_id)
    .single()
    .throwOnError();

  return await db
    .from("work_order")
    .insert({
      name: input.name,
      team_id: input.team_id,
      description: input.description,
      work_plan: plan,
    })
    .throwOnError()
    .select("*");
};
