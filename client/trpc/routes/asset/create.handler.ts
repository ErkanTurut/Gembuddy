import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";

import { TRPCError } from "@trpc/server";
import { TAssetCreateSchema } from "./create.schema";

type opts = {
  input: TAssetCreateSchema;
  db: SupabaseClient;
};

export async function createAssetHandler({
  db,
  input,
}: {
  input: TAssetCreateSchema;
  db: SupabaseClient;
}) {
  const { error, data } = await db
    .from("asset")
    .insert({
      name: input.name,
      description: input.description,
      workspace_id: input.workspace_id,
    })
    .select("*")
    .single()
    .throwOnError();

  if (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }

  if (input.team_id) {
    await db
      .from("asset_team")
      .insert({
        team_id: "4pGki9KGYX",
        asset_id: data.id,
      })
      .throwOnError();
  }

  return { data };
}
