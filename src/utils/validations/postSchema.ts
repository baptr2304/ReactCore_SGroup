"use client";

import { z } from "zod";

export const postFormSchema = z.object({
    title: z
        .string()
        .nonempty({ message: "Title is required" })
        .min(5, { message: "Title must be at least 5 characters" }),

    excerpt: z
        .string()
        .nonempty({ message: "Excerpt is required" })
        .min(20, { message: "Excerpt must be at least 20 characters" }),

    author: z
        .string()
        .nonempty({ message: "Author is required" }),

    category: z
        .string()
        .nonempty({ message: "Category is required" }),

    tag: z.string().optional(),

    thumbnailURL: z
        .string()
        .url("Must be a valid URL")
        .optional()
        .or(z.literal("")),

    estimatedReadTime: z
        .string()
        .nonempty({ message: "Estimated read time is required" }),

    content: z
        .string()
        .nonempty({ message: "Content is required" })
        .min(200, { message: "Content must be at least 200 characters" }),
});

export type PostFormValues = z.infer<typeof postFormSchema>;

export function handlePostFormSubmit(data: PostFormValues) {
    console.log("Submitted from separate file:", data);
}
