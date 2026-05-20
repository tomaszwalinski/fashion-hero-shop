# Seller PRO — Landing Page + Banner + Tracking

## Context

FashionHero chce wprowadzić płatne konto **Seller PRO** dla sprzedawców (analityki sprzedażowe + kreator kampanii). Cena jest jeszcze TBD, więc na razie zbieramy zainteresowanie: lekka funkcja "Future-1" walidująca popyt.

Trzy elementy do zbudowania:
1. **Landing Page `/seller-pro`** — opis produktu, formularz email + ankieta (które funkcje interesują użytkownika), promo "atrakcyjna cena na pierwszy rok + udział w becie".
2. **Banner na home page** — sekcja między `HeroCarousel` a `CategoryRow`, CTA prowadzące do `/seller-pro`. Ukrywa się dla osób, które już wysłały zgłoszenie (flaga w `localStorage`, bo nie mamy auth/sesji per-user).
3. **Tracking in-memory** — endpoint zapisujący klikinięcia w banner oraz zgłoszenia z formularza w pamięci serwera (moduł-level store, znika po restarcie — zgodnie z PRD).

Decyzje (z user clarification):
- Język: **angielski** (spójność z resztą sklepu).
- Banner: sekcja między `HeroCarousel` a `CategoryRow`.
- Ankieta: **checkboxy** "Which features interest you most?" (Sales Analytics / Campaign Creator).
- Tracking: licznik + lista timestampów z `userAgent`.

## Implementation

### 1. In-memory store

**Nowy plik:** `src/lib/seller-pro-store.ts`

Moduł-level state (zwykłe `let` w module — w dev z `--turbo` i prod wystarcza; nie używamy `global` bo nie potrzebujemy persystencji przez HMR/restart, zgodnie z PRD "in-memory"):

```ts
type BannerClick = { timestamp: string; userAgent: string };
type Signup = { timestamp: string; email: string; interests: string[] };

let bannerClicks: BannerClick[] = [];
let signups: Signup[] = [];

export function recordBannerClick(userAgent: string) { /* push */ }
export function recordSignup(email: string, interests: string[]) { /* push */ }
export function getStats() { return { bannerClicks, signups }; }
```

### 2. API routes (App Router)

Folder `src/app/api/` nie istnieje — tworzymy go.

**Nowe pliki:**
- `src/app/api/seller-pro/banner-click/route.ts` — `POST` zapisuje `{ timestamp: new Date().toISOString(), userAgent: req.headers.get('user-agent') ?? 'unknown' }`. Zwraca `{ ok: true }`.
- `src/app/api/seller-pro/signup/route.ts` — `POST`, body `{ email: string, interests: string[] }`. Walidacja: email niepusty, regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, `interests` to subset `['analytics', 'campaigns']`. Zwraca `{ ok: true }` / `{ ok: false, error }` (400).
- `src/app/api/seller-pro/stats/route.ts` — `GET` zwraca `getStats()` (dev/debug — żeby było jak sprawdzić tracking; nie linkujemy w UI).

**Uwaga Next.js 16:** Sprawdzić w `node_modules/next/dist/docs/` aktualny format `route.ts` (App Router). Spodziewany kształt:
```ts
export async function POST(req: Request) { ... }
```

### 3. Banner na home page

**Nowy plik:** `src/components/sections/seller-pro-banner.tsx`

- Client component (`"use client"`) — sprawdza `localStorage.getItem('seller-pro-signed-up')` w `useEffect`; jeśli `true`, nie renderuje nic.
- Wizualnie: pełna szerokość, `bg-charcoal text-white` (lub akcent — `bg-cream-dark` z ciemnym tekstem, do wyboru przy implementacji), padding y ~40px, lewa strona: krótki copy ("Introducing Seller PRO — analytics & AI campaign creator. Beta pricing locked in for year one."), prawa strona: `Link` z klasą `btn-cta` "JOIN THE BETA" → `/seller-pro`.
- `onClick` na linku: `fetch('/api/seller-pro/banner-click', { method: 'POST' })` (fire-and-forget, nie blokuje nawigacji).
- Styl matchuje istniejące sekcje (uppercase tracking, font-light, `btn-cta`).

