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

  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_CONTACT_URL;

  const {
    value: enteredFirstName,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(stringValidate);

  const {
    value: enteredLastName,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
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
    value: enteredTopic,
    valueChangeHandler: topicChangeHandler,
    inputBlurHandler: topicBlurHandler,
    reset: resetTopic,
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
      return;
    }
    console.log(SERVER_URL);
    if (!SERVER_URL) return;

    if (error) {
      setShowModal(true);
    }
    const response = (res: Res) => {
      if (res.status === "success") {
        resetFirstName();
        resetLastName();
        resetEmail();
        resetmessage();
        resetTopic();
        setShowModal(true);
      }
    };

    sendRequest(
      {
        url: SERVER_URL,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          firstName: enteredFirstName,
          lastName: enteredLastName,
          email: enteredEmail,
          topic: enteredTopic,
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
        <div className={classes.nameContainer}>
          <div className={classes.inputWrapper}>
            <label htmlFor="first-name">First Name</label>
            <input
              id="first-name"
              type="text"
              className={classes.input}
              onChange={firstNameChangeHandler}
              onBlur={firstNameBlurHandler}
              value={enteredFirstName}
            ></input>
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="last-name">Last Name</label>
            <input
              id="last-name"
              type="text"
              className={classes.input}
              onChange={lastNameChangeHandler}
              onBlur={lastNameBlurHandler}
              value={enteredLastName}
            ></input>
          </div>
        </div>
        <div className={classes.inputWrapper}>
          <label htmlFor="email">Email</label>
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
          {emailInputHasError && (
            <p className={classes.errorText}>Please provide a valid email</p>
          )}
        </div>
        <div className={classes.inputWrapper}>
          <label htmlFor="topic">Topic</label>
          <input
            id="topic"
            type="text"
            className={classes.input}
            onChange={topicChangeHandler}
            onBlur={topicBlurHandler}
            value={enteredTopic}
          ></input>
        </div>
        <div className={classes.textAreaWrapper}>
          <label htmlFor="message">Message</label>
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
            <p className={classes.errorText}>
              Please complete this required field
            </p>
          )}
        </div>
        <div className={classes.buttonContainer}>
          <button>Send Message</button>
        </div>
      </form>
    </Fragment>
  );
};

export default ContactForm;
