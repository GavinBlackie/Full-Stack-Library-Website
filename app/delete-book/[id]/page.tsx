"use client";

import {PageContainer} from "@/components/page-container";
import {useParams} from "next/dist/client/components/navigation";
import {deleteBook, fetchBook} from "@/lib/api/book";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {LoadingError} from "@/components/LoadingError";
import {Loading} from "@/components/Loading";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {BookTextIcon} from "lucide-react";

import "../../BookDetailStyles.css";
import {GenericBookSummary} from "@/components/GenericBookSummary";
import {useRouter} from "next/navigation";
import * as z from "zod";
import {Button} from "@/components/ui/button";
import {bookSchema} from "@/lib/book-zod-schema";

export default function DeleteBooksPage() {
    // Get the id variable from the page url!
    const { id } = useParams();

    // Perform async queries for the specific book to delete
    const {data, error, isLoading} = useQuery( {
       queryKey: ["books"],
       queryFn: () => fetchBook(id as string)
    });

    const queryClient = useQueryClient() // For validation stuff when a POST has been made
    const router = useRouter() // Object for rerouting user to other pages!! (eg. going back to main page)

    // Mutate similarly to add-book, but with the deleteBook API function!
    const { mutate } = useMutation({
        mutationFn: deleteBook,
        onSuccess: () => {
            console.log("DELETED a book");
            void queryClient.invalidateQueries({ queryKey: ["books"] });
            router.push("/");
        },
        onError: (err: Error) => {
            console.error(err);
        }
    });

    // Display the loading page if loading
    if (isLoading) return <Loading/>
    // Display the error page if error encountered (eg. server isn't being hosted)
    if (error) return <LoadingError msg={error.message}/>

    return (
      <PageContainer>
          <Card className="card size-130 border-accent">
              <CardHeader>
                  <CardTitle className="title"> <BookTextIcon className="inline"/> {data?.bookTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                    <GenericBookSummary data={data}/>
              </CardContent>
              <CardFooter>
                    <Button onClick={() => {
                        mutate(id as string) } // Mutate by known id instead of data.itemId (which takes async time to get)
                    }>Delete</Button>
              </CardFooter>
          </Card>
      </PageContainer>
    );
}