# d5: API Specification (GraphQL)

## 1. Schema Overview

### 1.1 Types
```graphql
"""
Represents a book in the collection
"""
type Book {
  id: ID!
  name: String!
  author: String!
  description: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""
Custom scalar for date-time values
"""
scalar DateTime
```

### 1.2 Queries
```graphql
type Query {
  """
  Get all books, ordered by creation date (newest first)
  Requires: Authentication
  """
  books: [Book!]!
  
  """
  Get a single book by ID
  Requires: Authentication
  """
  book(id: ID!): Book
}
```

### 1.3 Mutations
```graphql
type Mutation {
  """
  Create a new book
  Requires: Authentication
  """
  createBook(input: CreateBookInput!): Book!
  
  """
  Update an existing book
  Requires: Authentication
  Returns: Updated book, or null if not found
  """
  updateBook(id: ID!, input: UpdateBookInput!): Book
  
  """
  Delete a book by ID
  Requires: Authentication
  Returns: true if deleted, false if not found
  """
  deleteBook(id: ID!): Boolean!
}
```

### 1.4 Input Types
```graphql
"""
Input for creating a new book
"""
input CreateBookInput {
  name: String!
  author: String!
  description: String
}

"""
Input for updating an existing book
All fields are optional (partial update)
"""
input UpdateBookInput {
  name: String
  author: String
  description: String
}
```

---

## 2. Operation Examples

### 2.1 Get All Books
```graphql
query GetBooks {
  books {
    id
    name
    author
    description
    createdAt
  }
}
```

**Response:**
```json
{
  "data": {
    "books": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "description": "A novel about the American Dream",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

### 2.2 Get Single Book
```graphql
query GetBook($id: ID!) {
  book(id: $id) {
    id
    name
    author
    description
  }
}
```

**Variables:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

### 2.3 Create Book
```graphql
mutation CreateBook($input: CreateBookInput!) {
  createBook(input: $input) {
    id
    name
    author
    description
    createdAt
  }
}
```

**Variables:**
```json
{
  "input": {
    "name": "1984",
    "author": "George Orwell",
    "description": "A dystopian novel"
  }
}
```

### 2.4 Update Book
```graphql
mutation UpdateBook($id: ID!, $input: UpdateBookInput!) {
  updateBook(id: $id, input: $input) {
    id
    name
    author
    description
    updatedAt
  }
}
```

**Variables:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "input": {
    "description": "Updated description"
  }
}
```

### 2.5 Delete Book
```graphql
mutation DeleteBook($id: ID!) {
  deleteBook(id: $id)
}
```

---

## 3. Error Handling

### 3.1 Error Response Format
```json
{
  "errors": [
    {
      "message": "Human-readable error message",
      "locations": [{ "line": 1, "column": 1 }],
      "path": ["mutationName"],
      "extensions": {
        "code": "ERROR_CODE",
        "field": "fieldName"
      }
    }
  ],
  "data": null
}
```

### 3.2 Error Codes
| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHENTICATED` | 401 | Missing or invalid token |
| `FORBIDDEN` | 403 | Valid token but insufficient permissions |
| `BAD_USER_INPUT` | 400 | Validation failed |
| `NOT_FOUND` | 404 | Resource not found |
| `INTERNAL_SERVER_ERROR` | 500 | Unexpected server error |

---

## 4. Authentication

### 4.1 Request Headers
All protected operations require the Authorization header:

```http
Authorization: Bearer <jwt_access_token>
```

### 4.2 JWT Payload (from Auth0)
```json
{
  "iss": "https://your-tenant.auth0.com/",
  "sub": "auth0|user_id",
  "aud": "https://scrapay-books-api",
  "iat": 1704067200,
  "exp": 1704153600
}
```

---

## 5. GraphQL Endpoint

| Environment | URL |
|-------------|-----|
| Development | `http://localhost:3000/graphql` |
| Production | `https://your-api.onrender.com/graphql` |

### 5.1 GraphQL Playground
Available in development at: `http://localhost:3000/graphql`
