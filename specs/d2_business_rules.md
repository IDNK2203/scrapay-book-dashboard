# d2: Business Rules & Constraints

## 1. Authentication Rules

### 1.1 Auth0 Integration
| Rule ID | Rule | Implementation |
|---------|------|----------------|
| **AUTH-01** | All authentication handled by Auth0 | No custom password storage |
| **AUTH-02** | Support email/password login | Auth0 Database connection |
| **AUTH-03** | Support social login (Google, GitHub) | Auth0 Social connections |
| **AUTH-04** | JWT tokens for API authorization | Bearer token in Authorization header |
| **AUTH-05** | Token validation on backend | NestJS guard validates JWT |

### 1.2 Access Control
| Rule ID | Rule | Details |
|---------|------|---------|
| **ACCESS-01** | Public routes | `/`, `/login`, `/callback` |
| **ACCESS-02** | Protected routes | `/dashboard/*` |
| **ACCESS-03** | Unauthorized redirect | Redirect to login page |
| **ACCESS-04** | Post-login redirect | Return to originally requested page |

---

## 2. Book Entity Rules

### 2.1 Required Fields
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `id` | UUID | Auto-generated | System-managed |
| `name` | String | ✅ Yes | 1-255 characters |
| `author` | String | ✅ Yes | 1-255 characters |
| `description` | String | ❌ No | Max 1000 characters |
| `createdAt` | DateTime | Auto-generated | System-managed |
| `updatedAt` | DateTime | Auto-generated | System-managed |

### 2.2 Validation Rules
| Rule ID | Rule | Error Message |
|---------|------|---------------|
| **BOOK-01** | Name cannot be empty | "Name is required" |
| **BOOK-02** | Name max 255 chars | "Name must be 255 characters or less" |
| **BOOK-03** | Author cannot be empty | "Author is required" |
| **BOOK-04** | Author max 255 chars | "Author must be 255 characters or less" |
| **BOOK-05** | Description optional | N/A |
| **BOOK-06** | Description max 1000 chars | "Description must be 1000 characters or less" |

---

## 3. CRUD Operation Rules

### 3.1 Create Book
| Rule ID | Rule |
|---------|------|
| **CREATE-01** | User must be authenticated |
| **CREATE-02** | Required fields: name, author |
| **CREATE-03** | Validation must pass before insert |
| **CREATE-04** | Return created book with ID |

### 3.2 Read Books
| Rule ID | Rule |
|---------|------|
| **READ-01** | User must be authenticated |
| **READ-02** | Return all books (MVP - no user scoping) |
| **READ-03** | Order by createdAt descending (newest first) |

### 3.3 Update Book
| Rule ID | Rule |
|---------|------|
| **UPDATE-01** | User must be authenticated |
| **UPDATE-02** | Book must exist |
| **UPDATE-03** | All fields can be updated |
| **UPDATE-04** | Validation must pass before update |
| **UPDATE-05** | Return updated book |

### 3.4 Delete Book
| Rule ID | Rule |
|---------|------|
| **DELETE-01** | User must be authenticated |
| **DELETE-02** | Book must exist |
| **DELETE-03** | Confirmation required on frontend |
| **DELETE-04** | Return success/failure status |

---

## 4. API Response Rules

### 4.1 Success Responses
| Status | Usage |
|--------|-------|
| `200 OK` | Query/mutation successful |
| `201 Created` | Resource created |

### 4.2 Error Responses
| Code | Scenario |
|------|----------|
| `400 Bad Request` | Validation failed |
| `401 Unauthorized` | Missing/invalid token |
| `403 Forbidden` | Token valid but access denied |
| `404 Not Found` | Resource doesn't exist |
| `500 Server Error` | Unexpected error |

### 4.3 GraphQL Error Format
```json
{
  "errors": [
    {
      "message": "Human readable error",
      "extensions": {
        "code": "ERROR_CODE",
        "field": "fieldName"
      }
    }
  ]
}
```

---

## 5. UI/UX Rules

### 5.1 Form Behavior
| Rule ID | Rule |
|---------|------|
| **UI-01** | Show validation errors inline (Zod + Chakra) |
| **UI-02** | Disable submit button while submitting |
| **UI-03** | Show loading indicators during API calls |
| **UI-04** | Show success/error toast notifications |

### 5.2 Delete Confirmation
| Rule ID | Rule |
|---------|------|
| **UI-05** | Always confirm before delete |
| **UI-06** | Show book name in confirmation dialog |
| **UI-07** | Provide cancel option |

---

## 6. Security Rules

| Rule ID | Rule |
|---------|------|
| **SEC-01** | Never store passwords (Auth0 handles this) |
| **SEC-02** | Validate JWT on every protected request |
| **SEC-03** | Sanitize all user inputs |
| **SEC-04** | Use HTTPS in production |
| **SEC-05** | CORS configured for allowed origins only |
