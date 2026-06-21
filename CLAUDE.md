# CLAUDE.md — Frontend Development Rules
# Project Type: Public Product Catalog / E-commerce Ready

---

## Always Do First

**Invoke the `frontend-design` skill** before writing any frontend code — every session, no exceptions.

---

## Stack

This project runs on **Next.js 15 + TypeScript + Tailwind CSS v4 + shadcn/ui**. Do not deviate from this stack unless the user explicitly requests otherwise.

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSR/SSG, SEO-ready |
| Language | TypeScript — strict mode | No `any`, ever |
| Styling | Tailwind CSS v4 via npm | `@theme` tokens, no CDN |
| UI Components | shadcn/ui | Copied into project, fully owned |
| Server Data | Next.js `fetch` + ISR | Native caching |
| Client Data | TanStack Query | Filters, infinite scroll |
| URL State | `nuqs` | Typed filter params in URL |
| Forms | react-hook-form + zod | Validation at the schema level |
| Global State | Zustand | Cart, wishlist (future-ready) |
| Icons | Lucide React | `lucide-react` |
| Images | `next/image` | WebP/AVIF, lazy, responsive |

### Bootstrap a New Project

```bash
npx create-next-app@latest my-catalog \
  --typescript --tailwind --app --src-dir --import-alias "@/*"
cd my-catalog
npm install -D @tailwindcss/postcss
npm install lucide-react react-hook-form zod @hookform/resolvers clsx tailwind-merge
npm install zustand @tanstack/react-query nuqs
npx shadcn@latest init
```

---

## Project Structure

```
my-catalog/
├── next.config.ts
├── tsconfig.json
├── components.json                 ← shadcn/ui config
├── src/
│   ├── app/
│   │   ├── layout.tsx              ← root layout, fonts, providers
│   │   ├── page.tsx                ← homepage
│   │   ├── catalog/
│   │   │   ├── page.tsx            ← listing page with filters
│   │   │   └── [slug]/page.tsx     ← product detail (SSG)
│   │   ├── categories/
│   │   │   └── [slug]/page.tsx     ← category page (SSG)
│   │   ├── sitemap.ts              ← auto-generated XML sitemap
│   │   └── robots.ts
│   ├── components/
│   │   ├── ui/                     ← shadcn/ui primitives
│   │   ├── catalog/                ← ProductCard, ProductGrid, Filters
│   │   ├── layout/                 ← Header, Footer, Breadcrumbs
│   │   └── shared/                 ← cross-feature reusable components
│   ├── lib/
│   │   ├── utils.ts                ← cn() and shared helpers
│   │   ├── api.ts                  ← typed fetch wrappers
│   │   └── metadata.ts             ← SEO helper functions
│   ├── hooks/                      ← custom React hooks
│   ├── store/                      ← Zustand stores
│   ├── types/                      ← shared TypeScript interfaces
│   └── styles/
│       └── globals.css             ← Tailwind + @theme design tokens
└── public/
    └── assets/                     ← logos, brand images, icons
```

---

## Rendering Strategy

Use the right rendering mode for each page type. Getting this wrong kills SEO and performance.

| Page | Strategy | Why |
|---|---|---|
| Product detail `/catalog/[slug]` | SSG + `generateStaticParams` | Fast, indexed, cacheable |
| Category page `/categories/[slug]` | SSG + `generateStaticParams` | Same |
| Catalog listing `/catalog` | Server Component + `nuqs` | Filters live in URL |
| Interactive UI (gallery, filter panel) | `'use client'` | Needs browser APIs |

**Default to Server Components.** Add `'use client'` only when the component actually needs hooks, event handlers, or browser APIs. Do not scatter it everywhere.

```tsx
// app/catalog/[slug]/page.tsx
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug);
  return {
    title: `${product.name} | Catalog`,
    description: product.description,
    openGraph: { images: [product.image] },
  };
}
```

---

## Data Fetching

**Server Components** use native `fetch` with Next.js caching:

```tsx
const products = await fetch('https://api.example.com/products', {
  next: { revalidate: 3600 }, // ISR — stale after 1 hour
}).then((r) => r.json());
```

**Client Components** use TanStack Query:

```tsx
const { data, isLoading } = useQuery({
  queryKey: ['products', filters],
  queryFn: () => fetchProducts(filters),
});
```

Never mix patterns within the same component — a Server Component either fetches its own data or receives it as props from a parent.

---

