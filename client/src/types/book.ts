export interface Book {
  id: string;
  name: string;
  author: string;
  description?: string;
}

export interface GetBooksData {
  books: Book[];
}

export interface CreateBookInput {
  name: string;
  author: string;
  description?: string;
}

export interface UpdateBookInput {
  name?: string;
  author?: string;
  description?: string;
}
