# d1: Product Requirements Document (PRD)

## 1. Overview

### 1.1 Product Vision
Build a modern, full-stack Book Management Dashboard featuring:
- NestJS backend with GraphQL API
- React frontend with Chakra UI
- Auth0 integration (social + password login)
- SQLite database with Prisma ORM
- Clean architecture and TypeScript throughout

---

## 2. Goals & Success Metrics

### 2.1 Primary Goals
| Goal | Description | Success Criteria |
|------|-------------|------------------|
| **G1** | Functional Auth | Users can sign up, sign in, and sign out via Auth0 |
| **G2** | CRUD Operations | Full book management capabilities |
| **G3** | Protected Routes | Dashboard accessible only to authenticated users |
| **G4** | Production Ready | Deployed and accessible via public URL |

### 2.2 Success Metrics
- ✅ All CRUD operations work without errors
- ✅ Auth flow completes in < 3 seconds
- ✅ Responsive UI works on mobile and desktop
- ✅ No console errors in production build

---

## 3. User Personas

### 3.1 Primary User: Authenticated User
- **Role**: Authenticated user with book management access
- **Goals**: Manage personal book collection (view, add, edit, delete)
- **Access**: Full CRUD via protected dashboard

### 3.2 Secondary User: Guest
- **Role**: Unauthenticated visitor
- **Goals**: View landing/login page
- **Access**: Public pages only, redirected to login for protected routes

---

## 4. Scope

### 4.1 In Scope (MVP)

#### Authentication
- [x] Sign up (new user registration via Auth0)
- [x] Sign in (email/password + social login via Auth0)
- [x] Sign out
- [x] Protected route guards

#### Book Management
- [x] View list of books (table/grid)
- [x] Add new book (name, author, description)
- [x] Edit existing book
- [x] Delete book (with confirmation)

#### Technical Requirements
- [x] GraphQL API (queries + mutations)
- [x] SQLite database with Prisma
- [x] TypeScript throughout
- [x] Chakra UI for styling
- [x] Mobile-responsive UI

### 4.2 Out of Scope
- ❌ Book search/filtering (nice-to-have)
- ❌ Book categories/tags
- ❌ Book cover images
- ❌ User roles/permissions
- ❌ Social features (sharing, comments)
- ❌ Pagination (can add if time permits)

---

## 5. Constraints

### 5.1 Technical Constraints
| Constraint | Requirement |
|------------|-------------|
| Backend | NestJS + GraphQL |
| Frontend | React (Vite preferred) |
| Database | SQLite |
| Auth | Auth0 |
| Language | TypeScript |

### 5.2 Timeline Constraints
- **Week 1**: Complete development and deployment
- **No extensions**: Assessment deadline is fixed

### 5.3 Hosting Constraints
- Must use free tier hosting services
- Options: Netlify (frontend), Render/Fly (backend)

---

## 6. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Auth0 setup complexity | High | Follow official docs, use Universal Login |
| GraphQL learning curve | Medium | Use code-first approach with NestJS |
| Free hosting limitations | Medium | Test deployment early in development |
| Time constraints | High | Focus on MVP, skip nice-to-haves |

---

## 7. Definition of Done

A feature is considered **DONE** when:
1. ✅ Code is written and compiles without errors
2. ✅ Feature works as specified
3. ✅ Code follows TypeScript best practices
4. ✅ UI is responsive (mobile + desktop)
5. ✅ No console errors in browser
6. ✅ Committed with conventional commit message
