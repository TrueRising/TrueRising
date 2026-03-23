# Nageeb Website (Next.js)

Production-ready bilingual website for **Nageeb** with Arabic-first routing and executive-luxury UI.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS
- Framer Motion (subtle motion)
- Locale-prefixed routing (`/ar`, `/en`)

## Run locally
```bash
npm install
npm run dev
```

## Build checks
```bash
npm run lint
npm run build
```

## Environment variables
Create `.env.local` as needed:

```bash
GOOGLE_SHEETS_WEBHOOK_URL=
RESEND_API_KEY=
CONTACT_TO_EMAIL=anageeb@gmail.com
```

If integrations are not configured, form submissions return an honest fallback response and the UI guides users to WhatsApp/email.

## Key routes
- `/ar` (default)
- `/en`
- `/{locale}/services`, `/{locale}/work`, `/{locale}/process`, `/{locale}/about`, `/{locale}/insights`, `/{locale}/contact`, `/{locale}/start-project`

## SEO
- Canonicals + localized OG metadata per page
- `sitemap.xml` + `robots.txt`
- Organization + FAQ JSON-LD on the homepage
