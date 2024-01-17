import { z } from "zod";

export const schema = z.object({
  source: z.string().min(1),
  destination: z.string().min(1),
});

export type FormData = z.infer<typeof schema>;
