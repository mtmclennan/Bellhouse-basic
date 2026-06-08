'use client';

import Script from 'next/script';
import { Paperclip, UploadSimple } from '@phosphor-icons/react';
import { FormEvent, useMemo, useState } from 'react';
import { sendContactForm } from '@/app/actions/contact';
import type {
  LandingFormField,
  LandingPageData,
} from '@/data/landingPages/types';

type LandingQuoteFormProps = {
  form: LandingPageData['form'];
  serviceKey: string;
  pageSlug: string;
};

type LandingFormValue = boolean | string | string[];
type LandingFormValues = Record<string, LandingFormValue>;
type LandingFormErrors = Record<string, string>;

const FORM_ERROR_MESSAGE =
  'Sorry, something went wrong sending your request. Please call 519-752-8500 or try again.';

function getInitialValues(fields: LandingFormField[]): LandingFormValues {
  return fields.reduce<LandingFormValues>((values, field) => {
    if (field.type === 'checkbox') {
      values[field.name] = false;
      return values;
    }

    if (field.type === 'file') {
      values[field.name] = [];
      return values;
    }

    values[field.name] = '';
    return values;
  }, {});
}

function isMissingRequiredValue(value: LandingFormValue | undefined) {
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'boolean') return value === false;
  return !value || !value.trim();
}

