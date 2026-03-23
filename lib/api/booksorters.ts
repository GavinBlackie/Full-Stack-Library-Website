// This website, plus the in-class lectures helped me understand how to
// use custom sort functions in JS/TS !!!
// https://www.geeksforgeeks.org/typescript/how-to-sort-an-array-in-typescript/

import {Book} from "@/lib/api/booktype";

// Sorts an array of Book interfaces by title!!
export function sortByTitle( bookArr? : Array<Book> )  {
    return bookArr?.sort( (a, b) => b.bookTitle.localeCompare(a.bookTitle) );
}

// Sorts books by their pageCount attribute
export function sortByPageCount( bookArr? : Array<Book> )  {
    return bookArr?.sort( (a, b) => b.pageCount - a.pageCount);
}