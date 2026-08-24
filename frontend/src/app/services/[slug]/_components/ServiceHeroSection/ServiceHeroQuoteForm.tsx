'use client';

import Script from 'next/script';
import { useRef, useState } from 'react';
import { sendServiceHeroForm } from '@/app/actions/contact';
import {
  GOOGLE_ADS_CONVERSION_LABELS,
  trackEvent,
  trackGoogleAdsConversion,
} from '@/lib/tracking/google';
import { getLeadAttribution } from '@/lib/tracking/attribution';
import classes from './ServiceHeroQuoteForm.module.scss';

const WORK_TYPE_OPTIONS = [
  'Foundation dig',
  'Basement excavation',
  'Footings & piers',
  'Garage pad dig',
  'Addition excavation',
  'Site prep & grading',
  'Land grading & drainage',
  'Dirt & gravel delivery',
  'Equipment hauling / float service',
  'Demolition',
  'Other / not sure',
] as const;

const SMS_DISCLOSURE = [
  'By submitting you consent to receive SMS messages from Bellhouse Excavating.',
  'Message & data rates may apply. Frequency varies.',
  'Reply STOP to opt out. Reply HELP for assistance.',
] as const;

interface ServiceHeroQuoteFormProps {
  heading?: string;
  workType?: string;
}

export default function ServiceHeroQuoteForm({
  heading = 'Get a Free Quote',
  workType,
}: ServiceHeroQuoteFormProps) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
  const honeypotRef = useRef<HTMLInputElement>(null);
  const formStartedRef = useRef(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedType, setSelectedType] = useState(workType ?? WORK_TYPE_OPTIONS[0]);
  const [location, setLocation] = useState('');
  const [smsConsent, setSmsConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const hasPhone = phone.trim().length > 0;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Name is required.';
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!phone.trim()) errs.phone = 'Phone number is required.';
    if (hasPhone && !smsConsent) errs.smsConsent = 'SMS consent is required when providing a phone number.';
    return errs;
  };

  const trackFormStart = () => {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    trackEvent('form_start', {
      form_variant: 'service-hero',
      service: selectedType,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      trackEvent('quote_form_error', { form_variant: 'service-hero', error_type: 'validation' });
      return;
    }
    setErrors({});
    setStatus('submitting');

    try {
      if (!recaptchaSiteKey || typeof window.grecaptcha === 'undefined') {
        throw new Error('Verification not ready. Please try again.');
      }

      const token = await window.grecaptcha.execute(recaptchaSiteKey, {
        action: 'service_hero_quote',
      });

      const result = await sendServiceHeroForm({
        name: name.trim(),
        email: email.trim() || undefined,
        phone: phone.trim(),
        workType: selectedType,
        location: location.trim() || undefined,
        token,
        honeypot: honeypotRef.current?.value || '',
        smsConsent,
        smsDisclosureShown: hasPhone,
        attribution: getLeadAttribution(selectedType),
      });

      if (result?.success) {
        trackEvent('quote_form_submit', {
          form_variant: 'service-hero',
          service: selectedType,
        });
        trackGoogleAdsConversion(GOOGLE_ADS_CONVERSION_LABELS.quoteFormSubmit);
        setStatus('success');
      } else {
        trackEvent('quote_form_error', { form_variant: 'service-hero', error_type: 'server' });
        setStatus('error');
      }
    } catch {
      trackEvent('quote_form_error', { form_variant: 'service-hero', error_type: 'exception' });
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={classes.card}>
        <div className={classes.success} role="status">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="12" fill="#1f7a39" opacity="0.12" />
            <path d="M7 12.5l3.5 3.5L17 9" stroke="#1f7a39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h3>Got it — we&rsquo;ll be in touch</h3>
          <p>Need to move faster? Call directly.</p>
          <a href="tel:5197528500" className={classes.callLink}>519-752-8500</a>
        </div>
      </div>
    );
  }

  return (
    <>
      {recaptchaSiteKey ? (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
          strategy="lazyOnload"
        />
      ) : null}

      <div className={classes.card} id="service-hero-form">
        <div className={classes.cardHead}>
          <h3>{heading}</h3>
          <p>Bellhouse replies with real numbers, not a range.</p>
        </div>

        <form
          className={classes.cardBody}
          onChange={trackFormStart}
          onFocus={trackFormStart}
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            ref={honeypotRef}
            type="text"
            name="companyWebsite"
            tabIndex={-1}
            autoComplete="off"
            className={classes.honeypot}
            aria-hidden="true"
          />

          <div className={classes.fieldRow}>
            <div className={classes.field}>
              <label htmlFor="hero-name">Name</label>
              <input
                id="hero-name"
                type="text"
                className={errors.name ? classes.fieldError : ''}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
              />
              {errors.name ? <span className={classes.fieldMsg}>{errors.name}</span> : null}
            </div>

            <div className={classes.field}>
              <label htmlFor="hero-email">Email <span className={classes.optional}>(optional)</span></label>
              <input
                id="hero-email"
                type="email"
                className={errors.email ? classes.fieldError : ''}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
              {errors.email ? <span className={classes.fieldMsg}>{errors.email}</span> : null}
            </div>

            <div className={classes.field}>
              <label htmlFor="hero-phone">Phone</label>
              <input
                id="hero-phone"
                type="tel"
                className={errors.phone ? classes.fieldError : ''}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Best number"
                autoComplete="tel"
              />
              {errors.phone ? <span className={classes.fieldMsg}>{errors.phone}</span> : null}
            </div>
          </div>

          <div className={classes.field}>
            <label htmlFor="hero-type">Project type</label>
            <select
              id="hero-type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {WORK_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className={classes.field}>
            <label htmlFor="hero-location">
              Location <span className={classes.optional}>(optional)</span>
            </label>
            <input
              id="hero-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Town, address, or nearest road"
              autoComplete="off"
            />
          </div>

          {hasPhone ? (
            <div className={classes.smsConsent}>
              <label className={classes.smsConsentLabel}>
                <input
                  type="checkbox"
                  checked={smsConsent}
                  onChange={(e) => setSmsConsent(e.target.checked)}
                />
                <span>I agree to receive SMS messages from Bellhouse Excavating.</span>
              </label>
              <ul className={classes.smsDisclosure}>
                {SMS_DISCLOSURE.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className={classes.privacyLink}>
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              </p>
              {errors.smsConsent ? (
                <span className={classes.fieldMsg}>{errors.smsConsent}</span>
              ) : null}
            </div>
          ) : null}

          <button
            type="submit"
            className={classes.submitBtn}
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending…' : heading}
          </button>

          {status === 'error' ? (
            <p className={classes.errorMsg} role="alert">
              Something went wrong. Please try again or call{' '}
              <a href="tel:5197528500">519-752-8500</a>.
            </p>
          ) : null}

          <p className={classes.trust}>No obligation · Free review · Fast reply</p>
        </form>
      </div>
    </>
  );
}
