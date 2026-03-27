# Bellhouse Excavating Website

Production website for **Bellhouse Excavating**, a heavy equipment and excavation company based in Ontario, Canada.

This is an actively maintained, real-world client system with live business impact. The architecture prioritizes performance, uptime, and lead reliability over demo-oriented patterns.

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- SCSS (component-scoped modules)
- Server Actions
- Brevo (transactional email delivery)
- Google Sheets API (submission tracking)
- Google reCAPTCHA v3 (spam protection)
- DigitalOcean (production hosting)
- Nginx reverse proxy + SSL
- Cloudflare (DNS, CDN, bot protection)
- GitHub Actions (scheduled monitoring + alerts)
- Playwright (browser smoke tests)

---

## Architecture Overview

The system is built as a modern **Next.js App Router** application with a clear separation of responsibilities:

- **Presentation layer:** route-based pages and reusable UI components
- **Application layer:** server actions for secure workflow execution
- **Integration layer:** Brevo, Google APIs, reCAPTCHA, Slack
- **Operational layer:** authenticated monitor endpoints, synthetic checks, and alerting

The result is a marketing site that behaves like a production service: observable, secure, and resilient.

---

## Key Features

- SEO-focused service and location pages
- Mobile-first, responsive layout
- Performance-optimized assets and images
- Clear client/server separation using App Router
- Secure form handling using Server Actions
- Server-side validation and spam filtering
- reCAPTCHA verification performed server-side
- Dual email notifications (business + customer)
- Asynchronous persistence of submissions to Google Sheets
- Duplicate submission prevention
- Production error handling and resilience

---

## Contact Form Architecture

The contact form uses a **client component paired with a server action**, designed to keep sensitive logic server-side.

**Submission flow:**

1. Client validates user input and requests a reCAPTCHA token
2. Token and form data are submitted to a server action
3. Server performs schema validation and spam checks
4. reCAPTCHA token is verified server-side
5. Emails are sent via transactional email provider (Brevo)
6. Submission data is logged asynchronously to Google Sheets

This approach avoids exposing secrets client-side and is designed for real-world reliability rather than idealized patterns.

Additional production considerations implemented in the form pipeline:

- input schema enforcement and server-side guardrails
- spam keyword and disposable email heuristics
- duplicate submission protection in persistence flow
- asynchronous persistence with failure logging
- monitor-aware synthetic path for CI/health checks

---

## Monitoring & Reliability (Production)

This project includes a production monitoring system designed to detect failures quickly and alert the team before leads are lost.

### Monitoring Coverage

Scheduled checks run daily and include:

- **Daily email pipeline check** (transactional email delivery)
- **Homepage HTML check** (detects “site is up but broken” scenarios)
- **Synthetic contact pipeline check** (server-side form workflow without relying on reCAPTCHA in CI)
- **SSL certificate expiry monitoring**
- **Slack alerts** on failure with a specific failure reason

Monitoring endpoints are protected using Bearer token authentication.

This monitoring strategy is intentionally practical: it verifies the customer-facing page, integration health, and delivery path so failures are detected before they become lost leads.

### Failure Tripwire

Contact and integration failures (email delivery or Google Sheets persistence) are logged server-side.  
If failures occur within a 24-hour window, the daily monitor fails intentionally to surface the issue via alerts.

---

## Browser Smoke Tests (Playwright)

Playwright is used for scheduled browser-level smoke tests to validate that:

- The homepage renders correctly in a real browser
- The contact page renders and form fields are present
- Console errors, runtime page errors, and failed network requests are treated as test failures

Form submission is not performed in Playwright due to reCAPTCHA v3 behavior in CI environments; server-side synthetic checks cover the submission pipeline.

This split keeps browser tests stable while still validating the critical lead-capture path through synthetic server-side checks.

---

## Cloudflare Usage

- Cloudflare is used for DNS, CDN caching, and basic bot protection for public traffic
- Human traffic is proxied through Cloudflare
- Monitoring and webhook traffic is routed through a separate DNS-only subdomain to avoid Cloudflare challenges
- This separation prevents false positives in monitoring and avoids CI failures caused by bot mitigation

---

## Version & Deployment Visibility

A protected version endpoint exposes runtime metadata to verify deployments:

- Build SHA
- Build time
- Environment
- Server process start time

This allows quick confirmation that new code is running after deployments or restarts.

---

## Production Considerations

- Sensitive credentials and secrets are excluded from the repository
- External services are isolated behind server actions or secured routes
- Code reflects production trade-offs rather than idealized abstractions
- Reliability and observability are prioritized over framework novelty

---

## Why This Repository Is Public

This repository is public as part of my professional portfolio.

It demonstrates my ability to:

- Build and maintain production web applications
- Use Next.js App Router and Server Actions effectively
- Design secure, reliable form workflows
- Integrate third-party services (email, Google APIs, reCAPTCHA, Slack)
- Implement monitoring, synthetic checks, and browser smoke tests
- Make pragmatic architectural decisions based on real business needs

---

## Highlights for Employers

This project demonstrates senior-level product engineering behaviors beyond UI implementation:

- Designing for **business continuity** (alerts, monitoring, and failure tripwires)
- Building secure server/client boundaries for sensitive workflows
- Integrating multiple external services with graceful degradation
- Shipping SEO-conscious, performance-oriented pages for local lead generation
- Maintaining production software with operational visibility and test coverage

In short: this repository reflects how I build and run software that has to work in production, not just pass local demos.

---

## Notes

- Actively maintained
- Some implementation details are simplified for clarity in a public repo
- Not a template or starter project

---

## Author

**Matt McLennan**  
https://all8webworks.ca
