// books.ts - Contains all async functions to the LibraryDataServer API

import axios from 'axios';

// Inferface for the Book type
// (so we know what variables we have elsewhere)
export interface Book {
    itemId: string
    bookTitle: string,
    isAvailable: boolean,
    isbn: string,
    pageCount: number,
    lateFeeUsd: number
}

export async function fetchBooks() {
    const response = await axios.get<Book[]>("http://localhost:8080/api/books");

    return response.data;
}