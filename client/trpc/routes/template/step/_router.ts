import { createClient } from "@/lib/supabase/server";
import { protectedProcedure, router } from "@/trpc/trpc";
import { cookies } from "next/headers";
import { createStepHandler } from "./create.handler";
import { ZCreateStepSchema } from "./create.schema";
import { deleteStepHandler } from "./delete.handler";
import { ZDeleteStepSchema } from "./delete.schema";
import {
  getStepHandler,
  getStepsByIdentityHandler,
  getStepsByInspectionHandler,
  searchStepsHandler,
} from "./get.handler";
import { ZGetStepSchema } from "./get.schema";
import { updateStepHandler } from "./update.handler";
import { ZUpdateStepSchema } from "./update.schema";
import { ZUpsertStepSchema } from "./upsert.schema";
import { upsertStepHandler } from "./upsert.handler";
import { sleep } from "@/lib/utils";

export const step = router({
  get: protectedProcedure
    .input(ZGetStepSchema.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      return await getStepHandler({ input, db: createClient(cookies()) });
    }),

  searchSteps: protectedProcedure
    .input(ZGetStepSchema.pick({ q: true, team_identity: true }))
    .query(async ({ ctx, input }) => {
      return await searchStepsHandler({ input, db: createClient(cookies()) });
    }),

  getStepsByInspection: protectedProcedure
    .input(ZGetStepSchema.pick({ inspection_template_id: true }))
    .query(async ({ ctx, input }) => {
      const { data } = await getStepsByInspectionHandler({
        input,
        db: createClient(cookies()),
      });
      return data;
    }),

  getStepsByIdentity: protectedProcedure
    .input(ZGetStepSchema.pick({ team_identity: true, range: true }))
    .query(async ({ ctx, input }) => {
      return await getStepsByIdentityHandler({
        input,
        db: createClient(cookies()),
      });
    }),
  update: protectedProcedure
    .input(ZUpdateStepSchema)
    .mutation(async ({ ctx, input }) => {
      return await updateStepHandler({ input, db: createClient(cookies()) });
    }),
  create: protectedProcedure
    .input(ZCreateStepSchema)
    .mutation(async ({ ctx, input }) => {
      return await createStepHandler({ input, db: createClient(cookies()) });
    }),
  delete: protectedProcedure
    .input(ZDeleteStepSchema)
    .mutation(async ({ ctx, input }) => {
      return await deleteStepHandler({ input, db: createClient(cookies()) });
    }),
  upsert: protectedProcedure
    .input(ZUpsertStepSchema)
    .mutation(async ({ ctx, input }) => {
      return await upsertStepHandler({ input, db: createClient(cookies()) });
    }),
});
