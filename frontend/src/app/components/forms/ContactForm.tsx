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
import { sendContactForm } from '@/app/actions/contact';
import LoadingSpinner from '../UI/LoadingSpinner';

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
};

const REQUIRED_SMS_DISCLOSURE = [
  '* By clicking SUBMIT you consent to receiving SMS messages',
  '* Messages and Data rates may apply. Message frequency will vary',
  '* Reply HELP to get more assistance',
  '* Reply STOP to Opt-out of messaging',
] as const;

const DEFAULT_WORK_TYPE_OPTIONS = [
  'Other',
  'Foundation Excavation',
  'Site Grading',
  'Land Clearing',
  'Demolition',
  'Retaining Walls',
  'Utility Trenches',
  'Erosion Control',
  'Septic System',
  'Drainage',
  'Dump Truck Services',
  'Equipment Hauling',
  'Gravel Delivery',
  'Sand Delivery',
  'Topsoil Delivery',
  'Fill Dirt',
  'Driveway',
  'Parking Lot',
];

const CONTRACTOR_WORK_TYPE_OPTIONS = [
  'Other',
  'Excavation and site prep',
  'Grading and pad prep',
  'Foundation excavation and trenching',
  'Truck hauling and spoil export',
  'Aggregate or fill delivery',
  'Heavy equipment floating',
  'Additional equipment with operator',
  'Volvo A35 off-road truck support',
  'Multi-scope project support',
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
    },
    ref,
  ) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isContractor = variant === 'contractor';
    const copy = VARIANT_COPY[variant];

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [selectedWorkType, setSelectedWorkType] = useState('');
    const [customWorkType, setCustomWorkType] = useState('');
    const [workTypeTouched, setWorkTypeTouched] = useState(false);
    const [selectedTimeline, setSelectedTimeline] = useState('');

    const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
    const [status, setStatus] = useState<string | null>(null);
    const [smsConsent, setSmsConsent] = useState(false);

    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

    useImperativeHandle(ref, () => ({
      scrollToForm: () => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      },
    }));

    useEffect(() => {
      const checkRecaptcha = setInterval(() => {
        if (typeof window !== 'undefined' && window.grecaptcha?.execute) {
          setIsRecaptchaReady(true);
          clearInterval(checkRecaptcha);
        }
      }, 500);

      return () => clearInterval(checkRecaptcha);
    }, []);

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
    } = useInput(stringValidate);

    const handleWorkTypeChange = (
      event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
      const value = event.target.value;
      setSelectedWorkType(value);
      setWorkTypeTouched(true);

      if (value !== 'Other') {
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
    };

    const hasPhone = enteredPhone.trim().length > 0;
    const workTypeFinal =
      `${selectedWorkType}${customWorkType ? ` ${customWorkType}` : ''}`.trim();
    const workTypeIsValid = workTypeFinal.length > 1;

    const compiledMessage = isContractor
      ? [
          `Company Name: ${enteredCompanyName}`,
          `Project Location: ${enteredProjectLocation}`,
          `Project Timeline: ${selectedTimeline || 'Not provided'}`,
          '',
          enteredMessage,
        ].join('\n')
      : enteredMessage;

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
        return;
      }

      if (hasPhone && !smsConsent) {
        setStatus(
          'Please consent to receive SMS messages if you provide a phone number.',
        );
        return;
      }

      try {
        if (!isRecaptchaReady || typeof window.grecaptcha === 'undefined') {
          throw new Error('reCAPTCHA is not ready. Please try again.');
        }

        setLoading(true);

        const token = await window.grecaptcha.execute(recaptchaSiteKey, {
          action: 'submit',
        });

        const result = await sendContactForm({
          name: enteredName,
          email: enteredEmail,
          phone: enteredPhone,
          workType: workTypeFinal,
          message: compiledMessage,
          token,
          smsConsent: hasPhone ? smsConsent : false,
          smsDisclosureShown: hasPhone,
        });

        if (result?.success) {
          resetForm();
          setShowModal(true);
          setStatus('Success: Your request has been sent.');

          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'conversion', {
              send_to: 'AW-16958173496/gn9BCIyi-7QaELjipJY_',
            });
          }
        } else {
          setStatus(`Error: ${result?.error || 'Unknown error occurred'}`);
        }
      } catch (error) {
        console.error('Form submission error:', error);
        setStatus(
          `Error: ${error instanceof Error ? error.message : 'Something went wrong.'}`,
        );
      } finally {
        setLoading(false);
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
                  required
                />
                {companyNameHasError ? (
                  <p className={classes.fieldError}>
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
                  required
                />
                {nameHasError ? (
                  <p className={classes.fieldError}>
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
                  required
                />
                {emailInputHasError ? (
                  <p className={classes.fieldError}>
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
                  required
                />
                {projectLocationHasError ? (
                  <p className={classes.fieldError}>
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
                required
              />
              {nameHasError ? (
                <p className={classes.fieldError}>Please provide your name</p>
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
              required
            />
            {emailInputHasError ? (
              <p className={classes.fieldError}>
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
            <p className={classes.fieldError}>Please select a scope</p>
          ) : null}
        </div>

        {selectedWorkType === 'Other' ? (
          <div className={classes.inputWrapper}>
            <label htmlFor="customWorkType">{copy.customWorkTypeLabel}</label>
            <input
              id="customWorkType"
              type="text"
              className={classes.input}
              value={customWorkType}
              onChange={(event) => setCustomWorkType(event.target.value)}
              placeholder={
                isContractor ? 'Enter custom scope' : 'Enter custom work type'
              }
            />
          </div>
        ) : null}

        <div className={classes.textAreaWrapper}>
          <label htmlFor="message">{copy.messageLabel}</label>
          <textarea
            id="message"
            spellCheck
            autoCorrect="on"
            rows={6}
            cols={80}
            className={`${classes.textarea} ${
              messageHasError ? classes.error : ''
            }`}
            onChange={messageChangeHandler}
            onBlur={messageBlurHandler}
            value={enteredMessage}
            placeholder={copy.messagePlaceholder}
            required
          />
          {messageHasError ? (
            <p className={classes.errorTextArea}>
              Please complete this required field
            </p>
          ) : null}
        </div>

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
              status.startsWith('Error')
                ? classes.statusError
                : classes.statusSuccess
            }`}
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
          {formMarkup}
        </div>
      </Fragment>
    );
  },
);

ContactForm.displayName = 'ContactForm';

export default ContactForm;


