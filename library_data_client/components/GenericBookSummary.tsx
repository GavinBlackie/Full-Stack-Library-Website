import {Book} from "@/lib/api/booktype";

type genericBookSummaryProps = {
    data : Book | undefined
}

// Reusable function for Book data about a specific book
export function GenericBookSummary( {data} : genericBookSummaryProps){
    return (
        <>
            <h3>ISBN: {data?.isbn}</h3>
            <h3>Page Count: {data?.pageCount}</h3>
            <h3>Availability: {
                data?.isAvailable ?
                    "Yes, this book is available to take!" : "No, this book is not available to take."
            }</h3>
            <h3>Late Fee (in USD): ${data?.lateFeeUsd}</h3>
        </>
    );
}