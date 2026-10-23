This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Blog caching

Blog pages and Sanity reads are cached without a periodic revalidation timer.
Code changes take effect through Vercel deployment. Published Sanity content
changes invalidate the shared `sanity-content` tag through a signed webhook;
visited pages are regenerated on their next request. All pages share the post
list in the header, so post, category, and author changes invalidate that shared
content. New post slugs are generated on first visit without a redeploy.

### Required deployment setup

1. Set a new random `SANITY_REVALIDATE_SECRET` in Vercel for Production (and each
   other deployment environment where the webhook is needed), then redeploy.
   This is a server-only webhook signing secret, not a Sanity API token. Never use
   a `NEXT_PUBLIC_` prefix or commit its value.
2. In Sanity project `lvpvhyay`, dataset `blog`, add a GROQ-powered webhook to
   `https://riachoi-services.vercel.app/api/revalidate` using POST. Enable create,
   update, and delete events, and leave draft/version events disabled.
3. Use filter `_type in ["post", "category", "subCategory", "author", "portfolio"]` and projection
   `{_id, _type}`. Set the webhook Secret to the same value as the Vercel variable.
4. Publish, edit, and delete a test post and check successful webhook deliveries
   and the corresponding pages. Confirm draft edits do not invalidate the cache.

Until that webhook is configured, CMS changes require a redeployment to appear.
Failed webhook deliveries must be retried; there is no timed freshness fallback.
Normal cache eviction, first visits, and deployments can still cause cache writes.
Compare Vercel ISR writes and bytes for similar traffic before and after deployment.

List queries omit article bodies to reduce cached and serialized payloads; detail
queries still fetch full content. Search remains request-specific while reusing
the cached list. Metadata and page rendering share the same post lookup.

Run regression checks from `frontend/` after installing dependencies:
`node --test tests/*.test.mjs`.


### highlight.js module resolution

Use `import hljs from "highlight.js/lib/core"` without `.js`. The package does not export
`highlight.js/lib/core.js`, and Turbopack rejects that path. After pulling dependency changes,
run `npm ci` from `frontend/` before restarting the dev server.

### Portfolio

Create projects under **Portfolio** in Studio. Add 1–4 thumbnails, a title,
**사용 툴** (tools), and a destination link. Check **Team** and/or **Boot Camp**
as needed; tools and checked classifications populate the cards and filter.
The project date controls year/month groups. Clicking a card opens its destination;
on touch devices the thumbnail stack still expands and the title/card text opens
the link. Previously published `/portfolio/<slug>` URLs remain available.
Portfolio data refreshes after 60 seconds; including `portfolio` in the webhook
filter above enables immediate invalidation.
