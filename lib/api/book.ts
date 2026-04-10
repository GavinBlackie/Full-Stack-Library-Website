// book.ts - Contains all async functions to the LibraryDataServer API

import axios from 'axios';
import {Book} from "@/lib/api/booktype";

function generateURL(id?: string) : string {
    if (id) {
        return `http://localhost:8080/api/books/${id}`;
    } else {
        return "http://localhost:8080/api/books";
    }
}

export async function fetchBooks() {
    const response = await axios.get<Book[]>(generateURL());
    return response.data;
}

export async function fetchBook(id : string) {
    const response = await axios.get<Book>(generateURL(id));
    return response.data;
}

export async function deleteBook(id : string) {
    const response = await axios.delete(generateURL(id));
    return response.data;
}