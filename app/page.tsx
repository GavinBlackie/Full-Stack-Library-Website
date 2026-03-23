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

export default function Home() {

  // fetch(`http://localhost:8080/api/books`)
  //     .then(response => response.json())
  //     .then(data => console.log(data) )
  //     .catch(error => console.error(error))

  const {data, error, isLoading} = useQuery( {
    queryKey: ["books"],
    queryFn: fetchBooks
  });

  console.log(data);

  // Cases that content is not currently ready!:
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>

  // Default return (content is verified to exist)
  return (
    <div>
      <Card>
        <CardContent>
          <p>"I like reading books" - Spongebob Squarepants!</p>
          <Button>Click Me</Button>
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
            <TableHead className="text-right">Available</TableHead>
            <TableHead>Late Fee in USD</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Where Books will go! */}
          <TableRow>
            <TableCell className="font-medium">The Silent Algorithm</TableCell>
            <TableCell>978-01</TableCell>
            <TableCell>450</TableCell>
            <TableCell className="text-right">Yes</TableCell>
            <TableCell>$2.5</TableCell>
          </TableRow>
        </TableBody>
      </Table>

    </div>
  );
}
