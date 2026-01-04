# d3: UI/UX Specification V2 (Revamped)

## 1. Design Philosophy & System
**Theme:** "Google Antigravity" inspired.
**Core Aesthetic:** Premium, Monochromatic (Black & White), High Contrast.
**Accent Strategy:** 
- **Primary Accent:** Bright Neon Green (e.g., `#00FF00` equivalent) or Bright Orange (e.g., `#FF4500`).
- **Usage:** Sparsely used for Call-to-Actions (CTAs), active states, and focus indicators.
- **Contrast:** When using Green, background is Deep Black/Charcoal. Orange accents float on White/Light Grey or vice versa for dynamic contrast.
**Typography:**
- **Primary Font:** `Inter` or `Outfit` (Modern Sans-Serif).
- **Weights:** Heavy use of Light (300) for body and Extra Bold (800) for headers to create hierarchy.
**Iconography:**
- **Pack:** `Lucide React` or `Heroicons` (Outline style).
- **Style:** Thin strokes, coherent with the "sleek/minimal" font weights.
**Micro-interactions:**
- Fluid hover states.
- Text reveal animations.
- Smooth transitions for layout changes (no abrupt cuts).

---

## 2. Global UI Properties
- **Border Radius:** `12px` or `16px` (Soft rounded corners).
- **Box Shadow:** Subtle, expansive shadows for depth (`0 10px 30px rgba(0,0,0,0.05)`).
- **Animations:** 
  - `framer-motion` for complex transitions.
  - Hover: Scale up (1.02x), Glow effect.

---

## 3. Page Specifications

### 3.1 Home Page (Landing)
**Concept:** "App-like Onboarding Screen". Minimalist. Single Viewport. No Scroll.

**Layout:**
- **Center Canvas:** Single centralized content block.
- **Background:** Dynamic Monochrome (Subtle noise texture or soft gradients of grey).
- **Elements:**
  - **Brand Wordmark:** Top Left or Center Top. Minimal.
  - **Hero Text:** Huge, Animated Headlines.
    - *Animation:* Text slides up/fades in line by line.
    - *Content:* "Manage your library" -> "Effortlessly."
  - **Call to Action (Auth):**
    - Buttons: "Continue with Google", "Continue with Email".
    - *Style:* Outlined (Monochrome) with Hover Fill (Accent Color).
  - **No Images:** Pure typography and spacing.

**Interactions:**
- **Cursor Follow:** (Optional) Subtle spotlight effect following cursor on the background.
- **Button Hover:** Inverts colors (Black -> Accent Color).

---

### 3.2 Dashboard Page
**Concept:** "Native Desktop App". High functionality, low noise.

**Layout Structure:**
- **Sidebar (Left, Fixed Width ~240px):**
  - **Top:** Brand Logo (Icon + Text).
  - **Middle:** Navigation (if any) or "Add Book" Primary Action.
  - **Bottom:** User Profile (Avatar + Name), Settings/Team Switcher, Sign Out.
  - *Style:* Translucent Glassmorphism or Flat Matte Black/White (contrast to main content).
- **Main Content (Center, Fluid):**
  - **Container:** Centered max-width (e.g., 1200px) creates a "floating app" feel on large screens.
  - **Header Area:**
    - Large Page Title ("Library").
    - **Search Bar:** Floating, pill-shaped, expands on focus.
  - **Content Area:** 
    - **Grid View** (Replaces Table).
    - Auto-responsive grid columns (min-width 200px).

**Components:**

#### Book Card (Grid Item)
- **State: Idle**
  - Minimal info: Title (Bold), Author (Grey).
  - Cover: Abstract generated gradient or solid color if no image (User said "no image assets" for home, assuming books might have covers or just text cards). *Assumption: Text-based cards for now.*
- **State: Hover**
  - Card lifts slightly.
  - **Action Layer:** Overlays or reveals "Edit" (Pencil) and "Delete" (Trash) icons.
  - Icons animate in (fade up).

#### Search Bar
- **Idle:** Icon + "Search books..." placeholder. Transparent background, border only.
- **Focus:** Fills background (White/Black), Border glows Accent Color.

---

## 4. Modal Specifications (Create/Edit)
**Design:**
- **Backdrop:** High blur glass effect (`backdrop-filter: blur(10px)`).
- **Panel:** Minimalist floating card.
- **Inputs:**
  - **Style:** Underlined only (Material/iOS style) or minimal filled pills.
  - **Focus:** Bottom border animates to Accent Color.
- **Buttons:**
  - **Primary:** Solid Accent Color (Text Black/White).
  - **Secondary:** Text only.

---

## 5. Themes
### Light Mode
- **Bg:** `#F5F5F7` (Off-white).
- **Surface:** `#FFFFFF` (Pure white).
- **Text:** `#1A1A1A` (Almost black).
- **Accent:** Neon Green (`#00C853`).

### Dark Mode
- **Bg:** `#0A0A0A` (Deep black).
- **Surface:** `#1E1E1E` (Dark Grey).
- **Text:** `#EAEAEA` (Off-white).
- **Accent:** Neon Orange (`#FF6D00`).

---

## 6. Implementation Notes
- **Framework:** React + Vite.
- **Styling:** Vanilla CSS (CSS Variables for themes) or Styled Components. *User pref: Vanilla CSS recommended.*
- **State:** React Context for Theme.
- **Animation:** `framer-motion` for layout transitions.
