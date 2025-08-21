import { z } from "zod";

const currentYear = new Date().getFullYear();

export const createBookSchema = z.object({
  title: z.string().min(1, "title is required"),
  author: z.string().min(1, "author is required"),
  publishedYear: z.number().int().min(1000).max(currentYear).optional(),
  genre: z.string().optional(),
  stock: z
    .number()
    .int()
    .nonnegative()
    .refine((n) => Number.isInteger(n), "stock must be an integer")
    .positive("stock must be greater than 0"),
});

export const getBooksQuerySchema = z.object({
  genre: z.string().optional(),
  author: z.string().optional(),
  minYear: z.coerce.number().int().min(0).optional(),
  available: z.coerce.boolean().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  offset: z.coerce.number().int().min(0).default(0),
});
