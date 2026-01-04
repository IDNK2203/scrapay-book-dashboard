# d10: Development Roadmap

## Story Overview

| ID | Story Title | Complexity | Est. Hours | Status |
|----|-------------|------------|------------|--------|
| **Phase 1: Foundation** |
| 1.0 | Git & GitHub Setup | Simple | 0.5h | ✅ Completed |
| 1.1 | Project Scaffolding | Simple | 1-2h | ✅ Completed |
| 1.2 | Database Setup (Prisma + SQLite) | Simple | 1-2h | ✅ Completed |
| 1.3 | GraphQL API Foundation | Moderate | 3-4h | ✅ Completed |
| **Phase 2: Authentication** |
| 2.1 | Auth0 Backend Integration | Complex | 4-6h | ✅ Completed |
| 2.2 | Auth0 Frontend Integration | Moderate | 3-4h | ✅ Completed |
| 2.3 | Protected Routes & Guards | Moderate | 2-3h | ✅ Completed |
| **Phase 3: Core Features** |
| 3.1 | Book Listing | Moderate | 2-3h | ✅ Completed |
| 3.2 | Book Creation | Moderate | 2-3h | ✅ Completed |
| 3.3 | Book Editing | Moderate | 2-3h | ✅ Completed |
| 3.4 | Book Deletion | Simple | 1-2h | ✅ Completed |
| **Phase 4: Polish & Deploy** |
| 4.1 | UI Polish & Responsiveness | Simple | 2-3h | ✅ Completed |
| 4.2 | Error Handling | Simple | 2-3h | ⬜ Not Started |
| 4.3 | Deployment (Vercel + Render) | Moderate | 2-4h | ⬜ Not Started |

**Total Estimated Time**: 28-42 hours

---

## Phase 1: Foundation

### Story 1.0: Git & GitHub Setup

**Complexity**: Simple

#### Description
Initialize Git repository and push to GitHub.

#### Acceptance Criteria
- [ ] Git initialized in project root
- [ ] Initial commit with project structure
- [ ] GitHub repository created
- [ ] Code pushed to `main` branch

#### Tasks
1. Run `git init` in project root
2. Create GitHub repository
3. Add remote origin
4. Initial commit and push

---

### Story 1.1: Project Scaffolding

**Complexity**: Simple

#### Description
Initialize the monorepo with NestJS backend and Vite React frontend with Chakra UI.

#### Acceptance Criteria
- [ ] NestJS project initialized in `/server`
- [ ] Vite + React + TypeScript project in `/client`
- [ ] Chakra UI installed and configured
- [ ] Both projects compile without errors
- [ ] Dev servers start successfully

#### Tasks
1. Initialize NestJS project with `@nestjs/cli`
2. Initialize Vite project with React + TypeScript template
3. Install and configure Chakra UI
4. Verify dev servers work correctly

---

### Story 1.2: Database Setup (Prisma + SQLite)

**Complexity**: Simple

#### Description
Set up Prisma with SQLite and create the Book model.

#### Acceptance Criteria
- [ ] Prisma installed and configured
- [ ] Book model created in schema.prisma
- [ ] Initial migration generated
- [ ] Prisma Client generated

#### Tasks
1. Install Prisma dependencies
2. Initialize Prisma with SQLite
3. Create Book model
4. Run initial migration
5. Generate Prisma Client

---

### Story 1.3: GraphQL API Foundation

**Complexity**: Moderate

#### Description
Set up GraphQL with Apollo Server and implement Book CRUD resolvers.

#### Acceptance Criteria
- [ ] GraphQL module configured (code-first approach)
- [ ] Books resolver with all queries and mutations
- [ ] Books service with Prisma operations
- [ ] GraphQL Playground accessible at `/graphql`
- [ ] All operations work without authentication (temp)

#### Tasks
1. Install GraphQL and Apollo dependencies
2. Configure GraphQL module
3. Create Books module structure
4. Implement resolver with query/mutation handlers
5. Implement service with Prisma operations
6. Test all operations via Playground

---

## Phase 2: Authentication

### Story 2.1: Auth0 Backend Integration

**Complexity**: Complex

#### Description
Integrate Auth0 JWT validation on the NestJS backend.

#### Acceptance Criteria
- [ ] Passport JWT strategy configured for Auth0
- [ ] JWT tokens validated against Auth0 JWKS
- [ ] AuthGuard created and tested
- [ ] Protected routes require valid token
- [ ] Unauthorized requests return 401

#### Tasks
1. Configure Auth0 API in dashboard
2. Enable social connections (Google, GitHub)
3. Install passport and JWT dependencies
4. Create JWT strategy with Auth0 configuration
5. Create AuthGuard
6. Apply guard to Books resolver
7. Test with valid and invalid tokens

---

### Story 2.2: Auth0 Frontend Integration

**Complexity**: Moderate

#### Description
Integrate Auth0 React SDK for login/logout functionality with social login.

