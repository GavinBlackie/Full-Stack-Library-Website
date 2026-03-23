"use client";

import {PageContainer} from "@/components/page-container";
import {useParams} from "next/dist/client/components/navigation";
import {useQuery} from "@tanstack/react-query";
import {fetchBook} from "@/lib/api/bookfetchers";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowBigLeftIcon} from "lucide-react";
import {Loading} from "@/components/Loading";
import {LoadingError} from "@/components/LoadingError";

export default function BookDetails() {
    const { id } = useParams() // This gets the id path string!

    // Now create an async query for individual books
    const {data, error, isLoading} = useQuery( {
        queryKey: ["books"],
        queryFn: () => fetchBook(id as string)
    });

    // Same loading and error pages used here
    if (isLoading) return <Loading/>;
    if (error) return <LoadingError msg={error.message}/>

    return (
        <PageContainer>
            <Card>
                <CardHeader>
                    <CardTitle>{data?.bookTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                    <h3>ISBN: {data?.isbn}</h3>
                    <h3>Page Count: {data?.pageCount}</h3>
                    <h3>Availablility: {
                        data?.isAvailable ?
                        "Yes, this book is available to take!" : "No, this book is not available to take."
                    }</h3>
                    <h3>Late Fee (in USD): ${data?.lateFeeUsd}</h3>
                </CardContent>
                <CardFooter>
                    <Button className="mt-2" asChild>
                        <Link href="/">
                            <ArrowBigLeftIcon></ArrowBigLeftIcon>
                            Go Back to Book List
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </PageContainer>
    );
}