## SEO

Every product and category page must export `generateMetadata`. This is not optional.

```tsx
export const metadata: Metadata = {
  title: 'Product Name | Brand',
  description: 'Up to 160 characters. Specific, not generic.',
  openGraph: {
    title: '...',
    description: '...',
    images: [{ url: '/og-product.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://example.com/catalog/product-slug',
  },
};
```

Add **JSON-LD structured data** to every product page so Google can display rich results:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: product.image,
      description: product.description,
    }),
  }}
/>
```

`app/sitemap.ts` and `app/robots.ts` must exist and be correctly configured from day one.

---

## Catalog Rules

### Filters Always Live in the URL

Use `nuqs` for all filter state — never `useState`. This makes filters shareable, bookmarkable, and compatible with the browser Back button.

```tsx
import { useQueryState, parseAsString, parseAsInteger } from 'nuqs';

const [category, setCategory] = useQueryState('category', parseAsString);
const [priceMin, setPriceMin] = useQueryState('priceMin', parseAsInteger);
// Result: /catalog?category=electronics&priceMin=100
```

### Product Images

Always use `next/image`. Never a plain `<img>` for product photography.

```tsx
<Image
  src={product.image}
  alt={product.name}
  width={400}
  height={400}
  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
  className="object-cover"
/>
```

Configure allowed external image domains in `next.config.ts`.

### ProductCard Interface

```tsx
interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  category: string;
  badge?: 'new' | 'sale' | 'popular';
}
```

Every card must include: a `next/image` with `alt`, a title, a price formatted via `Intl.NumberFormat`, a `next/link` to the detail page, and a smooth hover state.

### Pagination

- Mobile → infinite scroll via `useInfiniteQuery`
- Desktop → numbered pagination with `?page=N` in the URL
- Never load all products at once — always paginate or virtualize long lists

---

## Zustand Stores

Set up the store structure now, even if the cart isn't built yet. Retrofitting this later is painful.

```tsx
// src/store/cart.ts
import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clearCart: () => set({ items: [] }),
  total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));
```

---

## Local Server

- Run `npm run dev` — starts at `http://localhost:3000`
- Always screenshot from localhost, never from a `file:///` URL
- Do not start a second dev server if one is already running

---

## Screenshot Workflow

- Puppeteer path: `C:/Users/nateh/AppData/Local/Temp/puppeteer-test/`
- Chrome cache: `C:/Users/nateh/.cache/puppeteer/`
- Screenshot command: `node screenshot.mjs http://localhost:3000`
- Output: `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten)
- Label variant: `node screenshot.mjs http://localhost:3000 my-label` → `screenshot-N-my-label.png`
- After capturing, read the PNG with the Read tool and analyze it directly
- Be precise when comparing: "heading renders at 32px, reference shows ~24px", "card gap is 16px, should be 24px"
- Always check: spacing, font size/weight/line-height, exact hex colors, alignment, border-radius, shadows, image dimensions

---

## Reference Images

- **Reference provided:** reproduce layout, spacing, typography, and color exactly. Use placeholders for content (`https://placehold.co/`). Do not improve or add anything.
- **No reference:** design from scratch with high craft — see guardrails below.
- Always do at least **two screenshot–compare–fix rounds**. Stop only when there are no visible differences, or the user says to stop.

---

## Brand Assets

Before designing anything, check `public/assets/`. It may contain logos, color palettes, or style guides.

- Use whatever is there — do not substitute placeholders for real assets
- If a logo exists, use it. If a color palette is defined, use those exact values — never invent brand colors

---

## TypeScript

- `"strict": true` in `tsconfig.json` — always
- No `any`. Use `unknown`, generics, or precise types
- Explicit return types on all functions and components
- `interface` for object shapes, `type` for unions and primitives
- Every component gets a typed props interface

---

## Component Rules

- Functional components only — no class components
- One component per file, filename matches the component name (PascalCase)
- Destructure props in the function signature
- No inline styles — use Tailwind classes
- `'use client'` only when the component genuinely needs browser APIs, event handlers, or hooks that don't work server-side

---

## Tailwind CSS v4

- No CDN. Tailwind must run through the PostCSS/Vite pipeline so unused classes are purged
- Define all design tokens in `src/styles/globals.css` using `@theme`:

