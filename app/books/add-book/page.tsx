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
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useMutation} from "@tanstack/react-query";
import {addBook} from "@/lib/api/book";

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
            lateFeeUsd: 0.1
        }
    });

    /* Following the pattern in CityDataClient!
    * This function will be the one actually calling the async addBook function,
    * it can also cause redirections! (in this case, it will go back to the root page!)
    */
    const { mutate } = useMutation({
        mutationFn: addBook,
        onSuccess: () => {
            console.log("POSTED");
        },
        onError: (err: Error) => {
            console.error(err);
        }
    });

    // Function that runs every time a form is submitted!
    // Might be used to trigger other things in the program unrelated to the actual form submission
    function onSubmit(data: z.infer<typeof bookSchema>) {
        console.log("Submiting: ", data);
        mutate(data); // Trigger the actual async POST mutation with the form data!
    }

    return (
        <PageContainer>
            <Card>
                <CardContent>
                <form id="newBookForm" onSubmit={form.handleSubmit(onSubmit)}>
                    <Controller
                        name="itemId"
                        control={form.control}
                        render={( {field, fieldState} ) => (
                            <Field>
                                <FieldLabel htmlFor={field.name}></FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    type="text"
                                    placeholder="BK-00"
                                />
                                <FieldDescription>
                                    Enter an item id.
                                </FieldDescription>
                                { // Conditionally render an error!
                                    fieldState.invalid && <FieldError errors={ [fieldState.error] }/>
                                }
                            </Field>
                        )}
                    />
                    <Controller
                        name="isbn"
                        control={form.control}
                        render={( {field, fieldState} ) => (
                            <Field>
                                <FieldLabel htmlFor={field.name}></FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    type="text"
                                    placeholder="999-9999"
                                />
                                <FieldDescription>
                                    Enter the book ISBN.
                                </FieldDescription>
                                { // Conditionally render an error!
                                    fieldState.invalid && <FieldError errors={ [fieldState.error] }/>
                                }
                            </Field>
                        )}
                    />
                </form>
                    {/* Footer in the Card for form buttons
                    (they don't have to be inside the form tag itself) */}
                    <CardFooter>
                        <Field>
                            <Button type="submit" form="newBookForm">
                                Submit
                            </Button>
                        </Field>
                    </CardFooter>
                </CardContent>
            </Card>
        </PageContainer>
    );
}