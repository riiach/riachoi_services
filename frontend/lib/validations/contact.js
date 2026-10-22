import { z } from "zod";

export const contactSchema = z.object({
  email: z.string().trim().max(254).email("Please enter a valid email address."),
  message: z.string().trim().max(4000).default(""),
});
