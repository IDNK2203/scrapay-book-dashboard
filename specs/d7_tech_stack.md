# d7: Tech Stack Details

## 1. Stack Overview

| Layer | Technology | Version |
|-------|------------|---------|
| **Frontend** | React | 18.x |
| **Build Tool** | Vite | 5.x |
| **UI Library** | Chakra UI | 2.x |
| **GraphQL Client** | Apollo Client | 3.x |
| **Form Validation** | Zod | 3.x |
| **Auth (Frontend)** | @auth0/auth0-react | 2.x |
| **Backend** | NestJS | 10.x |
| **GraphQL Server** | @nestjs/graphql + Apollo | 12.x |
| **Database ORM** | Prisma | 5.x |
| **Database** | SQLite | 3.x |
| **Auth (Backend)** | Passport + passport-jwt | 0.7.x |
| **Language** | TypeScript | 5.x |

---

## 2. Frontend Dependencies

### 2.1 Production Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "@apollo/client": "^3.8.0",
    "@auth0/auth0-react": "^2.2.0",
    "@chakra-ui/react": "^2.8.0",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "framer-motion": "^10.16.0",
    "graphql": "^16.8.0",
    "zod": "^3.22.0",
    "react-hook-form": "^7.48.0",
    "@hookform/resolvers": "^3.3.0"
  }
}
```

### 2.2 Dev Dependencies
```json
{
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "eslint": "^8.55.0",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0"
  }
}
```

---

## 3. Backend Dependencies

### 3.1 Production Dependencies
```json
{
  "dependencies": {
    "@nestjs/common": "^10.3.0",
    "@nestjs/core": "^10.3.0",
    "@nestjs/platform-express": "^10.3.0",
    "@nestjs/graphql": "^12.0.0",
    "@nestjs/apollo": "^12.0.0",
    "@nestjs/passport": "^10.0.0",
    "@apollo/server": "^4.9.0",
    "@prisma/client": "^5.7.0",
    "graphql": "^16.8.0",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "jwks-rsa": "^3.1.0",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.1",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1"
  }
}
```

### 3.2 Dev Dependencies
```json
{
  "devDependencies": {
    "@nestjs/cli": "^10.3.0",
    "@nestjs/schematics": "^10.1.0",
    "@nestjs/testing": "^10.3.0",
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.0",
    "@types/passport-jwt": "^4.0.0",
    "prisma": "^5.7.0",
    "typescript": "^5.3.0",
    "ts-node": "^10.9.0",
    "tsconfig-paths": "^4.2.0",
    "jest": "^29.7.0",
    "@types/jest": "^29.5.0",
    "ts-jest": "^29.1.0",
    "eslint": "^8.55.0",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0"
  }
}
```

---

## 4. Project Configuration

### 4.1 Frontend (vite.config.ts)
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
```

### 4.2 Backend (nest-cli.json)
```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}
```

### 4.3 TypeScript (tsconfig.json - Backend)
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

---

## 5. Auth0 Configuration

### 5.1 Application Settings
| Setting | Value |
|---------|-------|
| Application Type | Single Page Application |
| Allowed Callback URLs | `http://localhost:5173/callback, https://your-app.vercel.app/callback` |
| Allowed Logout URLs | `http://localhost:5173, https://your-app.vercel.app` |
| Allowed Web Origins | `http://localhost:5173, https://your-app.vercel.app` |

### 5.2 Social Connections
| Provider | Status |
|----------|--------|
| Google | Enable in Auth0 Dashboard |
| GitHub | Enable in Auth0 Dashboard |

### 5.3 API Settings
| Setting | Value |
|---------|-------|
| Identifier (Audience) | `https://scrapay-books-api` |
| Signing Algorithm | RS256 |

---

## 6. Deployment Configuration

### 6.1 Frontend (Vercel)
```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 6.2 Backend (Render)
```yaml
# render.yaml
services:
  - type: web
    name: scrapay-books-api
    env: node
    buildCommand: npm install && npx prisma generate && npm run build
    startCommand: npm run start:prod
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        sync: false
      - key: AUTH0_ISSUER_URL
        sync: false
      - key: AUTH0_AUDIENCE
        sync: false
```

---

## 7. Environment Variables

### 7.1 Frontend (.env)
```env
# Auth0
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=https://scrapay-books-api

# API
VITE_API_URL=http://localhost:3000/graphql
```

### 7.2 Backend (.env)
```env
# Server
PORT=3000
NODE_ENV=development

# Auth0
AUTH0_ISSUER_URL=https://your-tenant.auth0.com/
AUTH0_AUDIENCE=https://scrapay-books-api

# Database (Prisma)
DATABASE_URL="file:./prisma/dev.db"
```

---

## 8. Version Compatibility Matrix

| Package | Minimum | Recommended | Max Tested |
|---------|---------|-------------|------------|
| Node.js | 18.0.0 | 20.x LTS | 21.x |
| npm | 9.0.0 | 10.x | - |
| TypeScript | 5.0 | 5.3.x | 5.4 |
| React | 18.2.0 | 18.2.0 | 18.x |
| NestJS | 10.0.0 | 10.3.x | 10.x |
| Prisma | 5.0.0 | 5.7.x | 5.x |
| Chakra UI | 2.8.0 | 2.8.x | 2.x |
