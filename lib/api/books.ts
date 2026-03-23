// books.ts - Contains all async functions to the LibraryDataServer API

export async function fetchBooks() {
    const response = await fetch("http://localhost:8080/api/books");

    if (!response.ok) throw new Error("Failed to fetch book data.");

    return response.json();
}