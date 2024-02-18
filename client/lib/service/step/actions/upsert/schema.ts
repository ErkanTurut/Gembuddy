import * as z from "zod";
export const ZUpsertStep = z.object({
  id: z.string(),
  name: z
    .string({
      invalid_type_error: "Name must be a string",
      required_error: "Name is required",
    })
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(100, { message: "Name must be less than 100 characters long" })
    .regex(/^[a-zA-Z0-9 ]+$/, {
      message: "Name must contain only letters, numbers and spaces",
    })
    .optional(),
  description: z
    .string()
    .max(500, {
      message: "Description must be less than 500 characters long",
    })
    .optional(),
  order: z.number().optional(),
  plan_id: z.string(),
  parent_step_id: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
  created_by_id: z.string().optional(),
});
