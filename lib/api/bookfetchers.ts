// bookfetchers.ts - Contains all async functions to the LibraryDataServer API

import axios from 'axios';
import {Book} from "@/lib/api/booktype";

export async function fetchBooks() {
    const response = await axios.get<Book[]>("http://localhost:8080/api/books");

    return response.data;
}

export async function fetchBook(id : string) {
    const response = await axios.get<Book>(`http://localhost:8080/api/books/${id}`)

    return response.data;
}