import { z } from "zod";

export const unixTimestampSchema = z.string().regex(/^(0|[1-9]\d*)$/);

export const modalitySchema = z.enum(["text", "image", "audio", "video", "file"]);
export type ModelModality = z.infer<typeof modalitySchema>;

const finiteNumberSchema = z.number().finite().nonnegative();
const finiteIntegerSchema = z.number().int().nonnegative();

export const featuresSchema = z
  .object({
    attachment: z.boolean().optional(),
    reasoning: z.boolean().optional(),
    tool_call: z.boolean().optional(),
    structured_output: z.boolean().optional(),
    temperature: z.boolean().optional(),
  })
  .strict();

export const pricingSchema = z
  .object({
    input: finiteNumberSchema.optional(),
    output: finiteNumberSchema.optional(),
    reasoning: finiteNumberSchema.optional(),
    cache_read: finiteNumberSchema.optional(),
    cache_write: finiteNumberSchema.optional(),
    input_audio: finiteNumberSchema.optional(),
    output_audio: finiteNumberSchema.optional(),
  })
  .strict();

export const limitSchema = z
  .object({
    context: finiteIntegerSchema.optional(),
    input: finiteIntegerSchema.optional(),
    output: finiteIntegerSchema.optional(),
  })
  .strict();

export const modalitiesSchema = z
  .object({
    input: z.array(modalitySchema).optional(),
    output: z.array(modalitySchema).optional(),
  })
  .strict();

export const modelSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1).optional(),
    knowledge_cutoff: unixTimestampSchema.optional(),
    release_date: unixTimestampSchema.optional(),
    last_updated: unixTimestampSchema.optional(),
    open_weights: z.boolean().optional(),
    features: featuresSchema.optional(),
    pricing: pricingSchema.optional(),
    limit: limitSchema.optional(),
    modalities: modalitiesSchema.optional(),
  })
  .strict();

export const modelOverrideSchema = z
  .object({
    id: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    knowledge_cutoff: unixTimestampSchema.optional(),
    release_date: unixTimestampSchema.optional(),
    last_updated: unixTimestampSchema.optional(),
    open_weights: z.boolean().optional(),
    features: featuresSchema.partial().optional(),
    pricing: pricingSchema.partial().optional(),
    limit: limitSchema.partial().optional(),
    modalities: modalitiesSchema.partial().optional(),
  })
  .strict();

export type ModelRecord = z.infer<typeof modelSchema>;
export type ModelOverride = z.infer<typeof modelOverrideSchema>;