function isEmailValue(value: LandingFormValue | undefined) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function formatFieldValue(value: LandingFormValue | undefined) {
  if (Array.isArray(value)) {
    return value.length ? value.join(', ') : 'None provided';
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  return value?.trim() || 'Not provided';
}

function validateFields(fields: LandingFormField[], values: LandingFormValues) {
  return fields.reduce<LandingFormErrors>((errors, field) => {
    const value = values[field.name];

    if (field.required && isMissingRequiredValue(value)) {
      errors[field.name] = `${field.label} is required.`;
      return errors;
    }

    if (field.type === 'email' && value && !isEmailValue(value)) {
      errors[field.name] = 'Please enter a valid email address.';
    }

    return errors;
  }, {});
}

function buildDetailsSummary({
  fields,
  values,
  serviceKey,
  pageSlug,
  timestamp,
}: {
  fields: LandingFormField[];
  values: LandingFormValues;
  serviceKey: string;
  pageSlug: string;
  timestamp: string;
}) {
  // TODO: Add backend upload support for landing page file fields once the Bellhouse lead workflow supports attachments.
  const lines = fields.map(
    (field) => `${field.label}: ${formatFieldValue(values[field.name])}`,
  );

  return [
    'Landing page quote request',
    `Source: landing-page`,
    `Service key: ${serviceKey}`,
    `Landing page slug: ${pageSlug}`,
    `Submitted at: ${timestamp}`,
    '',
    'Submitted details:',
    ...lines,
    '',
    'Note: File upload fields currently submit selected file names only. Actual file upload support still needs backend work.',
  ].join('\n');
}

function getStringValue(values: LandingFormValues, name: string) {
  const value = values[name];
  return typeof value === 'string' ? value.trim() : '';
}

function getFieldClassName(field: LandingFormField) {
  const defaultWidth =
    field.type === 'textarea' || field.type === 'file' || field.type === 'checkbox'
      ? 'full'
      : 'full';

  return `landing-form__field landing-form__field--${field.width ?? defaultWidth}`;
}

export default function LandingQuoteForm({
  form,
  serviceKey,
  pageSlug,
}: LandingQuoteFormProps) {
  const formId = form.id ?? 'landing-page-quote';
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
  const [values, setValues] = useState<LandingFormValues>(() =>
    getInitialValues(form.fields),
  );
  const [errors, setErrors] = useState<LandingFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const statusId = `${formId}-status`;
  const successMessage =
    form.successMessage ?? 'Thanks. Bellhouse will review your details shortly.';
  const requiredFields = useMemo(
    () =>
      new Set(form.fields.filter((field) => field.required).map((field) => field.name)),
    [form.fields],
  );

  function setFieldValue(name: string, value: LandingFormValue) {
    setValues((current) => ({
      ...current,
      [name]: value,
    }));
    setSubmitted(false);
    setSubmitError(null);
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const nextErrors = validateFields(form.fields, values);
    const phone = getStringValue(values, 'phone');
    const smsConsent = Boolean(values.smsConsent);

    if (phone && !smsConsent) {
      nextErrors.smsConsent =
        'Please consent to receive SMS messages if you provide a phone number.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    if (!recaptchaSiteKey || typeof window.grecaptcha === 'undefined') {
      setSubmitError(FORM_ERROR_MESSAGE);
      return;
    }

    const timestamp = new Date().toISOString();
    // TODO: Extend the existing Bellhouse lead submission workflow if landing-specific payload storage is needed beyond email / Google Sheets message details.
    const payload = {
      serviceKey,
      pageSlug,
      fields: values,
      timestamp,
      source: 'landing-page',
    };

    try {
      setSubmitting(true);

      const token = await window.grecaptcha.execute(recaptchaSiteKey, {
        action: 'landing_quote_submit',
      });

      const result = await sendContactForm({
        name: getStringValue(values, 'name'),
        email: getStringValue(values, 'email'),
        phone,
        workType: getStringValue(values, 'projectType') || serviceKey,
        message: buildDetailsSummary({
          fields: form.fields,
          values: payload.fields,
          serviceKey,
          pageSlug,
          timestamp,
        }),
        token,
        smsConsent: phone ? smsConsent : false,
        smsDisclosureShown: Boolean(phone),
      });

      if (result?.success) {
        setSubmitted(true);
        return;
      }

      setSubmitted(false);
      setSubmitError(result?.error ? `${FORM_ERROR_MESSAGE}` : FORM_ERROR_MESSAGE);
    } catch (error) {
      console.error('Landing quote form submission error:', error);
      setSubmitted(false);
      setSubmitError(FORM_ERROR_MESSAGE);
    } finally {
      setSubmitting(false);
    }
  }

  function renderField(field: LandingFormField) {
    const id = `${formId}-${field.name}`;
    const error = errors[field.name];
    const errorId = `${id}-error`;
    const isRequired = requiredFields.has(field.name);
    const commonProps = {
      id,
      name: field.name,
      required: field.required,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? errorId : undefined,
    };

    const labelText = (
      <span className="landing-form__label-text">
        {field.label}
        {isRequired ? (
          <span className="landing-form__required" aria-hidden="true">
            {' '}
            *
          </span>
        ) : null}
      </span>
    );

    if (field.type === 'textarea') {
      return (
        <label key={field.name} className={getFieldClassName(field)} htmlFor={id}>
          {labelText}
          <textarea
            {...commonProps}
            value={String(values[field.name] ?? '')}
            placeholder={field.placeholder}
            onChange={(event) => setFieldValue(field.name, event.target.value)}
          />
          {error ? (
            <span className="landing-form__error" id={errorId}>
              {error}
            </span>
          ) : null}
        </label>
      );
    }

    if (field.type === 'select') {
      return (
        <label key={field.name} className={getFieldClassName(field)} htmlFor={id}>
          {labelText}
          <select
            {...commonProps}
            value={String(values[field.name] ?? '')}
            onChange={(event) => setFieldValue(field.name, event.target.value)}
          >
            <option value="" disabled>
              {field.placeholder ?? field.label}
            </option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {error ? (
            <span className="landing-form__error" id={errorId}>
              {error}
            </span>
          ) : null}
        </label>
      );
    }

    if (field.type === 'checkbox') {
      return (
        <label
          key={field.name}
          className={`${getFieldClassName(field)} landing-form__checkbox`}
          htmlFor={id}
        >
          <input
            {...commonProps}
            type="checkbox"
            checked={Boolean(values[field.name])}
            onChange={(event) => setFieldValue(field.name, event.target.checked)}
          />
          <span>{labelText}</span>
          {error ? (
            <span className="landing-form__error" id={errorId}>
              {error}
            </span>
          ) : null}
        </label>
      );
    }

    if (field.type === 'file') {
      const selectedFiles = values[field.name];

      const fileNames =
        Array.isArray(selectedFiles) && selectedFiles.length > 0
          ? selectedFiles
          : [];

      return (
        <label key={field.name} className={getFieldClassName(field)} htmlFor={id}>
          {labelText}
          <span className="landing-form__upload">
            <UploadSimple
              size={26}
              weight="bold"
              className="landing-form__upload-icon"
              aria-hidden="true"
            />
            <span className="landing-form__upload-text">
              <strong>Add site photos or drawings</strong>
              Helps us scope the job and price faster
            </span>
            <input
              {...commonProps}
              type="file"
              multiple
              accept="image/*,.pdf"
              onChange={(event) =>
                setFieldValue(
                  field.name,
                  Array.from(event.target.files ?? []).map((file) => file.name),
                )
              }
            />
          </span>
          {fileNames.length > 0 ? (
            <span className="landing-form__file-list">
              <Paperclip size={13} weight="bold" aria-hidden="true" />
              {fileNames.join(', ')}
            </span>
          ) : null}
          {error ? (
            <span className="landing-form__error" id={errorId}>
              {error}
            </span>
          ) : null}
        </label>
      );
    }

    return (
      <label key={field.name} className={getFieldClassName(field)} htmlFor={id}>
        {labelText}
        <input
          {...commonProps}
          type={field.type}
          value={String(values[field.name] ?? '')}
          placeholder={field.placeholder}
          onChange={(event) => setFieldValue(field.name, event.target.value)}
        />
        {error ? (
          <span className="landing-form__error" id={errorId}>
            {error}
          </span>
        ) : null}
      </label>
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

      <aside
        className="landing-form landing-quote-form"
        aria-labelledby="landing-quote-heading"
      >
        <div className="landing-form__head">
          <h2 id="landing-quote-heading">{form.heading}</h2>
          {form.description ? <p>{form.description}</p> : null}
        </div>
        <form
          className="landing-form__body"
          aria-describedby={statusId}
          data-conversion-service={serviceKey}
          data-conversion-page={pageSlug}
          data-service-key={serviceKey}
          noValidate
          onSubmit={handleSubmit}
        >
          {submitted ? (
            <div
              className="landing-form__success-state"
              id={statusId}
              role="status"
            >
              <h3>Request received</h3>
              <p>{successMessage}</p>
            </div>
          ) : (
            <>
              {form.fields.map(renderField)}
              <button
                type="submit"
                disabled={submitting}
                data-conversion="landing-form-submit"
                data-conversion-service={serviceKey}
                data-conversion-page={pageSlug}
              >
                {submitting ? 'Sending...' : form.submitLabel}
              </button>
              {submitError ? (
                <p className="landing-form__submit-error" role="alert">
                  {submitError}
                </p>
              ) : null}
              <p className="landing-form__success" id={statusId}>
                Required fields are marked with an asterisk.
              </p>
            </>
          )}
        </form>
      </aside>
    </>
  );
}
