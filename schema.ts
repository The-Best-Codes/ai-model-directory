import { z } from "zod";

// Primitive schemas
export const IsoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "must be yyyy-mm-dd");

export const Price = z.number().nonnegative();

export const Modality = z.enum(["audio", "file", "image", "text", "video"]);
export type Modality = z.infer<typeof Modality>;

// Required top-level scalars (per the canonical schema, only `id` is required)
export const RequiredFields = z.object({
  id: z.string().min(1),
});
export type RequiredFields = z.infer<typeof RequiredFields>;

// Optional top-level scalars
export const OptionalScalars = z.object({
  name: z.string().min(1).optional(),
  knowledge_cutoff: IsoDate.optional(),
  release_date: IsoDate.optional(),
  last_updated: IsoDate.optional(),
  open_weights: z.boolean().optional(),
});
export type OptionalScalars = z.infer<typeof OptionalScalars>;

// Optional tables
export const FeaturesSchema = z.object({
  attachment: z.boolean().optional(),
  reasoning: z.boolean().optional(),
  tool_call: z.boolean().optional(),
  structured_output: z.boolean().optional(),
  temperature: z.boolean().optional(),
});
export type FeaturesTable = z.infer<typeof FeaturesSchema>;

export const PricingSchema = z.object({
  input: Price.optional(),
  output: Price.optional(),
  reasoning: Price.optional(),
  cache_read: Price.optional(),
  cache_write: Price.optional(),
  input_audio: Price.optional(),
  output_audio: Price.optional(),
});
export type PricingTable = z.infer<typeof PricingSchema>;

export const LimitSchema = z.object({
  context: z.number().int().nonnegative().optional(),
  input: z.number().int().nonnegative().optional(),
  output: z.number().int().nonnegative().optional(),
});
export type LimitTable = z.infer<typeof LimitSchema>;

export const ModalitiesSchema = z.object({
  input: z.array(Modality).optional(),
  output: z.array(Modality).optional(),
});
export type ModalitiesTable = z.infer<typeof ModalitiesSchema>;

// Full model schema (canonical TOML shape)
export const ProviderModelSchema = RequiredFields.extend({
  ...OptionalScalars.shape,
  features: FeaturesSchema.optional(),
  pricing: PricingSchema.optional(),
  limit: LimitSchema.optional(),
  modalities: ModalitiesSchema.optional(),
});
export type ProviderModel = z.infer<typeof ProviderModelSchema>;
