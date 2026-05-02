import { z } from "zod";

const controlCharacterPattern = /[\u0000-\u001f\u007f]/;
const modelIdSchema = z
  .string()
  .min(1)
  .max(200)
  .refine((value) => !controlCharacterPattern.test(value), {
    message: "must not contain control characters",
  });
const modelNameSchema = z
  .string()
  .min(1)
  .max(500)
  .refine((value) => !controlCharacterPattern.test(value), {
    message: "must not contain control characters",
  });

export const unixTimestampSchema = z.string().regex(/^(0|[1-9]\d*)$/);

export const modalitySchema = z.enum([
  "text",
  "image",
  "audio",
  "video",
  "file",
]);
export type ModelModality = z.infer<typeof modalitySchema>;

const finiteNumberSchema = z.number().nonnegative();
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
    id: modelIdSchema,
    name: modelNameSchema.optional(),
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
    id: modelIdSchema.optional(),
    name: modelNameSchema.optional(),
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

export const metadataSourceSchema = z.enum(["manual_data", "api", "extends"]);
export type MetadataSource = z.infer<typeof metadataSourceSchema>;

export const defaultMetadataPriorities: readonly MetadataSource[] = [
  "manual_data",
  "api",
  "extends",
];

const extendsPathPattern = /^[a-z0-9][a-z0-9-]*(?:\/[a-z0-9][a-z0-9-]*)+$/;

export const metadataExtendsSchema = z
  .object({
    path: z
      .string()
      .min(1)
      .refine((value) => extendsPathPattern.test(value), {
        message:
          "must be a slash-separated path using lowercase letters, digits, or '-'",
      }),
  })
  .strict();

export const metadataSchema = z
  .object({
    preserve: z.boolean().optional(),
    priorities: z.array(metadataSourceSchema).min(1).optional(),
    extends: metadataExtendsSchema.optional(),
    manual_data: modelOverrideSchema.optional(),
  })
  .strict();

export type MetadataRecord = z.infer<typeof metadataSchema>;

// For build-all.ts
export const providerInfoSchema = z
  .object({
    name: z.string().min(1),
    website: z.string().min(1).optional(),
    apiBaseUrl: z.string().min(1).optional(),
    aiSdk: z
      .object({
        npmPackage: z.string().min(1).optional(),
        defaultApiKeyEnv: z.array(z.string().min(1)).optional(),
      })
      .strict()
      .optional(),
  })
  .strict();

export type ProviderInfo = z.infer<typeof providerInfoSchema>;
// End for build-all.ts
