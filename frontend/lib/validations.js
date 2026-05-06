import { z } from "zod";

export const subscriberSchema = z.object({
    email: z.string().email(),
    name: z.string().optional(),
});

export const estimateCalculateSchema = z.object({
    items: z.array(
        z.object({
            featureId: z.string(),
            quantity: z.number().int().min(1),
        })
    ),
});

export const estimateRequestSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    message: z.string().optional(),
    items: z.array(
        z.object({
            featureId: z.string(),
            quantity: z.number().int().min(1),
        })
    ),
});