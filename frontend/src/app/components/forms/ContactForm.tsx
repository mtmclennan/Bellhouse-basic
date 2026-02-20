'use client';

import Script from 'next/script';
import logo from '../../../../public/assets/BellhouseLogo-text-LS.png';
import useInput from '../../../hooks/use-input';
import classes from './ContactForm.module.scss';
import Modal from '../UI/Modal';
import Image from 'next/image';
import React, {
  Fragment,
  useState,
  useEffect,
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';
import { emailValidate, stringValidate } from '../../../lib/input-utils';
import { sendContactForm } from '@/app/actions/contact'; // server action
import LoadingSpinner from '../UI/LoadingSpinner';

interface ContactFormRef {
  scrollToForm: () => void;
}

const REQUIRED_SMS_DISCLOSURE = [
  '* By clicking SUBMIT you consent to receiving SMS messages',
  '* Messages and Data rates may apply. Message frequency will vary',
  '* Reply HELP to get more assistance',
  '* Reply STOP to Opt-out of messaging',
] as const;

const ContactForm = forwardRef<ContactFormRef>((_, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedWorkType, setSelectedWorkType] = useState('');
  const [customWorkType, setCustomWorkType] = useState('');

  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  // SMS consent state
  const [smsConsent, setSmsConsent] = useState(false);

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

  useImperativeHandle(ref, () => ({
    scrollToForm: () => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    },
  }));

  const workTypeOptions = [
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

  const handleWorkTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;
    setSelectedWorkType(value);

    if (value !== 'Other') {
      setCustomWorkType('');
    }
  };

  useEffect(() => {
    // Wait until grecaptcha exists and has execute()
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
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
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

  const hasPhone = enteredPhone.trim().length > 0;
  const workTypeFinal =
    `${selectedWorkType}${customWorkType ? ` ${customWorkType}` : ''}`.trim();

  const resetForm = () => {
    resetName();
    resetEmail();
    resetPhone();
    resetMessage();
    setSelectedWorkType('');
    setCustomWorkType('');
    setSmsConsent(false);
  };

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus(null);

    // Basic required validation
    if (!enteredEmailIsValid || !messageIsValid) {
      emailBlurHandler();
      messageBlurHandler();
      setStatus('Please fix the highlighted fields.');
      return;
    }

    // If they provided a phone number, require SMS consent
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
        message: enteredMessage,
        token,

        // SMS consent metadata (log this server-side)
        smsConsent: hasPhone ? smsConsent : false,
        smsDisclosureShown: hasPhone,
      });

      if (result?.success) {
        resetForm();
        setShowModal(true);
        setStatus('Success: Your request has been sent.');

        // Fire Google Ads conversion
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

  return (
    <Fragment>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
        strategy="lazyOnload"
        onLoad={() => console.log('✅ reCAPTCHA script loaded')}
      />

      {showModal && (
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

            <h3>Thank You!</h3>

            <p>Your request has been received!</p>
            <p>
              Expect a call or email from us soon to discuss your project in
              more detail.
            </p>

            <p>We’re excited to help with your project!</p>

            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </Modal>
      )}

      <section ref={sectionRef} className={classes.container}>
        <form className={classes.contactForm} onSubmit={onSubmitHandler}>
          <h2>Tell us about your project</h2>

          <div className={classes.nameContainer}>
            <div className={classes.inputWrapper}>
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                className={classes.input}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                value={enteredName}
                autoComplete="name"
              />
            </div>
          </div>

          <div className={classes.inputWrapper}>
            <label htmlFor="email">Your Email</label>
            <input
              id="email"
              type="email"
              className={`${classes.input} ${emailInputHasError ? classes.error : ''}`}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
              autoComplete="email"
              required
            />
          </div>
          {emailInputHasError && (
            <p className={classes.errorText}>Please provide a valid email</p>
          )}

          <div className={classes.inputWrapper}>
            <label htmlFor="phone">Your Phone Number</label>
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

          <div className={classes.inputWrapper}>
            <label htmlFor="workType">Type of Work Required</label>
            <select
              id="workType"
              className={classes.input}
              onChange={handleWorkTypeChange}
              value={selectedWorkType}
            >
              <option value="">-- Select Work Type --</option>
              {workTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {selectedWorkType === 'Other' && (
            <div className={classes.inputWrapper}>
              <label htmlFor="customWorkType">Please Specify</label>
              <input
                id="customWorkType"
                type="text"
                className={classes.input}
                value={customWorkType}
                onChange={(e) => setCustomWorkType(e.target.value)}
                placeholder="Enter custom work type"
              />
            </div>
          )}

          <div className={classes.textAreaWrapper}>
            <label htmlFor="message">How Can We Help You?</label>
            <textarea
              id="message"
              spellCheck
              autoCorrect="on"
              rows={5}
              cols={80}
              className={`${classes.textarea} ${messageHasError ? classes.error : ''}`}
              onChange={messageChangeHandler}
              onBlur={messageBlurHandler}
              value={enteredMessage}
              required
            />
            {messageHasError && (
              <p className={classes.errorTextArea}>
                Please complete this required field
              </p>
            )}
          </div>

          {/* SMS Consent + Required Disclosure (only when phone is entered) */}
          {hasPhone && (
            <div className={classes.smsConsent}>
              <label className={classes.smsConsentLabel}>
                <input
                  type="checkbox"
                  checked={smsConsent}
                  onChange={(e) => setSmsConsent(e.target.checked)}
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
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          )}

          <div className={classes.buttonContainer}>
            {!loading && (
              <button type="submit" disabled={!isRecaptchaReady}>
                {isRecaptchaReady ? 'SEND MESSAGE' : 'Loading ReCAPTCHA...'}
              </button>
            )}
            {loading && <LoadingSpinner />}
          </div>

          {status && <p className="text-center text-red-500">{status}</p>}
        </form>
      </section>
    </Fragment>
  );
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;
