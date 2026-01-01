# d3: Functional UI/UX Specification

## 1. Page Structure

### 1.1 Application Routes
| Route | Page | Auth Required | Description |
|-------|------|---------------|-------------|
| `/` | Landing/Login | No | Welcome + Auth0 login (social + email) |
| `/callback` | Auth Callback | No | Auth0 redirect handler |
| `/dashboard` | Dashboard | Yes | Book list + management |

---

## 2. Page Specifications

### 2.1 Landing/Login Page (`/`)

#### Layout
```
┌─────────────────────────────────────────┐
│              HEADER                      │
│         [App Logo/Name]                  │
├─────────────────────────────────────────┤
│                                          │
│                HERO                      │
│     "Manage Your Book Collection"        │
│                                          │
│     [  Continue with Google  ]           │
│     [  Continue with GitHub  ]           │
│     ──────── or ────────                 │
│     [    Sign in with Email   ]          │
│                                          │
└─────────────────────────────────────────┘
```

#### Components (Chakra UI)
| Component | Chakra Elements |
|-----------|-----------------|
| Container | `Container`, `VStack` |
| Logo | `Heading`, `Image` |
| Auth Buttons | `Button` with `leftIcon` |
| Divider | `HStack` with `Divider` |

#### States
- **Default**: Show login buttons
- **Loading**: Chakra `Spinner` while redirecting
- **Authenticated**: Redirect to `/dashboard`

---

### 2.2 Auth Callback Page (`/callback`)

#### Layout
```
┌─────────────────────────────────────────┐
│                                          │
│          [Loading Spinner]               │
│       "Completing sign in..."            │
│                                          │
└─────────────────────────────────────────┘
```

#### Components
- Chakra `Spinner` with `Text`
- Full viewport centered using `Flex`

---

### 2.3 Dashboard Page (`/dashboard`)

#### Layout
```
┌─────────────────────────────────────────┐
│  [Logo]     Dashboard       [Sign Out]   │
├─────────────────────────────────────────┤
│                                          │
│  My Books                [+ Add Book]    │
│  ─────────────────────────────────────── │
│  ┌─────────────────────────────────────┐ │
│  │ Name     │ Author   │ Desc │ Actions│ │
│  ├─────────────────────────────────────┤ │
│  │ Book 1   │ Author 1 │ ...  │ ✏️ 🗑️  │ │
│  │ Book 2   │ Author 2 │ ...  │ ✏️ 🗑️  │ │
│  └─────────────────────────────────────┘ │
│                                          │
└─────────────────────────────────────────┘
```

#### Components (Chakra UI)

##### Header
| Element | Chakra Component |
|---------|------------------|
| Container | `Flex` with `justify="space-between"` |
| Logo | `Heading` |
| Sign Out | `Button` variant="outline" |

##### Book Table
| Column | Content |
|--------|---------|
| Name | Book name (required) |
| Author | Author name (required) |
| Description | Book description (truncated) |
| Actions | Edit + Delete `IconButton` |

Chakra: `Table`, `Thead`, `Tbody`, `Tr`, `Th`, `Td`

##### Action Buttons
| Button | Chakra | Behavior |
|--------|--------|----------|
| Add Book | `Button` colorScheme="blue" | Open Add modal |
| Edit | `IconButton` icon={EditIcon} | Open Edit modal |
| Delete | `IconButton` icon={DeleteIcon} colorScheme="red" | Show confirmation |

---

## 3. Modal Specifications

### 3.1 Add/Edit Book Modal

#### Layout
```
┌─────────────────────────────────────────┐
│  Add Book                         [X]   │
├─────────────────────────────────────────┤
│                                          │
│  Name *                                  │
│  ┌────────────────────────────────────┐ │
│  │                                    │  │
│  └────────────────────────────────────┘ │
│                                          │
│  Author *                                │
│  ┌────────────────────────────────────┐ │
│  │                                    │  │
│  └────────────────────────────────────┘ │
│                                          │
│  Description                             │
│  ┌────────────────────────────────────┐ │
│  │                                    │  │
│  │                                    │  │
│  └────────────────────────────────────┘ │
│                                          │
│         [Cancel]     [Save Book]         │
│                                          │
└─────────────────────────────────────────┘
```

#### Form Fields
| Field | Chakra Component | Validation (Zod) |
|-------|------------------|------------------|
| Name | `Input` | Required, max 255 chars |
| Author | `Input` | Required, max 255 chars |
| Description | `Textarea` | Optional, max 1000 chars |

#### Components
- `Modal`, `ModalOverlay`, `ModalContent`
- `ModalHeader`, `ModalBody`, `ModalFooter`
- `FormControl`, `FormLabel`, `FormErrorMessage`
- `Input`, `Textarea`
- `Button`, `ButtonGroup`

---

### 3.2 Delete Confirmation (AlertDialog)

#### Layout
```
┌─────────────────────────────────────────┐
│  Delete Book                            │
├─────────────────────────────────────────┤
│                                          │
│  Are you sure you want to delete        │
│  "{Book Name}"?                          │
│                                          │
│  This action cannot be undone.           │
│                                          │
│         [Cancel]     [Delete]            │
│                                          │
└─────────────────────────────────────────┘
```

#### Components
- `AlertDialog`, `AlertDialogOverlay`, `AlertDialogContent`
- `AlertDialogHeader`, `AlertDialogBody`, `AlertDialogFooter`
- `Button` (Cancel) + `Button` colorScheme="red" (Delete)

---

## 4. Responsive Design

### 4.1 Chakra Breakpoints
| Breakpoint | Value | Usage |
|------------|-------|-------|
| `sm` | 480px | Mobile |
| `md` | 768px | Tablet |
| `lg` | 992px | Desktop |
| `xl` | 1280px | Wide desktop |

### 4.2 Mobile Adaptations
- **Table → Cards**: Use `display={{ base: "none", md: "table" }}`
- **Mobile Cards**: Use `Stack` for mobile book display
- **Modal Width**: Use `size={{ base: "full", md: "md" }}`

---

## 5. Loading States

| State | Chakra Component |
|-------|------------------|
| Page Loading | `Skeleton`, `SkeletonText` |
| Table Loading | Multiple `Skeleton` rows |
| Button Loading | `Button isLoading` prop |
| Spinner | `Spinner` component |

---

## 6. Error States

| Error Type | Chakra Display |
|------------|----------------|
| Form Validation | `FormErrorMessage` |
| API Error | `useToast` with status="error" |
| Success | `useToast` with status="success" |
| Empty State | `Alert` or custom empty component |

---

## 7. Chakra Theme

### 7.1 Default Theme (customize if needed)
```typescript
// theme.ts (optional customization)
import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#e3f2fd',
      500: '#3B82F6',
      600: '#2563eb',
    },
  },
});
```

### 7.2 Color Scheme Usage
| Element | Color Scheme |
|---------|--------------|
| Primary buttons | "blue" |
| Delete buttons | "red" |
| Success toasts | "green" |
| Warning toasts | "yellow" |
