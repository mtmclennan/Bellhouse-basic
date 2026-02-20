import type { Metadata } from 'next';
import classes from './PrivacyPolicy.module.scss';
import LayoutHome from '../components/layoutsWeb/layoutHome';

export const metadata: Metadata = {
  title: 'Privacy Policy | Bellhouse Excavating',
  description:
    'Privacy Policy for Bellhouse Excavating outlining how we collect, use, and protect personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <LayoutHome>
      <main className={classes.page}>
        <div className={classes.container}>
          <div className={classes.header}>
            <h1 className={classes.title}>Privacy Policy</h1>
            <p className={classes.effectiveDate}>
              <strong>Effective Date:</strong> January 1, 2026
            </p>
          </div>

          <section className={classes.section}>
            <p>
              Bellhouse Excavating (“Bellhouse”, “we”, “our”, or “us”) respects
              your privacy and is committed to protecting your personal
              information. This Privacy Policy explains how we collect, use, and
              safeguard your information when you visit our website or contact
              us.
            </p>
          </section>

          <section className={classes.section}>
            <h2>1. Information We Collect</h2>
            <p>When you submit a form or contact us, we may collect:</p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Work type or project details</li>
              <li>Message content</li>
            </ul>

            <p>When you use our website, we may automatically collect:</p>
            <ul>
              <li>IP address</li>
              <li>Device and browser information</li>
              <li>Pages visited</li>
              <li>Date and time of visit</li>
              <li>Referral source</li>
            </ul>
          </section>

          <section className={classes.section}>
            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>Respond to inquiries</li>
              <li>Provide estimates and project information</li>
              <li>Communicate about excavation and hauling services</li>
              <li>Send service-related SMS messages if consent is provided</li>
              <li>Improve website performance and advertising effectiveness</li>
              <li>Maintain internal business records</li>
            </ul>
            <p>We do not sell your personal information.</p>
          </section>

          <section className={classes.section}>
            <h2>3. SMS Messaging & Consent</h2>
            <p>
              If you provide your phone number and consent to receive SMS
              messages:
            </p>
            <ul>
              <li>
                Messages may include project updates, scheduling information,
                and service-related communication.
              </li>
              <li>
                Message frequency varies depending on your inquiry or project.
              </li>
              <li>Message and data rates may apply.</li>
              <li>
                You may reply <strong>STOP</strong> at any time to opt out.
              </li>
              <li>
                You may reply <strong>HELP</strong> for assistance.
              </li>
            </ul>

            <div className={classes.callout}>
              <p>
                No mobile information will be shared with third
                parties/affiliates for marketing/promotional purposes. All the
                above categories exclude text messaging originator opt-in data
                and consent; this information will not be shared with any third
                parties.
              </p>
            </div>
          </section>

          <section className={classes.section}>
            <h2>4. Email Communications</h2>
            <p>
              We may send confirmation emails or follow-ups related to your
              request. We use third-party email service providers to deliver
              these communications.
            </p>
          </section>

          <section className={classes.section}>
            <h2>5. Website Analytics & Advertising</h2>
            <p>
              We use services provided by Google, including Google Analytics and
              Google Ads, to understand website traffic and measure advertising
              performance.
            </p>
            <p>
              Google may use cookies and similar technologies to collect usage
              data. Learn more:
            </p>

            <ul className={classes.links}>
              <li>
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  How Google uses information
                </a>
              </li>
              <li>
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Analytics Opt-out
                </a>
              </li>
              <li>
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Ad Settings
                </a>
              </li>
            </ul>
          </section>

          <section className={classes.section}>
            <h2>6. Cookies</h2>
            <p>
              Our website may use cookies to enhance user experience and gather
              analytical data. You can disable cookies through your browser
              settings.
            </p>
          </section>

          <section className={classes.section}>
            <h2>7. Data Storage & Security</h2>
            <p>
              We use reasonable administrative and technical safeguards to
              protect your information. Data may be stored using secure hosting
              providers, email service providers, phone/SMS providers, and
              internal tracking systems.
            </p>
            <p>
              While we take reasonable precautions, no method of transmission
              over the internet is 100% secure.
            </p>
          </section>

          <section className={classes.section}>
            <h2>8. Information Sharing</h2>
            <p>
              We do not sell, rent, or trade your personal information. We may
              share information only when necessary to provide requested
              services or comply with legal obligations.
            </p>
          </section>

          <section className={classes.section}>
            <h2>9. Your Rights</h2>
            <p>
              Under Canadian privacy law, you may request access to your
              personal information, request corrections, withdraw SMS consent,
              or request deletion of your information (subject to legal
              retention requirements).
            </p>
          </section>

          <section className={classes.section}>
            <h2>10. Contact Information</h2>
            <p className={classes.contact}>
              Bellhouse Excavating
              <br />
              Phone: <a href="tel:5197528500">519-752-8500</a>
              <br />
              Email:{' '}
              <a href="mailto:info@bellhouseexcavating.ca">
                info@bellhouseexcavating.ca
              </a>
              <br />
              Website:{' '}
              <a
                href="https://bellhouseexcavating.ca"
                target="_blank"
                rel="noopener noreferrer"
              >
                bellhouseexcavating.ca
              </a>
            </p>
          </section>
        </div>
      </main>
    </LayoutHome>
  );
}
