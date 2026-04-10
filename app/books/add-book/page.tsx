"use client";

import {PageContainer} from "@/components/page-container";
import {useForm} from "react-hook-form";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field";
import {Controller} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Card, CardContent} from "@/components/ui/card";

// A book schema made of Zod objects (for the forms),
const bookSchema = z.object({
    itemId: z
        .string(),
    isbn: z
        .string(),
    bookTitle: z
        .string(),
    pageCount: z
        .int().positive(),
    available: z
        .boolean(),
    lateFeeUsd: z
        .float64()
});

// Reference docs for form Controllers and Fields:
// https://ui.shadcn.com/docs/forms/react-hook-form
// https://ui.shadcn.com/docs/components/radix/field

export default function AddBookPage() {

    // form variable that helps the onSubmit function,
    // it infers how to use it based on the given schema rules
    const form = useForm<z.infer<typeof bookSchema>>({
        resolver: zodResolver(bookSchema),
        defaultValues: { // Specify default form values
            itemId: "BK-00",
            isbn: "999-9999",
            bookTitle: "",
            pageCount: 1,
            available: false,
            lateFeeUsd: 0
        }
    });

    function onSubmit(data: z.infer<typeof bookSchema>) {
        console.log("Submiting: ", data);
    }

    return (
        <PageContainer>
            <Card>
                <CardContent>
                <form>
                    <Controller
                        name="itemId"
                        control={form.control}
                        >
                        <Field>

                        </Field>
                    </Controller>
                </form>
                </CardContent>
            </Card>
        </PageContainer>
    );
}