#### Acceptance Criteria
- [ ] Auth0Provider configured with correct settings
- [ ] Login page with email/password and social buttons
- [ ] Callback page handles Auth0 redirect
- [ ] User can sign out
- [ ] Access token available for API requests

#### Tasks
1. Configure Auth0 SPA in dashboard
2. Install @auth0/auth0-react
3. Configure Auth0Provider in App
4. Create Login page with Chakra UI
5. Create Callback component
6. Test complete auth flow (email + social)

---

### Story 2.3: Protected Routes & Guards

**Complexity**: Moderate

#### Description
Implement route protection and authenticated API client.

#### Acceptance Criteria
- [ ] Dashboard route protected (redirects if not authenticated)
- [ ] Apollo Client configured with auth header
- [ ] Token automatically attached to GraphQL requests
- [ ] Unauthenticated users redirected to login

#### Tasks
1. Create ProtectedRoute component
2. Configure Apollo Client with auth link
3. Implement token handling
4. Test protected route behavior

---

## Phase 3: Core Features

### Story 3.1: Book Listing

**Complexity**: Moderate

#### Description
Display books in a table on the Dashboard using Chakra UI.

#### Acceptance Criteria
- [ ] Books fetched from GraphQL API
- [ ] Chakra Table displays: Name, Author, Description, Actions
- [ ] Loading state while fetching
- [ ] Empty state when no books
- [ ] Error state on API failure

#### Tasks
1. Create GraphQL Books query
2. Create BookTable component with Chakra UI
3. Implement loading skeleton
4. Implement empty state UI
5. Make table responsive for mobile

---

### Story 3.2: Book Creation

**Complexity**: Moderate

#### Description
Implement add book form with Zod validation and Chakra UI.

#### Acceptance Criteria
- [ ] Add Book button opens modal
- [ ] Form has name, author, description fields
- [ ] Zod validation with error display
- [ ] Submit calls GraphQL mutation
- [ ] Success closes modal and refreshes list

#### Tasks
1. Create Zod validation schema
2. Create BookForm component with react-hook-form
3. Create Modal with Chakra UI
4. Create GraphQL createBook mutation
5. Wire up form submission
6. Handle success/error states

---

### Story 3.3: Book Editing

**Complexity**: Moderate

#### Description
Implement edit book functionality.

#### Acceptance Criteria
- [ ] Edit button opens modal with book data
- [ ] Form pre-filled with existing values
- [ ] Submit calls updateBook mutation
- [ ] List refreshes on success

#### Tasks
1. Add edit button to table row
2. Create EditBook modal state
3. Implement updateBook mutation
4. Wire up form for editing
5. Test update flow

---

### Story 3.4: Book Deletion

**Complexity**: Simple

#### Description
Implement delete with confirmation using Chakra AlertDialog.

#### Acceptance Criteria
- [ ] Delete button shows confirmation dialog
- [ ] Confirmation shows book name
- [ ] Cancel closes dialog without action
- [ ] Confirm calls deleteBook mutation
- [ ] List refreshes on success

#### Tasks
1. Create DeleteConfirmation with Chakra AlertDialog
2. Implement deleteBook mutation
3. Wire up delete button
4. Test delete flow

---

## Phase 4: Polish & Deploy

### Story 4.1: UI Polish & Responsiveness

**Complexity**: Simple

#### Description
Finalize visual design and mobile responsiveness with Chakra UI.

#### Acceptance Criteria
- [ ] Consistent Chakra theme applied
- [ ] Mobile layout works correctly
- [ ] Loading/hover states polished
- [ ] Transitions smooth

#### Tasks
1. Create custom Chakra theme (optional)
2. Review and refine styling
3. Test on various screen sizes
4. Fix any layout issues

---

### Story 4.2: Error Handling

**Complexity**: Simple

#### Description
Implement comprehensive error handling with Chakra toasts.

#### Acceptance Criteria
- [ ] Toast notifications for success/error
- [ ] Form validation errors displayed inline
- [ ] Network errors handled gracefully
- [ ] Auth errors redirect appropriately

#### Tasks
1. Configure Chakra toast system
2. Review all error paths
3. Add user-friendly error messages
4. Test error scenarios

---

### Story 4.3: Deployment (Vercel + Render)

**Complexity**: Moderate

#### Description
Deploy frontend to Vercel and backend to Render.

#### Acceptance Criteria
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render
- [ ] Environment variables configured
- [ ] Production Auth0 settings applied
- [ ] Application works end-to-end

#### Tasks
1. Create Vercel project and deploy frontend
2. Create Render project and deploy backend
3. Configure production environment variables
4. Update Auth0 for production URLs
5. Test end-to-end in production

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ⬜ | Not Started |
| 🔄 | In Progress |
| ✅ | Completed |
| ❌ | Blocked |
| ⏸️ | Paused |

---

## Notes

- Stories should be completed in order within each phase
- Phase 2 (Auth) must be complete before Phase 3 (Features)
- Each story should have its planning doc in `/drafts/stories/`
- Update this document as stories progress
