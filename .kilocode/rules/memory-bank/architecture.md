# Architecture

**System Architecture:**
- **Frontend:** Next.js (React, TypeScript, Tailwind CSS)
- **Backend (API):** Next.js API Routes (TypeScript)
- **Database:** PostgreSQL (managed via Prisma ORM)
- **Authentication:** NextAuth.js (implied by `app/package.json` dependency)
- **Custom Tooling:** MCP Server (`mcp-server/src/index.ts`) for extending capabilities.

**Source Code Paths:**
- **Main Application:** `app/` directory
- **API Routes:** `app/app/api/`
- **UI Components:** `app/components/`
- **Database Schema:** `app/prisma/schema.prisma`
- **Custom MCP Server:** `mcp-server/`

**Key Technical Decisions:**
- **Full-stack Next.js:** Leverages Next.js for both frontend rendering and backend API routes, simplifying deployment and development.
- **Prisma ORM:** Provides a type-safe and efficient way to interact with the PostgreSQL database.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **Modular Component Design:** UI is composed of distinct, reusable components (e.g., `HeroSection`, `PricingSection`).
- **Email Subscription API:** Dedicated API endpoint for handling email sign-ups, including validation and database persistence.
- **MCP Server Integration:** Allows for custom tools and extensions, potentially for automation or specialized tasks.

**Design Patterns in Use:**
- **Component-Based Architecture:** Standard for React applications, promoting reusability and maintainability.
- **API Routes as Microservices:** Next.js API routes function as small, focused backend services.

**Component Relationships:**
- `app/app/page.tsx` imports and orchestrates various UI components to form the landing page.
- UI components (e.g., `EmailSubscriptionForm`) interact with Next.js API routes (e.g., `/api/subscribe`) for data submission.
- API routes interact with the Prisma ORM to perform database operations.

**Critical Implementation Paths:**
- **Email Subscription Flow:** User input -> Frontend form -> Next.js API route -> Zod validation -> Prisma -> PostgreSQL database.
- **Page Rendering:** Next.js server-side rendering (SSR) or static site generation (SSG) for initial page load, followed by client-side hydration.