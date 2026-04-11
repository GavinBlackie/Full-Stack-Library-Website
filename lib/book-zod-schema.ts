import * as z from "zod";

// A book schema made of Zod objects (for the forms),
export const bookSchema = z.object({
    itemId: z
        .string().min(4, {message: "Book Id must be at least 4 characters"}),
    isbn: z
        .string().min(4, {message: "ISBN must have at least 4 characters"}),
    bookTitle: z
        .string().min(2, {message: "Must have at least 2 characters for title"} ),
    pageCount: z.coerce
        .number<number>("Page Count must be a number. ")
        .int("Page Count must be a whole number. ")
        .min(0, "Page Count cannot be negative. "),
    isAvailable: z
        .boolean(),
    lateFeeUsd: z.coerce
        .number<number>("Late fee must numeric. ")
        .min(0, "Area cannot be negative. "),
});