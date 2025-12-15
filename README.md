# Bellhouse Excavating Website

Production website for Bellhouse Excavating, a heavy equipment and excavation company based in Ontario, Canada.

This is a real-world client project built and maintained in production, with a focus on performance, reliability, SEO, and operational integrations rather than demos or tutorials.

## Tech Stack
- Next.js (App Router)
- React
- TypeScript
- SCSS (modular, component-scoped styling)
- Nodemailer (SMTP email delivery)
- Google Sheets API (submission tracking)
- Google reCAPTCHA v3 (spam protection)
- Deployed on DigitalOcean
- Nginx + SSL

## Key Features
- SEO-focused service and location pages
- Server Actions for secure form handling
- Client/server separation using the App Router
- Server-side form validation and spam filtering
- reCAPTCHA verification performed on the server
- Dual email notifications (business + customer)
- Background persistence of form submissions to Google Sheets
- Duplicate submission prevention
- Mobile-first, responsive layout
- Performance-optimized assets

## Contact Form Architecture
The contact form is implemented using a client component paired with a server action.

Flow:
1. Client validates input and requests a reCAPTCHA token
2. Token and form data are sent to a server action
3. Server performs validation, spam checks, and reCAPTCHA verification
4. Emails are sent via SMTP
5. Submission is logged to Google Sheets asynchronously

This approach avoids exposing secrets client-side and keeps all sensitive logic on the server.

## Why This Repository Is Public
This repository is public as part of my professional portfolio.

It demonstrates my ability to:
- Build and maintain production web applications
- Work with Next.js App Router and Server Actions
- Integrate third-party services (email, Google APIs, reCAPTCHA)
- Design reliable form workflows used by real customers
- Balance technical decisions with real business requirements

## Notes
- Sensitive credentials and configuration values are excluded
- This project is actively maintained
- Some implementation details are simplified for clarity in a public repository

## Author
Matt McLennan  
https://all8webworks.ca