**Modyfikacja:** `src/app/page.tsx`
```tsx
import { SellerProBanner } from "@/components/sections/seller-pro-banner";
// ...
<HeroCarousel />
<SellerProBanner />
<CategoryRow />
```

### 4. Landing Page

**Nowy plik:** `src/app/seller-pro/page.tsx` (server component shell + client form component).

Struktura (wzorowana na `src/app/about/page.tsx`):
1. **Hero**: pełnoekranowa sekcja z gradientem/tłem (reusable `hero-3.jpg` lub inny obrazek z `/public/images/hero/`), nagłówek "Seller PRO", podtytuł "Sales analytics & AI-powered campaign creator. Beta pricing for early adopters."
2. **Features**: 2-kolumnowa siatka (analogicznie do `ValueProps`):
   - **Sales Analytics** — opis: trendy sprzedażowe, dashboardy, sezonowość.
   - **Campaign Creator** — opis: AI sugeruje co, kiedy i za ile wystawić.
3. **Pricing teaser**: sekcja `bg-cream-light` — "Locked-in beta pricing for year one. Final price TBD." + krótka lista korzyści.
4. **Form** (client component, nowy plik `src/app/seller-pro/signup-form.tsx`):
   - Pole email (styl z `register/page.tsx` linie 86–94).
   - Checkbox group "Which features interest you most?":
     - [ ] Sales Analytics (`value="analytics"`)
     - [ ] Campaign Creator (`value="campaigns"`)
   - Submit button `btn-cta` "Request Beta Access".
   - State: `submitting`, `error`, `submitted`. Po sukcesie ustawia `localStorage.setItem('seller-pro-signed-up', 'true')` i pokazuje "Thanks — we'll be in touch."
   - Submit: `fetch('/api/seller-pro/signup', { method: 'POST', body: JSON.stringify({ email, interests }) })`.

Metadata page: `title: "Seller PRO - FashionHero"`, opis.

### 5. (opcjonalnie) link w nawigacji

Nie dodajemy — banner jest jedynym wejściem. PRD nie wymaga. Jeśli zechcesz, można dorzucić link w `Footer` w sekcji "For Sellers".

## Critical files

**Do utworzenia:**
- `src/lib/seller-pro-store.ts`
- `src/app/api/seller-pro/banner-click/route.ts`
- `src/app/api/seller-pro/signup/route.ts`
- `src/app/api/seller-pro/stats/route.ts`
- `src/components/sections/seller-pro-banner.tsx`
- `src/app/seller-pro/page.tsx`
- `src/app/seller-pro/signup-form.tsx`

**Do modyfikacji:**
- `src/app/page.tsx` — wstawić `<SellerProBanner />` po `<HeroCarousel />`.

**Do podejrzenia (wzorce do reuse):**
- `src/app/about/page.tsx` — struktura strony.
- `src/app/account/register/page.tsx:52–122` — pattern formularza.
- `src/components/sections/value-props.tsx` — pattern feature grid.
- `src/components/sections/hero-carousel.tsx` — CTA button styling (linia ~68).
- `src/components/announcement-bar.tsx` — minimalny pattern paska, jeśli zechcesz cieńszy banner.

## Verification

1. **Dev server**: `npm run dev`, otwórz `http://localhost:3000`.
2. **Banner**: widoczny między hero a kategoriami; kliknięcie "JOIN THE BETA" otwiera `/seller-pro` i POSTuje do `/api/seller-pro/banner-click`.
3. **Landing page**: `/seller-pro` renderuje hero + features + pricing + formularz.
4. **Submit formularza**:
   - Pusty email → błąd walidacji.
   - Email niepoprawny (np. `foo`) → błąd 400.
   - Poprawny submit z zaznaczonymi checkboxami → success message, banner znika po powrocie na `/` (localStorage flag).
5. **Tracking**: `curl http://localhost:3000/api/seller-pro/stats` → zwraca licznik kliknięć i listę zgłoszeń z timestampami.
6. **Restart serwera**: `stats` znowu puste — potwierdza in-memory (zgodnie z PRD).
7. **Build**: `npm run build` — bez błędów TS/ESLint.
8. **Responsive**: banner i landing page wyglądają OK na mobile (DevTools, 375px).
