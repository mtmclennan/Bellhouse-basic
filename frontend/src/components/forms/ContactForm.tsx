import useInput from "../../hooks/use-input";
import classes from "./ContactForm.module.scss";
import useHttp from "../../hooks/use-http";
import Modal from "../UI/Modal";
import React, { Fragment, useState } from "react";
import { Res } from "../../types/interfaces";
import { emailValidate, stringValidate } from "../../lib/input-utils";

const ContactForm = () => {
  const { sendRequest, error, isLoading } = useHttp();
  const [showModal, setShowModal] = useState(false);

  const url = process.env.NEXT_PUBLIC_SERVER_CONTACT_URL;

  const {
    value: enteredName,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
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
    reset: resetmessage,
  } = useInput(stringValidate);

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!enteredEmailIsValid || !messageIsValid) {
      emailBlurHandler();
      messageBlurHandler();
      return;
    }

    if (!url) return;

    if (error) {
      setShowModal(true);
    }
    const response = (res: Res) => {
      if (res.status === "success") {
        resetFirstName();
        resetEmail();
        resetmessage();
        resetPhone();
        setShowModal(true);
      }
    };

    sendRequest(
      {
        url,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          name: enteredName,
          email: enteredEmail,
          phone: enteredPhone,
          message: enteredMessage,
        },
      },
      response
    );
  };

  const showModalHandler = () => {
    setShowModal(false);
  };

  return (
    <Fragment>
      {showModal && (
        <Modal onClose={showModalHandler}>
          <div>
            <h1>Thank you</h1>
          </div>
        </Modal>
      )}

      <form className={classes.contactForm} onSubmit={onSubmitHandler}>
        <h2>Tell us about your project</h2>

        <div className={classes.nameContainer}>
          <div className={classes.inputWrapper}>
            <label htmlFor="name">Your name</label>
            <input
              id="name"
              type="text"
              className={classes.input}
              onChange={firstNameChangeHandler}
              onBlur={firstNameBlurHandler}
              value={enteredName}
            ></input>
          </div>
        </div>
        <div className={classes.inputWrapper}>
          <label htmlFor="email">Your email</label>
          <input
            id="email"
            type="email"
            className={`${classes.input} ${
              emailInputHasError ? `${classes.error}` : ""
            }`}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
          ></input>
        </div>
        {emailInputHasError && (
          <p className={classes.errorText}>Please provide a valid email</p>
        )}
        <div className={classes.inputWrapper}>
          <label htmlFor="phone">Your phone number</label>
          <input
            id="phone"
            type="text"
            className={classes.input}
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}
            value={enteredPhone}
          ></input>
        </div>
        <div className={classes.textAreaWrapper}>
          <label htmlFor="message">Your message</label>
          <textarea
            id="message"
            spellCheck="true"
            autoCorrect="on"
            rows={5}
            cols={80}
            className={`${classes.textarea} ${
              messageHasError ? `${classes.error}` : ""
            }`}
            onChange={messageChangeHandler}
            onBlur={messageBlurHandler}
            value={enteredMessage}
          ></textarea>
          {messageHasError && (
            <p className={classes.errorTextArea}>
              Please complete this required field
            </p>
          )}
        </div>
        <div className={classes.buttonContainer}>
          <button>SEND MESSAGE</button>
        </div>
      </form>
    </Fragment>
  );
};

export default ContactForm;
