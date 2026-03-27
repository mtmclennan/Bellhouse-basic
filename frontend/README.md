# Frontend (Next.js)

This directory contains the production web application for Bellhouse Excavating.

It is built with **Next.js App Router**, **React**, and **TypeScript**, with a focus on SEO, reliability, and lead capture quality.

## What this app includes

- Route-based marketing pages (home, services, service details, about, contact)
- Dynamic service pages driven by JSON content
- A server-action-based contact workflow with reCAPTCHA verification
- Transactional email delivery via Brevo
- Google Sheets persistence for submission tracking
- Monitor endpoints used by scheduled health checks
- Playwright smoke tests for browser-level confidence

## Run locally

From this `frontend/` directory:

```bash
npm install
npm run dev
```

Then open:

- http://localhost:3000 (development)

## Build and run production mode

```bash
npm run build
npm run start
```

The production start script runs Next.js on port `8000`.

## Scripts

- `npm run dev` — start local development server
- `npm run build` — create production build
- `npm run start` — run production server on port 8000
- `npm run lint` — run lint checks
- `npm run test:e2e` — run Playwright smoke tests

## Environment and integrations

This app depends on environment variables for third-party services (email, monitoring, and anti-spam). Sensitive keys are intentionally not committed.

For architecture and production context, see the repository root `README.md`.
