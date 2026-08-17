'use client';

import Script from 'next/script';
import logo from '../../../../public/assets/BellhouseLogo-text-LS.png';
import useInput from '../../../hooks/use-input';
import classes from './ContactForm.module.scss';
import Modal from '../UI/Modal';
import Image from 'next/image';
import React, {
  Fragment,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { emailValidate, stringValidate } from '../../../lib/input-utils';
import LoadingSpinner from '../UI/LoadingSpinner';
import { normalizeImageFile } from '@/lib/uploads/client/normalizeImageFile';
import {
  QUOTE_UPLOAD_ACCEPTED_TEXT,
  QUOTE_UPLOAD_HELPER_TEXT,
  QUOTE_UPLOAD_MAX_FILES,
  QUOTE_UPLOAD_MAX_TOTAL_BYTES,
  QUOTE_UPLOAD_PRIVACY_TEXT,
  formatUploadSize,
} from '@/lib/uploads/shared/uploadLimits';
import type { QuoteUploadClientFile } from '@/lib/uploads/shared/uploadTypes';
import { trackEvent } from '@/lib/tracking/google';
import { useQuoteSubmit } from '@/hooks/useQuoteSubmit';

interface ContactFormRef {
  scrollToForm: () => void;
}

type ContactFormVariant = 'default' | 'contractor';

type ContactFormProps = {
  variant?: ContactFormVariant;
  embedded?: boolean;
  heading?: string;
  intro?: string;
  sectionId?: string;
  initialService?: string;
  initialMessage?: string;
};

const REQUIRED_SMS_DISCLOSURE = [
  '* By clicking SUBMIT you consent to receiving SMS messages',
  '* Messages and Data rates may apply. Message frequency will vary',
  '* Reply HELP to get more assistance',
  '* Reply STOP to Opt-out of messaging',
] as const;

export const DEFAULT_WORK_TYPE_OPTIONS = [
  'General Excavation / Site Work',
  'Foundation Excavation',
  'Site Preparation',
  'Site Grading / Land Grading',
  'Land Clearing',
  'Demolition',
  'Farm / Rural Property Work',
  'Farm Land Grading / Leveling',
  'Fence-Row Clearing',
  'Pond Work',
  'Laneway / Driveway',
  'Parking Lot',
  'Retaining Walls',
  'Utility Trenches',
  'Erosion Control',
  'Drainage',
  'Trucking / Material Delivery',
  'Equipment Hauling',
  'Gravel Delivery',
  'Sand Delivery',
  'Topsoil Delivery',
  'Fill Dirt',
  'Other / Not Sure',
];

const CONTRACTOR_WORK_TYPE_OPTIONS = [
  'Excavation and site prep',
  'Grading and pad prep',
  'Foundation excavation and trenching',
  'Truck hauling and spoil export',
  'Aggregate or fill delivery',
  'Heavy equipment floating',
  'Additional equipment with operator',
  'Volvo A35 off-road truck support',
  'Multi-scope project support',
  'Other / Not Sure',
] as const;

const CONTRACTOR_TIMELINE_OPTIONS = [
  'Pricing right away',
  'Within 2 weeks',
  'Within 1 month',
  'Within 3 months',
  'Planning ahead',
  'Ongoing / repeat work',
] as const;

const VARIANT_COPY = {
  default: {
    heading: 'Tell us about your project',
    intro: '',
    nameLabel: 'Your Name',
    emailLabel: 'Your Email',
    phoneLabel: 'Your Phone Number',
    workTypeLabel: 'Type of Work Required',
    workTypePlaceholder: '-- Select Work Type --',
    customWorkTypeLabel: 'Please Specify',
    messageLabel: 'How Can We Help You?',
    messagePlaceholder: '',
    submitLabel: 'Send Request',
    successHeading: 'Thank You!',
    successBody: [
      'Your request has been received!',
      'Expect a call or email from us soon to discuss your project in more detail.',
      "We're excited to help with your project!",
    ],
  },
  contractor: {
    heading: 'Tell us about the project',
    intro:
      'Share the company, location, scope, and timing so Bellhouse can respond with the right excavation, trucking, and equipment support.',
    nameLabel: 'Contact Name',
    emailLabel: 'Work Email',
    phoneLabel: 'Phone Number',
    workTypeLabel: 'Scope Needed',
    workTypePlaceholder: '-- Select Scope --',
    customWorkTypeLabel: 'Please Specify Scope',
    messageLabel: 'Project Scope / Site Details',
    messagePlaceholder:
      'Include the site address, stage of work, hauling needs, access conditions, equipment support required, or anything else that affects scheduling and production.',
    submitLabel: 'Send Project Details',
    successHeading: 'Thanks for reaching out',
    successBody: [
      'Your contractor inquiry has been received.',
      'Bellhouse will review the project details and follow up about scope, timing, and equipment support.',
    ],
  },
} as const;

const ContactForm = forwardRef<ContactFormRef, ContactFormProps>(
  (
    {
      variant = 'default',
      embedded = false,
      heading,
      intro,
      sectionId,
      initialService,
      initialMessage,
    },
    ref,
  ) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const turnstileRef = useRef<HTMLDivElement>(null);
    const honeypotRef = useRef<HTMLInputElement>(null);
    const formStartedRef = useRef(false);
    const isContractor = variant === 'contractor';
    const copy = VARIANT_COPY[variant];

    const [showModal, setShowModal] = useState(false);

    const [selectedWorkType, setSelectedWorkType] = useState<string>(initialService ?? '');
    const [customWorkType, setCustomWorkType] = useState('');
    const [workTypeTouched, setWorkTypeTouched] = useState(false);
    const [selectedTimeline, setSelectedTimeline] = useState('');

    const [status, setStatus] = useState<string | null>(null);
    const [smsConsent, setSmsConsent] = useState(false);
    const [selectedImages, setSelectedImages] = useState<QuoteUploadClientFile[]>([]);
    const [imageUploadError, setImageUploadError] = useState<string | null>(null);

    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
    const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

    const { isRecaptchaReady, loading, submit } = useQuoteSubmit({ formVariant: variant });

    useImperativeHandle(ref, () => ({
      scrollToForm: () => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      },
    }));

    useEffect(() => {
      if (initialService) {
        setSelectedWorkType(initialService);
        trackEvent('quote_form_preselect', { service: initialService, variant });
      } else {
        setSelectedWorkType('');
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialService]);

    const {
      value: enteredName,
      isValid: enteredNameIsValid,
      hasError: nameHasError,
      valueChangeHandler: nameChangeHandler,
      inputBlurHandler: nameBlurHandler,
      reset: resetName,
    } = useInput(stringValidate);

    const {
      value: enteredCompanyName,
      isValid: enteredCompanyNameIsValid,
      hasError: companyNameHasError,
      valueChangeHandler: companyNameChangeHandler,
      inputBlurHandler: companyNameBlurHandler,
      reset: resetCompanyName,
    } = useInput(stringValidate);

    const {
      value: enteredProjectLocation,
      isValid: enteredProjectLocationIsValid,
      hasError: projectLocationHasError,
      valueChangeHandler: projectLocationChangeHandler,
      inputBlurHandler: projectLocationBlurHandler,
      reset: resetProjectLocation,
    } = useInput(stringValidate);

    const {
      value: enteredEmail,
      isValid: enteredEmailIsValid,
      hasError: emailInputHasError,
      valueChangeHandler: emailChangeHandler,
      inputBlurHandler: emailBlurHandler,
      reset: resetEmail,
    } = useInput(emailValidate);

    const {
      value: enteredPhone,
      valueChangeHandler: phoneChangeHandler,
      inputBlurHandler: phoneBlurHandler,
      reset: resetPhone,
    } = useInput(stringValidate);

    const {
      value: enteredMessage,
      valueChangeHandler: messageChangeHandler,
      inputBlurHandler: messageBlurHandler,
      isValid: messageIsValid,
      hasError: messageHasError,
      reset: resetMessage,
      setValue: setMessageValue,
    } = useInput(stringValidate);

    useEffect(() => {
      // Only prefill if the user hasn't already typed something — this can
      // only ever apply once, since initialMessage is set from a one-time
      // read on the parent page and never changes again after that.
      if (initialMessage && !enteredMessage) {
        setMessageValue(initialMessage);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialMessage]);

    const handleWorkTypeChange = (
      event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
      const value = event.target.value;
      setSelectedWorkType(value);
      setWorkTypeTouched(true);

      if (value !== 'Other / Not Sure') {
        setCustomWorkType('');
      }
    };

    const resetForm = () => {
      resetName();
      resetCompanyName();
      resetProjectLocation();
      resetEmail();
      resetPhone();
      resetMessage();
      setSelectedWorkType('');
      setCustomWorkType('');
      setWorkTypeTouched(false);
      setSelectedTimeline('');
      setSmsConsent(false);
      setSelectedImages([]);
      setImageUploadError(null);
    };

    const hasPhone = enteredPhone.trim().length > 0;
    const workTypeFinal =
      `${selectedWorkType}${customWorkType ? ` ${customWorkType}` : ''}`.trim();
    const workTypeIsValid =
      selectedWorkType.length > 0 &&
      (selectedWorkType !== 'Other / Not Sure' || customWorkType.trim().length > 0);

    const trackFormStart = () => {
      if (formStartedRef.current) return;
      formStartedRef.current = true;
      trackEvent('form_start', {
        form_variant: variant,
        service: workTypeFinal,
      });
    };

    const compiledMessage = isContractor
      ? [
          `Company Name: ${enteredCompanyName}`,
          `Project Location: ${enteredProjectLocation}`,
          `Project Timeline: ${selectedTimeline || 'Not provided'}`,
          '',
          enteredMessage,
        ].join('\n')
      : enteredMessage;

    const handleImageSelection = async (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const files = Array.from(event.target.files ?? []);
      event.target.value = '';
      setImageUploadError(null);

      if (!files.length) {
        setSelectedImages([]);
        return;
      }

      if (files.length > QUOTE_UPLOAD_MAX_FILES) {
        setImageUploadError(
          `Please upload no more than ${QUOTE_UPLOAD_MAX_FILES} photos.`,
        );
        return;
      }

      try {
        const normalizedImages: QuoteUploadClientFile[] = [];

        for (const file of files) {
          normalizedImages.push(await normalizeImageFile(file));
        }

        const totalBytes = normalizedImages.reduce(
          (sum, file) => sum + file.sizeBytes,
          0,
        );

        if (totalBytes > QUOTE_UPLOAD_MAX_TOTAL_BYTES) {
          setImageUploadError('The selected photos are too large together.');
          return;
        }

        setSelectedImages(normalizedImages);
      } catch (error) {
        setSelectedImages([]);
        setImageUploadError(
          error instanceof Error
            ? error.message
            : 'Please choose JPG, PNG, WEBP, or iPhone HEIC photos only.',
        );
      }
    };

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setStatus(null);
      setWorkTypeTouched(true);

      nameBlurHandler();
      emailBlurHandler();
      messageBlurHandler();

      if (isContractor) {
        companyNameBlurHandler();
        projectLocationBlurHandler();
      }

      const missingRequiredFields =
        !enteredNameIsValid ||
        !enteredEmailIsValid ||
        !messageIsValid ||
        !workTypeIsValid ||
        (isContractor &&
          (!enteredCompanyNameIsValid || !enteredProjectLocationIsValid));

      if (missingRequiredFields) {
        setStatus('Please fix the highlighted fields.');
        trackEvent('quote_form_error', {
          form_variant: variant,
          error_type: 'validation',
        });
        return;
      }

      if (hasPhone && !smsConsent) {
        setStatus(
          'Please consent to receive SMS messages if you provide a phone number.',
        );
        trackEvent('quote_form_error', {
          form_variant: variant,
          error_type: 'sms_consent',
        });
        return;
      }

      try {
        const result = await submit({
          contact: {
            name: enteredName,
            email: enteredEmail,
            phone: enteredPhone,
            workType: workTypeFinal,
            message: compiledMessage,
            smsConsent: hasPhone ? smsConsent : false,
            smsDisclosureShown: hasPhone,
          },
          files: selectedImages,
          honeypot: honeypotRef.current?.value || '',
          turnstileContainerRef: turnstileRef,
        });

        resetForm();
        setShowModal(true);
        setStatus(`Success: ${result.success}`);
      } catch (error) {
        console.error('Form submission error:', error);
        setStatus(
          `Error: ${error instanceof Error ? error.message : 'Something went wrong.'}`,
        );
      }
    };

    const workTypeOptions = isContractor
      ? CONTRACTOR_WORK_TYPE_OPTIONS
      : DEFAULT_WORK_TYPE_OPTIONS;

    const formMarkup = (
      <form
        className={`${classes.contactForm} ${
          embedded ? classes.embeddedForm : ''
        }`.trim()}
        onChange={trackFormStart}
        onFocus={trackFormStart}
        onSubmit={onSubmitHandler}
      >
        <div className={classes.formHeader}>
          <h2>{heading ?? copy.heading}</h2>
          {(intro ?? copy.intro) ? (
            <p className={classes.formIntro}>{intro ?? copy.intro}</p>
          ) : null}
        </div>

        {isContractor ? (
          <>
            <div className={classes.inputGrid}>
              <div className={classes.inputWrapper}>
                <label htmlFor="companyName">Company Name</label>
                <input
                  id="companyName"
                  type="text"
                  className={`${classes.input} ${
                    companyNameHasError ? classes.error : ''
                  }`}
                  onChange={companyNameChangeHandler}
                  onBlur={companyNameBlurHandler}
                  value={enteredCompanyName}
                  autoComplete="organization"
                  aria-invalid={companyNameHasError ? true : undefined}
                  aria-describedby={
                    companyNameHasError ? 'companyName-error' : undefined
                  }
                  required
                />
                {companyNameHasError ? (
                  <p className={classes.fieldError} id="companyName-error">
                    Please provide your company name
                  </p>
                ) : null}
              </div>

              <div className={classes.inputWrapper}>
                <label htmlFor="name">{copy.nameLabel}</label>
                <input
                  id="name"
                  type="text"
                  className={`${classes.input} ${
                    nameHasError ? classes.error : ''
                  }`}
                  onChange={nameChangeHandler}
                  onBlur={nameBlurHandler}
                  value={enteredName}
                  autoComplete="name"
                  aria-invalid={nameHasError ? true : undefined}
                  aria-describedby={nameHasError ? 'name-error' : undefined}
                  required
                />
                {nameHasError ? (
                  <p className={classes.fieldError} id="name-error">
                    Please provide a contact name
                  </p>
                ) : null}
              </div>
            </div>

            <div className={classes.inputGrid}>
              <div className={classes.inputWrapper}>
                <label htmlFor="email">{copy.emailLabel}</label>
                <input
                  id="email"
                  type="email"
                  className={`${classes.input} ${
                    emailInputHasError ? classes.error : ''
                  }`}
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                  value={enteredEmail}
                  autoComplete="email"
                  aria-invalid={emailInputHasError ? true : undefined}
                  aria-describedby={
                    emailInputHasError ? 'email-error' : undefined
                  }
                  required
                />
                {emailInputHasError ? (
                  <p className={classes.fieldError} id="email-error">
                    Please provide a valid email
                  </p>
                ) : null}
              </div>

              <div className={classes.inputWrapper}>
                <label htmlFor="phone">{copy.phoneLabel}</label>
                <input
                  id="phone"
                  type="tel"
                  className={classes.input}
                  onChange={phoneChangeHandler}
                  onBlur={phoneBlurHandler}
                  value={enteredPhone}
                  autoComplete="tel"
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className={classes.inputGrid}>
              <div className={classes.inputWrapper}>
                <label htmlFor="projectLocation">Project Location</label>
                <input
                  id="projectLocation"
                  type="text"
                  className={`${classes.input} ${
                    projectLocationHasError ? classes.error : ''
                  }`}
                  onChange={projectLocationChangeHandler}
                  onBlur={projectLocationBlurHandler}
                  value={enteredProjectLocation}
                  autoComplete="street-address"
                  placeholder="City, municipality, or site address"
                  aria-invalid={projectLocationHasError ? true : undefined}
                  aria-describedby={
                    projectLocationHasError ? 'projectLocation-error' : undefined
                  }
                  required
                />
                {projectLocationHasError ? (
                  <p className={classes.fieldError} id="projectLocation-error">
                    Please provide the project location
                  </p>
                ) : null}
              </div>

              <div className={classes.inputWrapper}>
                <label htmlFor="timeline">Project Timeline</label>
                <select
                  id="timeline"
                  className={classes.input}
                  onChange={(event) => setSelectedTimeline(event.target.value)}
                  value={selectedTimeline}
                >
                  <option value="">-- Select Timeline (Optional) --</option>
                  {CONTRACTOR_TIMELINE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        ) : (
          <div className={classes.nameContainer}>
            <div className={classes.inputWrapper}>
              <label htmlFor="name">{copy.nameLabel}</label>
              <input
                id="name"
                type="text"
                className={`${classes.input} ${
                  nameHasError ? classes.error : ''
                }`}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                value={enteredName}
                autoComplete="name"
                aria-invalid={nameHasError ? true : undefined}
                aria-describedby={nameHasError ? 'name-error' : undefined}
                required
              />
              {nameHasError ? (
                <p className={classes.fieldError} id="name-error">
                  Please provide your name
                </p>
              ) : null}
            </div>
          </div>
        )}

        {!isContractor ? (
          <div className={classes.inputWrapper}>
            <label htmlFor="email">{copy.emailLabel}</label>
            <input
              id="email"
              type="email"
              className={`${classes.input} ${
                emailInputHasError ? classes.error : ''
              }`}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
              autoComplete="email"
              aria-invalid={emailInputHasError ? true : undefined}
              aria-describedby={emailInputHasError ? 'email-error' : undefined}
              required
            />
            {emailInputHasError ? (
              <p className={classes.fieldError} id="email-error">
                Please provide a valid email
              </p>
            ) : null}
          </div>
        ) : null}

        {!isContractor ? (
          <div className={classes.inputWrapper}>
            <label htmlFor="phone">{copy.phoneLabel}</label>
            <input
              id="phone"
              type="tel"
              className={classes.input}
              onChange={phoneChangeHandler}
              onBlur={phoneBlurHandler}
              value={enteredPhone}
              autoComplete="tel"
              placeholder="Optional"
            />
          </div>
        ) : null}

        <div className={classes.inputWrapper}>
          <label htmlFor="workType">{copy.workTypeLabel}</label>
          <select
            id="workType"
            className={`${classes.input} ${
              !workTypeIsValid && workTypeTouched ? classes.error : ''
            }`}
            onChange={handleWorkTypeChange}
            onBlur={() => setWorkTypeTouched(true)}
            value={selectedWorkType}
            suppressHydrationWarning
            aria-invalid={
              !workTypeIsValid && workTypeTouched ? true : undefined
            }
            aria-describedby={
              !workTypeIsValid && workTypeTouched ? 'workType-error' : undefined
            }
            required
          >
            <option value="">{copy.workTypePlaceholder}</option>
            {workTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {!workTypeIsValid && workTypeTouched ? (
            <p className={classes.fieldError} id="workType-error">
              Please select a scope
            </p>
          ) : null}
        </div>

        {selectedWorkType === 'Other / Not Sure' ? (
          <div className={classes.inputWrapper}>
            <label htmlFor="customWorkType">{copy.customWorkTypeLabel}</label>
            <input
              id="customWorkType"
              type="text"
              className={`${classes.input} ${
                workTypeTouched && customWorkType.trim().length === 0
                  ? classes.error
                  : ''
              }`}
              value={customWorkType}
              onChange={(event) => setCustomWorkType(event.target.value)}
              placeholder={
                isContractor ? 'Enter custom scope' : 'Enter custom work type'
              }
            />
            {workTypeTouched && customWorkType.trim().length === 0 ? (
              <p className={classes.fieldError}>Please describe the work type</p>
            ) : null}
          </div>
        ) : null}

        <div className={classes.textAreaWrapper}>
          <label htmlFor="message">{copy.messageLabel}</label>
          <textarea
            id="message"
            spellCheck
            autoCorrect="on"
            rows={embedded ? 4 : 6}
            cols={80}
            className={`${classes.textarea} ${
              messageHasError ? classes.error : ''
            }`}
            onChange={messageChangeHandler}
            onBlur={messageBlurHandler}
            value={enteredMessage}
            placeholder={copy.messagePlaceholder}
            aria-invalid={messageHasError ? true : undefined}
            aria-describedby={messageHasError ? 'message-error' : undefined}
            required
          />
          {messageHasError ? (
            <p className={classes.errorTextArea} id="message-error">
              Please complete this required field
            </p>
          ) : null}
        </div>

        {turnstileSiteKey ? (
          <div className={classes.uploadWrapper}>
            <label htmlFor="quotePhotos">Jobsite Photos (Optional)</label>
            <p className={classes.uploadHelp}>{QUOTE_UPLOAD_HELPER_TEXT}</p>
            <label className={classes.uploadDropzone} htmlFor="quotePhotos">
              <span>Add photos</span>
              <input
                id="quotePhotos"
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.webp,.heic,.heif,image/jpeg,image/png,image/webp,image/heic,image/heif"
                onChange={handleImageSelection}
              />
            </label>
            <p className={classes.uploadMeta}>{QUOTE_UPLOAD_ACCEPTED_TEXT}</p>
            <p className={classes.uploadMeta}>{QUOTE_UPLOAD_PRIVACY_TEXT}</p>
            {selectedImages.length > 0 ? (
              <ul className={classes.uploadList}>
                {selectedImages.map((file) => (
                  <li key={file.id}>
                    <span>{file.displayName}</span>
                    <span>{formatUploadSize(file.sizeBytes)}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {imageUploadError ? (
              <p className={classes.fieldError}>{imageUploadError}</p>
            ) : null}
          </div>
        ) : null}

        <input
          type="text"
          name="companyWebsite"
          ref={honeypotRef}
          tabIndex={-1}
          autoComplete="off"
          className={classes.honeypot}
          aria-hidden="true"
        />

        {hasPhone ? (
          <div className={classes.smsConsent}>
            <label className={classes.smsConsentLabel}>
              <input
                type="checkbox"
                checked={smsConsent}
                onChange={(event) => setSmsConsent(event.target.checked)}
              />
              <span>
                I agree to receive SMS messages from Bellhouse Excavating.
              </span>
            </label>

            <ul className={classes.smsDisclosure}>
              {REQUIRED_SMS_DISCLOSURE.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            <p className={classes.privacyLink}>
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
            </p>
          </div>
        ) : null}

        <div className={classes.buttonContainer}>
          {!loading ? (
            <button type="submit" disabled={!isRecaptchaReady}>
              {isRecaptchaReady ? copy.submitLabel : 'Loading ReCAPTCHA...'}
            </button>
          ) : (
            <LoadingSpinner />
          )}
        </div>

        {status ? (
          <p
            className={`${classes.status} ${
              status.startsWith('Success')
                ? classes.statusSuccess
                : classes.statusError
            }`}
            role={status.startsWith('Success') ? 'status' : 'alert'}
          >
            {status}
          </p>
        ) : null}
      </form>
    );

    return (
      <Fragment>
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
          strategy="lazyOnload"
        />

        {showModal ? (
          <Modal onClose={() => setShowModal(false)}>
            <div className={classes.modalContent}>
              <div className={classes.logo}>
                <Image
                  src={logo}
                  alt="Bellhouse excavating logo"
                  width={256}
                  height={53}
                />
              </div>

              <h3>{copy.successHeading}</h3>
              {copy.successBody.map((line) => (
                <p key={line}>{line}</p>
              ))}

              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </Modal>
        ) : null}

        <div
          ref={sectionRef}
          id={sectionId}
          className={`${classes.container} ${
            embedded ? classes.embeddedContainer : ''
          }`.trim()}
        >
          {turnstileSiteKey ? (
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
              strategy="lazyOnload"
            />
          ) : null}
          <div ref={turnstileRef} className={classes.turnstileSlot} />
          {formMarkup}
        </div>
      </Fragment>
    );
  },
);

ContactForm.displayName = 'ContactForm';

export default ContactForm;


