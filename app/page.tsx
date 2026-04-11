"use client"

import { useQuery } from "@tanstack/react-query"
import {
  Card,
  CardContent,
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
import {fetchBooks} from "@/lib/api/book";
import {Book} from "@/lib/api/booktype";
import {PageContainer} from "@/components/page-container";
import {Loading} from "@/components/Loading";
import {LoadingError} from "@/components/LoadingError";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import Image from "next/image";
import "./MainPageStyles.css";
import {HammerIcon, LibraryBigIcon, SettingsIcon, Trash2Icon, WrenchIcon} from "lucide-react";
import {useMemo, useState} from "react";

export default function Home() {
    const [sortDataKey, setSortDataKey] = useState<string>("title");

  // Maintain a query that fetches books from the LibraryDataService API!
  const {data, error, isLoading} = useQuery( {
    queryKey: ["books"],
    queryFn: fetchBooks
  });

    // --- Credit to Perplexity AI for helping me find out how to sort things!! ---
    // https://www.perplexity.ai/search/in-react-nextjs-typescript-how-PrQNTXYhS7GXFZw.ASsU7Q?sm=d
    const displayBooks = useMemo(() => {
        if (!Array.isArray(data)) return [];

        return [...data].sort((a, b) => {

            // Perform various sorting operations depending on the sorting key!!
            // (I made these sort statements with help from here for the bool one:
            // https://www.geeksforgeeks.org/javascript/sort-an-array-of-objects-using-boolean-property-in-javascript/)
            // Also for some reason, switch statements do not work here!
            if (sortDataKey == "title") return a.bookTitle.localeCompare(b.bookTitle);
            else if (sortDataKey == "isbn") return a.isbn.localeCompare(b.isbn);
            else if (sortDataKey == "pageCount") return a.pageCount - b.pageCount;
            else if (sortDataKey == "available") return (a.isAvailable === b.isAvailable)? 0 : a.isAvailable? -1 : 1;
            else if (sortDataKey == "lateFeeUsd") return a.lateFeeUsd - b.lateFeeUsd;

            return a.bookTitle.localeCompare(b.bookTitle); // default to sorting by title
        });
    }, [data, sortDataKey]);
    // ---------

  // Cases that content is not currently ready! - will display different stuff:
  if (isLoading) return <Loading/>;
  if (error) return <LoadingError msg={error.message}/>

  // Default return (content is verified to exist)
  return (
    <PageContainer>

      <div>
        <LibraryBigIcon className="size-24"/>
        <h1 className="title">Library Data Viewer</h1>
      </div>

      <h4>Welcome to the best webpage for viewing the best library books!</h4>

      {/* A Table for data on Books
         (Started using a template given on shadcn docs)
       */}
      <Table>
        <TableCaption>
            A list of all library books. Click the trash can icon to delete entries,
            the wrench to edit book entries, and the column headers to sort them in ascending order.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">
                <Button onClick={ () => setSortDataKey("title")}>
                    Title
                </Button>
            </TableHead>
            <TableHead>
                <Button onClick={ () => setSortDataKey("isbn")}>
                    ISBN
                </Button>
            </TableHead>
            <TableHead>
                <Button onClick={ () => setSortDataKey("pageCount")}>
                    Page Count
                </Button>
            </TableHead>
            <TableHead>
                <Button onClick={ () => setSortDataKey("available")}>
                    Available
                </Button>
            </TableHead>
            <TableHead>
                <Button onClick={ () => setSortDataKey("lateFeeUsd")}>
                    Late Fee in USD
                </Button>
            </TableHead>
            <TableHead><SettingsIcon/>Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* ----- Section where Books will go! ----- */}

          { // Simple default row (for testing)
            data==null ? <TableRow className="tableRow">
            <TableCell className="font-medium">The Silent Algorithm</TableCell>
            <TableCell>978-01</TableCell>
            <TableCell>450</TableCell>
            <TableCell>Yes</TableCell>
            <TableCell>$2.5</TableCell>
          </TableRow> : <></>
          }

          {/* Map all Book JSON in the data object
              to corresponding table cells!!! */

            // This is needed for some reason to allow returning to main page
              Array.isArray(displayBooks) &&

                // "For every book in books, create/map
                // corresponding markup" - me
                // (use ternary operator for the boolean value!!!)
                displayBooks?.map( (book: Book) => (
                    <TableRow className="tableRow" key={book.itemId}>
                        <TableCell>
                          <Button variant="link" asChild>
                            <Link href={`/books/${book.itemId}`}>{book.bookTitle}</Link>
                          </Button>
                        </TableCell>
                        <TableCell>{book.isbn}</TableCell>
                        <TableCell>{book.pageCount}</TableCell>
                        <TableCell>{book.isAvailable ? "Yes" : "No"}</TableCell>
                        <TableCell>{book.lateFeeUsd}</TableCell>
                        <TableCell>
                            <Button className="m-1 py-2 px-4 bg-red-900 transform hover:bg-red-700 hover:scale-125">
                                <Link href={`/delete-book/${book.itemId}`}>
                                    <Trash2Icon/>
                                </Link>
                            </Button>
                            <Button className="m-1 py-2 px-4 bg-cyan-600 transform hover:bg-cyan-500 hover:scale-125">
                                <Link href={`/edit-book/${book.itemId}`}>
                                    <WrenchIcon/>
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))
          }

        </TableBody>
      </Table>

        <div>
            <Button className="m-2 py-6 px-14 text-2xl bg-green-600 transform hover:bg-green-300 hover:scale-125" asChild>
                <Link href="/add-book"> <HammerIcon/> Add Book</Link>
            </Button>
        </div>

      <div className="decorationCardSection">
      <Card className="card">
        <CardContent>
          <Image className="w-full h-auto"
                 src={"/spongebob_book.jpg"}
                 alt="Image of Spongebob reading a book"
                 width={200}
                 height={150}
          />
          <p>&quot;I like reading books&quot; - Spongebob Squarepants!</p>
        </CardContent>
      </Card>

      <Card className="card">
        <CardContent>
          <Image className="w-full h-auto"
                src={"/patrick_reading.jpg"}
                 width={200}
                 height={150}
                 alt="Image of Spongebob reading a book"
          />
          <p>&quot;I can&apos;t read&quot; - Patrick Star</p>
        </CardContent>
      </Card>
      </div>

    </PageContainer>
  );
}
