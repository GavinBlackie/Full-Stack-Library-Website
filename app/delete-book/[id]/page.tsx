"use client";

import {PageContainer} from "@/components/page-container";
import {useParams} from "next/dist/client/components/navigation";
import {deleteBook} from "@/lib/api/book";
import {useQuery} from "@tanstack/react-query";
import {LoadingError} from "@/components/LoadingError";
import {Loading} from "@/components/Loading";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function DeleteBooksPage() {
    // Get the id variable from the page url!
    const { id } = useParams();

    // Perform async queries for the specific book to delete
    const {data, error, isLoading} = useQuery( {
       queryKey: ["books"],
       queryFn: () => deleteBook(id as string)
    });

    // Display the loading page if loading
    if (isLoading) return <Loading/>
    // Display the error page if error encountered (eg. server isn't being hosted)
    if (error) return <LoadingError msg={error.message}/>

    return (
      <PageContainer>
          <Card>
              <CardHeader>

              </CardHeader>
              <CardContent>

              </CardContent>
          </Card>
      </PageContainer>
    );
}