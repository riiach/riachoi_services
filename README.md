![Ria Choi Portfolio Demo](./chrome_tIymrJJZx0.gif)
# Ria Choi Portfolio & Blog Platform

A personal portfolio, blog, and service-estimate platform built with Next.js 16 (App Router). Blog content is managed with Sanity CMS (plus DropInBlog for additional blog features), estimate requests and subscribers are backed by Prisma + PostgreSQL, and transactional emails are sent via Resend.

🔗 Live site: [riachoi-services.vercel.app](https://riachoi-services.vercel.app)

## Features

- **Portfolio homepage** — a landing page composed of Hero, Project, and Services sections (`sections/main`)
- **Blog** — Sanity CMS–powered post list/detail pages with tag, category, and keyword search (`app/blog`, `app/search`)
- **Sanity Studio** — CMS admin UI embedded at `/studio` (`app/studio`, `sanity/`)
- **Estimate calculator** — calculates and stores estimate items based on Feature, Category, and Package data (`app/api/estimates`, `prisma/schema.prisma`)
- **Newsletter subscription** — email subscription with validation (`app/api/subscribers`)
- **Transactional email** — welcome emails, estimate notifications, and admin alerts sent via Resend + react-email (`emails/`, `lib/service/email-service.js`)
- **Payments** — Stripe SDK included

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Styling | Tailwind CSS 4 |
| CMS | Sanity, DropInBlog |
| Database | PostgreSQL, Prisma ORM |
| Email | Resend, react-email |
| Payments | Stripe |
| Validation | Zod |
| Deployment | Vercel |

## Project Structure

```
frontend/
├── app/                # App Router pages & API routes
│   ├── about/
│   ├── blog/[slug]/
│   ├── pricing/
│   ├── search/
│   ├── studio/         # Embedded Sanity Studio
│   └── api/
│       ├── estimates/calculate/
│       ├── features/
│       └── subscribers/
├── components/         # Reusable UI components (card, layout, ui)
├── sections/           # Page-level composed sections (main, blog, content)
├── context/             # React Context (service, category, search tag)
├── hooks/               # Custom hooks
├── lib/
│   ├── prisma.ts        # Prisma client
│   ├── repository/      # Data access layer
│   ├── service/          # Business logic (e.g. email)
│   ├── validations/      # Zod schemas
│   └── dropinblog.js, resend.js
├── sanity/              # Sanity client, queries, schema
├── emails/              # react-email templates
├── prisma/              # Prisma schema & seed
└── docker-compose.yml   # Local PostgreSQL
```

## Getting Started

### Prerequisites

- Node.js (latest LTS recommended)
- Docker (to run PostgreSQL locally)

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Set up environment variables

Create a `frontend/.env` file with the following values:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/ria_choi_portfolio_blog"

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=

# DropInBlog
DROPINBLOG_API_KEY=
DROPINBLOG_BLOG_ID=

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=
ADMIN_EMAIL=
```

### 3. Start the local database

```bash
docker compose up -d
```

### 4. Run Prisma migrations & seed

```bash
npx prisma migrate dev
npx prisma db seed
```

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Data Model (Prisma)

- `Subscriber` — newsletter subscribers
- `Feature` / `Category` / `Package` — feature, category, and package data used for estimates (bilingual: EN/KO)
- `EstimateRequest` / `EstimateItem` — estimate requests submitted by users and their line items
- `EmailLog` — log of emails sent via Resend

## Deployment

Deploying via the [Vercel Platform](https://vercel.com/new) is recommended. See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.

## How I built this - Tech Blog

Open [This Blog Post](https://riachoi-services.vercel.app/blog/subscription-and-email-in-next-js) to read about it.


