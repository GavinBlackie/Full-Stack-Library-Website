"use client"

import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {fetchBooks} from "@/lib/api/bookfetchers";
import {Book} from "@/lib/api/booktype";
import {sortByPageCount, sortByTitle} from "@/lib/api/booksorters"
import {PageContainer} from "@/components/page-container";

export default function Home() {

  // Maintain a query that fetches books from the LibraryDataService API!
  const {data, error, isLoading} = useQuery( {
    queryKey: ["books"],
    queryFn: fetchBooks
  });

  // Cases that content is not currently ready! - will display different stuff:
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>

  // https://www.geeksforgeeks.org/typescript/how-to-sort-an-array-in-typescript/
  data?.sort( (a, b) => b.pageCount - a.pageCount);

  // Default return (content is verified to exist)
  return (
    <PageContainer>
      <Card>
        <CardContent>
          <p>&quot;I like reading books&quot; - Spongebob Squarepants!</p>
        </CardContent>
      </Card>

      {/* A Table for data on Books
         (Started using a template given on shadcn docs)
       */}
      <Table>
        <TableCaption>A list of all library books.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Page Count</TableHead>
            <TableHead>Available</TableHead>
            <TableHead>Late Fee in USD</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* ----- Section where Books will go! ----- */}

          { // Simple default row (for testing)
            data==null ? <TableRow>
            <TableCell className="font-medium">The Silent Algorithm</TableCell>
            <TableCell>978-01</TableCell>
            <TableCell>450</TableCell>
            <TableCell>Yes</TableCell>
            <TableCell>$2.5</TableCell>
          </TableRow> : <></>
          }

          {/* Map all Book JSON in the data object
              to corresponding table cells!!! */

              // "For every book in books, create/map
              // corresponding markup" - me
              // (use ternary operator for the boolean value!!!)
              data?.map( (book: Book) => (
                  <TableRow key={book.itemId}>

                    <TableCell>{book.bookTitle}</TableCell>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell>{book.pageCount}</TableCell>
                    <TableCell>{book.isAvailable ? "Yes" : "No"}</TableCell>
                    <TableCell>{book.lateFeeUsd}</TableCell>

                  </TableRow>
                  )
              )
          }

        </TableBody>
      </Table>

      {/* Some Buttons for Sorting the daperta! */}
      <div>
        <Button onClick={() => {data?.sort( (a, b) => b.bookTitle.localeCompare(a.bookTitle) )} }>Sort By Title</Button>
        <Button onClick={() => data = sortByPageCount(data)}>Sort By Page Count</Button>
        <Button >Sort By Availability</Button>
        <Button >Sort By Fees</Button>
      </div>

    </PageContainer>
  );
}