```css
@import "tailwindcss";

@theme {
  --color-primary:    oklch(0.48 0.14 192);
  --color-surface:    #f9f8f5;
  --font-body:        'Satoshi', sans-serif;
  --font-display:     'Instrument Serif', serif;
  --radius-card:      0.75rem;
}
```

- No arbitrary values unless absolutely unavoidable — use tokens
- Never use Tailwind's default `blue` or `indigo` as the primary brand color

---

## shadcn/ui

- Initialize: `npx shadcn@latest init`
- Add components as needed: `npx shadcn@latest add button card dialog input select badge`
- Components live in `src/components/ui/` and are fully yours to modify
- Always use `cn()` from `lib/utils.ts` to merge class names:

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

---

## Design System

### Color Tokens (OKLCH)

```css
@theme {
  --color-bg:              #f7f6f2;
  --color-surface:         #f9f8f5;
  --color-surface-offset:  #edeae5;
  --color-border:          #d4d1ca;
  --color-text:            #28251d;
  --color-text-muted:      #7a7974;
  --color-primary:         oklch(0.48 0.14 192);
  --color-primary-hover:   oklch(0.38 0.12 192);
  --color-error:           oklch(0.50 0.18 340);
  --color-success:         oklch(0.50 0.14 140);
}
```

Dark mode via `@media (prefers-color-scheme: dark)` with a manual `data-theme` toggle override.

### Typography

- Always pair a display/serif with a clean sans-serif — never the same family for headings and body
- Large headings: `letter-spacing: -0.03em`. Body copy: `line-height: 1.7`
- Load fonts via Fontshare (preferred) or Google Fonts — system fonts are fallbacks, not choices
- Body text minimum: 16px — `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)`
- Display fonts only at 24px and above

### Spacing

All spacing uses a 4px base unit. Reference tokens — never hardcode pixel values.

### Surfaces & Depth

Every UI must express a clear elevation hierarchy: **base → elevated → floating**. Shadows must be layered and color-tinted, never a flat `shadow-md`.

```css
box-shadow:
  0 1px 2px oklch(0.2 0.01 80 / 0.06),
  0 4px 16px oklch(0.2 0.01 80 / 0.04);
```

---

## Design Guardrails

These rules exist to prevent the output from looking like a generic AI-generated template.

- **Colors:** No default Tailwind palette colors as brand colors. Derive everything from a single OKLCH primary.
- **Shadows:** Layered and tinted, always. No `shadow-md` shortcuts.
- **Typography:** Display + sans pairing required. Tight tracking on large headings. Comfortable line-height on body.
- **Gradients:** Layer multiple radial gradients. Use SVG `feTurbulence` grain for depth — not as decoration, but to add material quality.
- **Transitions:** Animate only `transform` and `opacity`. Never `transition-all`. Use spring-style easing curves.
- **Interactive states:** `hover`, `focus-visible`, and `active` on every clickable element. No exceptions.
- **Images:** Gradient overlay (`bg-gradient-to-t from-black/60`) where needed. Use `mix-blend-multiply` for tonal color treatment.
- **Spacing:** Tokens only — no random Tailwind steps.
- **Layout:** No cookie-cutter 3-column feature grids. No centered text on everything. Vary section height and rhythm intentionally.

---

## Accessibility

Non-negotiable. Every build must pass these.

- Semantic HTML throughout: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- One `<h1>` per page — heading hierarchy must never skip levels
- All images have `alt`. Decorative images use `alt=""`
- All touch targets are at least 44×44px
- Every icon-only button has an `aria-label`
- A visible skip link is the first focusable element on every page
- WCAG AA minimum: 4.5:1 for body text, 3:1 for large text

---

## Hard Rules

- Do not add content, sections, or features not present in the reference
- Do not "improve" a reference — reproduce it faithfully
- Do not stop at one screenshot pass — always iterate
- Never use `transition-all`
- Never use Tailwind's default blue or indigo as the primary brand color
- Never use `any` in TypeScript
- Never use inline `style={{...}}` attributes
- Never use the Tailwind CDN `<script>` tag — always the npm pipeline
- Never use a plain `<img>` for product photos — always `next/image`
- Never store filter state in `useState` — always in the URL via `nuqs`

---

## When a Simpler Stack Is Acceptable

Use Vite or a single `index.html` with Tailwind CDN **only if the user explicitly asks for**:

- A quick throwaway prototype
- A single-file demo for teaching or explanation purposes

Everything else defaults to **Next.js 15 + TypeScript + Tailwind v4 + shadcn/ui**.
