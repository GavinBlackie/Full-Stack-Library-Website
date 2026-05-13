"use client";

import {PageContainer} from "@/components/page-container";
import {useForm} from "react-hook-form";
import {Field} from "@/components/ui/field";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addBook} from "@/lib/api/book";
import {FormController} from "@/components/FormController";
import { useRouter } from "next/navigation"
import {ButtonGroup} from "@/components/ui/button-group";
import Link from "next/link";
import {ArrowBigRight, ArrowBigUpDash, RefreshCcwIcon} from "lucide-react";
import {bookSchema} from "@/lib/book-zod-schema";

// Reference docs for form Controllers and Fields:
// https://ui.shadcn.com/docs/forms/react-hook-form
// https://ui.shadcn.com/docs/components/radix/field

export default function AddBookPage() {

    // form variable that helps the onSubmit function,
    // it infers how to use it based on the given schema rules
    const form = useForm<z.infer<typeof bookSchema>>({
        resolver: zodResolver(bookSchema),
        defaultValues: { // Specify default form values
            itemId: "BK-01",
            isbn: "999-9999",
            bookTitle: "",
            pageCount: 1,
            isAvailable: false,
            lateFeeUsd: 0.1
        }
    });

    const queryClient = useQueryClient() // For validation stuff when a POST has been made
    const router = useRouter() // Object for rerouting user to other pages!! (eg. going back to main page)

    /* Following the pattern in CityDataClient!
    * This function will be the one actually calling the async addBook function,
    * it can also cause redirections! (in this case, it will go back to the root page!)
    */
    const { mutate } = useMutation({
        mutationFn: addBook,
        onSuccess: () => {
            console.log("POSTED new Book");
            // Invalidate any active async query (eg. any ongoing from prev pages)
            void queryClient.invalidateQueries({ queryKey: ["books"] })
            router.push("/"); // push user to main page after successful POST
        },
        onError: (err: Error) => {
            console.error(err);
        }
    });

    // Function that runs every time a form is submitted!
    // Might be used to trigger other things in the program unrelated to the actual form submission
    function onSubmit(data: z.infer<typeof bookSchema>) {
        console.log("Submitting: ", data);
        mutate(data); // Trigger the actual async POST mutation with the form data!
    }

    return (
        <PageContainer>
            <Card>
                <CardContent>
                <h1 className="my-7 mx-2 text-5xl text-green-700">Add Book</h1>

                <form id="newBookForm"
                      className="w-3/4 space-y-8"
                      onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Using my custom FormController to make things more readable and separate concerns! */}
                    <FormController name="itemId"
                                    type="text"
                                    label="Item ID"
                                    placeholder="BK-00"
                                    desc="Enter the book id. "
                                    fieldOrientation="vertical"
                                    form={form}
                    />
                    <FormController name="isbn"
                                    type="text"
                                    label="ISBN"
                                    placeholder="999-9999"
                                    desc="Enter the book ISBN. "
                                    fieldOrientation="vertical"
                                    form={form}
                    />
                    <FormController name="bookTitle"
                                    type="text"
                                    label="Book Title"
                                    placeholder="Lord of the Rings - The Fellowship of the Ring"
                                    desc="Enter book title. "
                                    fieldOrientation="vertical"
                                    form={form}
                    />
                    <FormController name="isAvailable"
                                    type="checkbox"
                                    label="Availability"
                                    desc="Is the book currently available to loan? "
                                    fieldOrientation="horizontal"
                                    form={form}
                    />
                    <FormController name="pageCount"
                                    type="number"
                                    label="Page Count"
                                    desc="Enter the page count. "
                                    placeholder="200"
                                    stepSize={1}
                                    fieldOrientation="vertical"
                                    form={form}
                    />
                    <FormController name="lateFeeUsd"
                                    type="number"
                                    label="Late Fee"
                                    desc="Enter the late fee cost in USD. "
                                    placeholder="0.00"
                                    stepSize={1}
                                    fieldOrientation="vertical"
                                    form={form}
                    />
                </form>
                    {/* Footer in the Card for form buttons
                    (they don't have to be inside the form tag itself) */}
                    <CardFooter>
                        <Field>
                            <ButtonGroup>
                                <Button
                                    className="my-2 ml-2 py-6 px-14 text-2xl bg-green-600 transform hover:bg-green-300 hover:scale-125"
                                    type="submit" form="newBookForm">
                                    <ArrowBigUpDash/>
                                    Submit
                                </Button>
                                <Button className="my-2 py-6 px-8 text-2xl bg-yellow-600 transform hover:bg-yellow-500 hover:scale-110"
                                    onClick={ () => {form.reset()}}>
                                    <RefreshCcwIcon/>Reset
                                </Button>
                                <Button className="my-2 mr-2 py-6 px-14 text-2xl bg-red-700 transform hover:bg-red-400 hover:scale-125"
                                    asChild variant="outline">
                                    <Link className="text-white hover:text-white" href="/">
                                        <ArrowBigRight/>
                                        Cancel
                                    </Link>
                                </Button>
                            </ButtonGroup>
                        </Field>
                    </CardFooter>
                </CardContent>
            </Card>
        </PageContainer>
    );
}