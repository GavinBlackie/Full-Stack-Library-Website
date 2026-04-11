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
import {ArrowBigRight, BookTextIcon, Trash2Icon} from "lucide-react";

import "../../BookDetailStyles.css";
import {GenericBookSummary} from "@/components/GenericBookSummary";
import {useRouter} from "next/navigation";
import * as z from "zod";
import {Button} from "@/components/ui/button";
import {bookSchema} from "@/lib/book-zod-schema";
import {ButtonGroup} from "@/components/ui/button-group";
import Link from "next/link";

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
                  <ButtonGroup>
                      <Button className="my-2 ml-2 py-6 px-14 text-2xl bg-red-900 transform hover:bg-red-700 hover:scale-125"
                          onClick={() => {mutate(id as string) } // Mutate by known id instead of data.itemId (which takes async time to get)
                            }
                      >
                          <Trash2Icon/>
                          Delete
                      </Button>

                      <Button className="my-2 mr-2 py-6 px-14 text-2xl bg-yellow-600 transform hover:bg-yellow-500 hover:scale-125"
                              asChild variant="outline">
                          <Link className="text-white transform hover:text-white" href="/">
                              <ArrowBigRight/>
                              Cancel
                          </Link>
                      </Button>
                  </ButtonGroup>
              </CardFooter>
          </Card>
      </PageContainer>
    );
}