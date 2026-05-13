// book.ts - Contains all async functions to the LibraryDataServer API

import axios from 'axios';
import {Book} from "@/lib/api/booktype";

function generateAPIURL(id?: string) : string {
    if (id) {
        return `http://localhost:8080/api/books/${id}`;
    } else {
        return "http://localhost:8080/api/books";
    }
}

// For fetching ALL books (GET)
export async function fetchBooks() {
    const response = await axios.get<Book[]>(generateAPIURL());

    // Sort all books by title
    response.data.sort( (a, b) => a.bookTitle.localeCompare(b.bookTitle) );

    return response.data;
}

// For fetching a CERTAIN book by id (GET)
export async function fetchBook(id : string) {
    const response = await axios.get<Book>(generateAPIURL(id));
    return response.data;
}

// For adding new books (POST)
// returns a Promise object containing information about how the POST went!
export async function addBook(book : Book): Promise<Book> {
    const response = await axios.post(generateAPIURL(),
            book,
            {
                headers: { "Content-Type" : "application/json"}
            }
        );
    return response.data;
}

// For editing existing books (PUT)
export async function editBook(book : Book) : Promise<Book> {
    const response = await axios.put(generateAPIURL(book.itemId),
            book,
            {
                headers: { "Content-Type" : "application/json"}
            }
        );
    return response.data;
}

// For deleting an existing book by its id (DELETE)
export async function deleteBook(id : string) {
    const response = await axios.delete(generateAPIURL(id));
    return response.data;
}