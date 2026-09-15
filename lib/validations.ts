import { z } from "zod";

export const articleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),

  content: z
    .string()
    .trim()
    .min(20, "Content must be at least 20 characters"),

  categoryId: z.coerce.number(),

  authorId: z.coerce.number(),

  image: z.string().optional(),

  published: z.boolean().default(true),
});

export type ArticleFormData = z.infer<
  typeof articleSchema
>;