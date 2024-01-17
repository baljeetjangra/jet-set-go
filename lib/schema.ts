import { z } from "zod";

export const searchFlightSchema = z.object({
  source: z.string().min(1),
  destination: z.string().min(1),
});

export type SearchFlightFormData = z.infer<typeof searchFlightSchema>;

export const filterFlightSchema = z.object({
  priceType: z.enum(["cheapest", "fastest"]).optional(),
  airlines: z.array(z.string()).optional(),
});

export type FilterFlightFormData = z.infer<typeof filterFlightSchema>;
