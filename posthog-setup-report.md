<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the FashionHero ecommerce project. PostHog is initialized via `instrumentation-client.ts` (the recommended approach for Next.js 15.3+) and uses a reverse proxy through `/ingest` to improve reliability. A server-side PostHog client was added for API route tracking. Environment variables are stored in `.env.local` and never hardcoded.

## Events instrumented

| Event | Description | File |
|---|---|---|
| `user_signed_in` | User successfully submits the login form; also calls `posthog.identify()` | `src/app/account/login/page.tsx` |
| `user_registered` | User creates a new account; also calls `posthog.identify()` | `src/app/account/register/page.tsx` |
| `product_viewed` | User lands on a product detail page (top of conversion funnel) | `src/app/products/[slug]/recently-viewed-section.tsx` |
| `product_added_to_cart` | User adds a product to cart (with `source: "product_page"`) | `src/components/product-info.tsx` |
| `product_added_to_cart` | User adds a product to cart via quick view (with `source: "quick_view"`) | `src/components/quick-view-modal.tsx` |
| `product_wishlisted` | User adds or removes a product from their wishlist (includes `action: "added"\|"removed"`) | `src/components/wishlist-button.tsx` |
| `cart_item_removed` | User removes an item from the cart drawer | `src/components/cart-drawer.tsx` |
| `checkout_started` | User clicks the Checkout button in the cart drawer | `src/components/cart-drawer.tsx` |
| `order_placed` | User clicks Place Order on the checkout page | `src/app/checkout/page.tsx` |
| `search_performed` | User searches and clicks a result (includes query, result count, clicked product) | `src/components/search-modal.tsx` |
| `collection_filtered` | User applies a filter on a collection page (gender, sort, price, type, material) | `src/components/filter-bar.tsx` |
| `seller_pro_banner_clicked` | User clicks the "Join the Beta" CTA on the Seller PRO banner | `src/components/sections/seller-pro-banner.tsx` |
| `seller_pro_signup_submitted` | User successfully submits the Seller PRO beta signup form (server-side, with `posthog.identify()`) | `src/app/api/seller-pro/signup/route.ts` |

## Files created/modified

- **Created** `instrumentation-client.ts` — PostHog client-side initialization (Next.js 15.3+ pattern)
- **Created** `src/lib/posthog-server.ts` — Singleton PostHog Node.js client for API routes
- **Modified** `next.config.ts` — Added reverse proxy rewrites for `/ingest` → PostHog EU
- **Created** `.env.local` — `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/697941) — all 5 insights in one view
- [Purchase Conversion Funnel](/insights/rq2cyLJK) — product_viewed → added to cart → checkout started → order placed
- [Add to Cart Trend](/insights/g5bwx8Gq) — daily add-to-cart volume over 30 days
- [New User Registrations](/insights/lHge9BnL) — registrations and sign-ins over time
- [Seller PRO Signup Funnel](/insights/XaGnWjWH) — banner click → beta signup conversion rate
- [Wishlist Activity](/insights/p1OfD9WB) — daily wishlist engagement over 30 days

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
