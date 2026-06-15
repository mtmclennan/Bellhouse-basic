'use client';

import { useState } from 'react';
import { sendContactForm } from '@/app/actions/contact';
import classes from './ServiceHeroQuoteForm.module.scss';

const workTypeOptions = [
  'Foundation dig',
  'Basement excavation',
  'Footings & piers',
  'Garage pad dig',
  'Addition excavation',
  'Site prep & grading',
  'Land grading & drainage',
  'Dirt & gravel delivery',
  'Demolition',
  'Other / not sure',
] as const;

interface ServiceHeroQuoteFormProps {
  heading?: string;
  workType?: string;
}

export default function ServiceHeroQuoteForm({
  heading = 'Get a Free Quote',
  workType,
}: ServiceHeroQuoteFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedType, setSelectedType] = useState(workType ?? workTypeOptions[0]);
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Add your name.';
    if (!phone.trim()) errs.phone = 'Add a phone number.';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus('submitting');

    try {
      await sendContactForm({
        name: name.trim(),
        phone: phone.trim(),
        email: '',
        workType: selectedType,
        message: location.trim()
          ? `Project location: ${location.trim()}`
          : `Requesting a free quote for: ${selectedType}`,
        token: 'hero-form',
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={classes.card}>
        <div className={classes.success}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="12" fill="#1f7a39" opacity="0.12" />
            <path d="M7 12.5l3.5 3.5L17 9" stroke="#1f7a39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h3>Got it — we&rsquo;ll be in touch</h3>
          <p>Need to move faster? Call directly.</p>
          <a href="tel:5197528500" className={classes.callLink}>
            519-752-8500
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.card} id="service-hero-form">
      <div className={classes.cardHead}>
        <h3>{heading}</h3>
        <p>Bellhouse replies with real numbers, not a range.</p>
      </div>

      <form className={classes.cardBody} onSubmit={handleSubmit} noValidate>
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
            {workTypeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className={classes.field}>
          <label htmlFor="hero-location">
            Location{' '}
            <span className={classes.optional}>(optional)</span>
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

        <button
          type="submit"
          className={classes.submitBtn}
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending…' : heading}
        </button>

        {status === 'error' ? (
          <p className={classes.errorMsg}>
            Something went wrong. Please try again or call{' '}
            <a href="tel:5197528500">519-752-8500</a>.
          </p>
        ) : null}

        <p className={classes.trust}>
          No obligation · Free review · Fast reply
        </p>
      </form>
    </div>
  );
}
