# Bellhouse Excavating Website

Production website for **Bellhouse Excavating**, a heavy equipment and excavation company based in Ontario, Canada.

This is a real-world client project that is actively maintained and used in production. The focus is on performance, reliability, SEO, and operational integrations rather than demos or tutorials.

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- SCSS (component-scoped modules)
- Server Actions
- Nodemailer (SMTP email delivery)
- Google Sheets API (submission tracking)
- Google reCAPTCHA v3 (spam protection)
- DigitalOcean (production hosting)
- Nginx reverse proxy + SSL

---

## Key Features

- SEO-focused service and location pages
- Mobile-first, responsive layout
- Performance-optimized assets and images
- App Router client/server separation
- Secure form handling using Server Actions
- Server-side validation and spam filtering
- reCAPTCHA verification performed on the server
- Dual email notifications (business + customer)
- Asynchronous persistence of submissions to Google Sheets
- Duplicate submission prevention
- Production logging and error handling

---

## Contact Form Architecture

The contact form uses a **client component paired with a server action**, designed to keep all sensitive logic server-side.

**Submission flow:**

1. Client validates user input and requests a reCAPTCHA token
2. Token and form data are submitted to a server action
3. Server performs schema validation and spam checks
4. reCAPTCHA token is verified server-side
5. Emails are sent via SMTP
6. Submission data is logged asynchronously to Google Sheets

This approach avoids exposing secrets client-side and ensures reliability under real-world usage.

---

## Production Considerations

- Sensitive credentials and environment variables are excluded
- External services are isolated behind server actions
- Code reflects production trade-offs rather than idealized patterns
- Error handling and resilience prioritized over abstraction purity

---

## Why This Repository Is Public

This repository is public as part of my professional portfolio.

It demonstrates my ability to:

- Build and maintain production web applications
- Use Next.js App Router and Server Actions effectively
- Design secure, reliable form workflows
- Integrate third-party services (SMTP, Google APIs, reCAPTCHA)
- Balance technical decisions with real business requirements

---

## Notes

- Actively maintained
- Some implementation details are simplified for clarity in a public repo
- Not a template or starter project

---

## Author

**Matt McLennan**  
https://all8webworks.ca

