# Scrapay - Book Management Dashboard

A modern, full-stack book management application featuring a premium dark-mode interface, secure authentication, and a seamless user experience.

![Tech Stack](https://img.shields.io/badge/React-18-blue?logo=react)
![NestJS](https://img.shields.io/badge/NestJS-11-red?logo=nestjs)
![GraphQL](https://img.shields.io/badge/GraphQL-API-e10098?logo=graphql)
![Auth0](https://img.shields.io/badge/Auth0-Secured-orange?logo=auth0)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

## 🌐 Live Demo

- **Frontend**: [scrapay-book-dashboard.vercel.app](https://scrapay-book-dashboard.vercel.app/)
- **Backend API**: [scrapay-book-dashboard.onrender.com/graphql](https://scrapay-book-dashboard.onrender.com/graphql)

---

## ✨ Features

### Core Functionality
- **Secure Authentication** — Sign up and sign in via Auth0 (Google OAuth or email/password)
- **Book Management** — Full CRUD operations (Create, Read, Update, Delete)
- **User-Scoped Data: Authorization** — Each user's books are private and isolated
- **Real-time UI** — Instant feedback with optimistic updates

### User Experience
- **Premium Dark Theme** — Sleek monochrome design with vibrant orange accents
- **Animated Hero Section** — Floating 3D books, aurora effects, and particle animations
- **Responsive Layout** — Mobile-first design with collapsible sidebar
- **Toast Notifications** — Success/error feedback for all operations
- **Search & Filter** — Quickly find books by title or author

### Technical Excellence
- **Type-Safe API** — GraphQL with auto-generated TypeScript types
- **Modular Architecture** — Clean separation of concerns across both frontend and backend
- **Code Quality** — Extracted styles, centralized GraphQL operations, no dead code
- **Secure by Default** — JWT validation, authorized-only API access

---

## 🏗️ Architecture

```
scrapay-book-dashboard/
├── client/                 # React + Vite Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── hero/       # Animated hero background
│   │   │   ├── layout/     # AppShell, Sidebar
│   │   │   └── ui/         # BookCard, BookGrid, SearchBar
│   │   ├── hooks/          # Custom React hooks (useNotify)
│   │   ├── lib/            # Apollo client, GraphQL operations
│   │   ├── pages/          # Route components
│   │   ├── theme/          # CSS variables, animations, extracted styles
│   │   └── types/          # TypeScript interfaces
│   └── ...
│
├── server/                 # NestJS Backend
│   ├── src/
│   │   ├── auth/           # JWT strategy, GraphQL auth guard
│   │   ├── books/          # Book module (resolver, service, DTOs)
│   │   └── prisma/         # Database service
│   └── prisma/
│       └── schema.prisma   # Database schema with SQLite
│
└── specs/                  # Project documentation
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 18 + Vite | Modern SPA with fast HMR |
| **UI Components** | Chakra UI v3 | Accessible, themeable components |
| **Animations** | Framer Motion | Smooth, physics-based animations |
| **State/Data** | Apollo Client | GraphQL state management & caching |
| **Backend** | NestJS 11 | Scalable Node.js framework |
| **API** | GraphQL (Apollo) | Type-safe, flexible API |
| **Database** | SQLite + Prisma 6 | Lightweight, file-based database |
| **Auth** | Auth0 | Enterprise-grade identity management |
| **Deployment** | Vercel + Render | Serverless frontend, managed backend |

---

## ☁️ Deployment

### Hosting Architecture

| Component | Platform | URL |
|-----------|----------|-----|
| **Frontend** | Vercel | [scrapay-book-dashboard.vercel.app](https://scrapay-book-dashboard.vercel.app/) |
| **Backend** | Render | [scrapay-book-dashboard.onrender.com](https://scrapay-book-dashboard.onrender.com/graphql) |
| **Database** | SQLite (on Render) | Ephemeral file storage |
| **Auth** | Auth0 | Managed identity service |

### ⚠️ Important Notes for Demo

**Backend Cold Start**  
The backend is hosted on Render's free tier, which spins down after 15 minutes of inactivity. When you first visit the app or after a period of inactivity, the backend may take **30-60 seconds to wake up**. You'll see a loading state in the dashboard while this happens.

**Ephemeral Database**  
Since SQLite stores data in a file on the server, and Render's free tier uses ephemeral storage, **the database resets on every deploy or restart**. This means:
- Any books you create will be cleared when the service restarts
- This is expected behavior for the demo environment
- For production, you would use a persistent database like PostgreSQL

**For Local Development**  
Running locally gives you persistent SQLite storage and instant response times. See the [Getting Started](#-getting-started) section for setup instructions.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Auth0 account (free tier)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/scrapay-book-dashboard.git
cd scrapay-book-dashboard
```

### 2. Backend Setup
```bash
cd server
npm install

# Create environment file
cp .env.example .env
```

Configure `.env`:
```env
DATABASE_URL="file:./dev.db"
AUTH0_ISSUER_URL=https://your-tenant.auth0.com/
AUTH0_AUDIENCE=https://your-api-identifier
FRONTEND_URL=http://localhost:5173
```

Run migrations and start:
```bash
npx prisma migrate dev
npm run start:dev
```

### 3. Frontend Setup
```bash
cd client
npm install

# Create environment file
cp .env.example .env
```

Configure `.env`:
```env
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=https://your-api-identifier
VITE_API_URL=http://localhost:3000/graphql
```

Start development server:
```bash
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:5173
- GraphQL Playground: http://localhost:3000/graphql

---

## 📊 Data Model

### Book Entity
```typescript
{
  id: string          // UUID primary key
  name: string        // Book title (required)
  author: string      // Author name (required)
  description: string // Book description (optional)
  userId: string      // Owner's Auth0 sub (for data isolation)
  createdAt: DateTime // Auto-generated timestamp
  updatedAt: DateTime // Auto-updated timestamp
}
```

### GraphQL Operations

**Queries:**
- `books` — Fetch all books for the authenticated user

**Mutations:**
- `createBook(input: CreateBookInput!)` — Add a new book
- `updateBook(id: ID!, input: UpdateBookInput!)` — Modify a book
- `deleteBook(id: ID!)` — Remove a book

---

## 🔐 Security

### Authentication Flow
1. User clicks "Sign in" → redirected to Auth0 Universal Login
2. Auth0 authenticates and returns JWT access token
3. Frontend attaches token to all GraphQL requests
4. Backend validates JWT signature using Auth0's JWKS
5. User ID extracted from token's `sub` claim for data scoping

### Authorization
- All GraphQL operations protected by `GqlAuthGuard`
- Books are automatically scoped to the authenticated user
- No user can access another user's data

---

## 🎨 Design Philosophy

### Visual Identity
- **Color Palette**: Monochrome base (`#1d1c1c`, `#0A0A0A`) with "Safety Orange" accent (`#FF7900`)
- **Typography**: Inter font with tight letter-spacing for a modern feel
- **Spacing**: Consistent 4px grid system with `--space-unit` CSS variable
- **Shadows**: Layered depth with subtle glows on interactive elements

### Animation Principles
- **Purpose-Driven**: Animations emphasize state changes and guide attention
- **Performance-First**: Using `transform` and `opacity` for 60fps animations
- **Spring Physics**: Natural-feeling motion with Framer Motion's spring system

---

## 📁 Project Structure Highlights

### Frontend Organization
```
theme/
├── variables.css        # CSS custom properties (colors, spacing, shadows)
├── animations.ts        # Reusable Framer Motion variants
├── hero.animations.ts   # Premium hero section animations
├── toast.styles.ts      # Extracted toast component styles
├── sidebar.styles.ts    # Extracted sidebar styles
└── login.styles.ts      # Extracted login page styles

lib/graphql/
├── queries.ts           # Centralized GraphQL queries
└── mutations.ts         # Centralized GraphQL mutations

types/
└── book.ts              # Shared TypeScript interfaces
```

### Backend Organization
```
auth/
├── auth.module.ts       # Auth module configuration
├── jwt.strategy.ts      # Passport JWT strategy with Auth0 JWKS
├── gql-auth.guard.ts    # GraphQL execution context guard
└── current-user.decorator.ts  # @CurrentUser() parameter decorator

books/
├── books.module.ts      # Feature module
├── books.resolver.ts    # GraphQL resolver
├── books.service.ts     # Business logic
├── dto/                 # Input validation DTOs
└── entities/            # GraphQL object types
```

---

## 🌟 Beyond the Basics

This project goes beyond minimal requirements with:

| Enhancement | Impact |
|-------------|--------|
| **Premium UI Design** | Dark theme with glassmorphism, not default Chakra |
| **Hero Animations** | 3D floating books, aurora effects, particle system |
| **User Data Isolation** | Each user sees only their own books |
| **Author Field** | Extended Book model with practical metadata |
| **Search Functionality** | Filter books by title or author instantly |
| **Mobile Responsive** | Collapsible sidebar, touch-friendly UI |
| **Toast Notifications** | User feedback for all CRUD operations |
| **Code Modularity** | Extracted styles, centralized GraphQL, clean architecture |
| **Theme Toggle** | Light/dark mode with CSS variable swapping |

---

## 📝 Conventional Commits

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
feat(client): premium hero animation with floating books
refactor(server): remove dead code and console.logs
fix(auth): correct JWT audience validation
docs: add comprehensive README
```

---

## 🧪 Testing the Application

### Manual Testing Checklist
1. ✅ Sign in with Google OAuth
2. ✅ Sign in with email/password
3. ✅ Create a new book with all fields
4. ✅ View book in the dashboard grid
5. ✅ Edit book details
6. ✅ Delete book with confirmation
7. ✅ Search for books by title/author
8. ✅ Toggle dark/light theme
9. ✅ Collapse/expand sidebar
10. ✅ Sign out and verify session cleared

---

## 📜 License

This project is built for demonstration purposes.

---

## 🙏 Acknowledgments

- [Chakra UI](https://chakra-ui.com/) — Component library
- [Auth0](https://auth0.com/) — Authentication platform
- [Framer Motion](https://www.framer.com/motion/) — Animation library
- [NestJS](https://nestjs.com/) — Backend framework
- [Prisma](https://www.prisma.io/) — Database ORM
