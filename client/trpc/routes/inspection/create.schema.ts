import * as z from "zod";
import { ZCreateStepSchema } from "../template/step/create.schema";
import { StatusSchema } from "./enum.schema";

export const ZCreateInspcetionSchema = z
  .object({
    // id: z.string().uuid().optional(),
    // name: z.string(),
    // description: z.string().optional().nullable(),
    // created_at: z.coerce.date().optional(),
    // updated_at: z.coerce.date().optional(),
    // status: z.lazy(() => StatusSchema).optional(),
    // team_id: z.string().uuid(),
    // inspection_snapshot_id: z.string().uuid().optional(),
    // step: z.lazy(() => ZCreateStepSchema).optional(),

    name: z
      .string({
        invalid_type_error: "Name must be a string",
        required_error: "Name is required",
      })
      .min(3, { message: "Name must be at least 3 characters long" })
      .max(100, { message: "Name must be less than 100 characters long" })
      .regex(/^[a-zA-Z0-9 ]+$/, {
        message: "Name must contain only letters, numbers and spaces",
      }),
    team_id: z
      .string({
        invalid_type_error: "Team ID must be a string",
        required_error: "Team ID is required",
      })
      .uuid({ message: "Team ID must be a valid UUID" }),
    description: z
      .string({
        invalid_type_error: "Description must be a string",
        required_error: "Description is required",
      })
      .min(3, { message: "Description must be at least 3 characters long" })
      .max(1000, {
        message: "Description must be less than 1000 characters long",
      })
      .optional(),
    inspection_snapshot_id: z.string().uuid().optional(),
  })
  .strict();

export type TCreateInspcetionSchema = z.infer<typeof ZCreateInspcetionSchema>;
