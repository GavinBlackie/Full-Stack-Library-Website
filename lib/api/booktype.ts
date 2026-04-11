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