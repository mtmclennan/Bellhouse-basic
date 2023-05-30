import useHttp from "../../hooks/use-http";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../store/auth-context";
import useInput from "../../hooks/use-input";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./LoginForm.module.scss";
import useModal from "../../hooks/use-modal";
import Modal from "../UI/Modal";
import { SetStateBoolean, UserRes } from "../../types/index.types";
import SmallTextBox from "../UI/SmallTextBox";

const LoginForm = ({
  setShowResetForm,
}: {
  setShowResetForm: SetStateBoolean;
}) => {
  const AuthCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest: LoginRequest } = useHttp();
  const router = useRouter();
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`;
  const { setModalMessage, showModal, modalMessage, hideModal } =
    useModal(error);

  useEffect(() => {
    if (AuthCtx.isLoggedIn) {
      router.push("/app");
    }
  }, [AuthCtx.isLoggedIn, router]);

  const emailValidate = (value: string) => {
    const emailFormat = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    return emailFormat.test(value);
  };

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(emailValidate);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  const response = (res: UserRes) => {
    if (res.status === "success") {
      console.log(res.user.email);
      AuthCtx.onLogin(res.user);
      resetPasswordInput();
      resetEmailInput();
    } else {
      setModalMessage("Invalid Email or Password");
    }
  };

  const LoginFormSubmitHandler = (
    event: React.ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!enteredPasswordIsValid || !enteredEmailIsValid) {
      return;
    }

    LoginRequest(
      {
        url,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email: enteredEmail,
          password: enteredPassword,
        },
      },
      response
    );
  };

  const hideModalHandler = () => {
    hideModal();
  };

  const onClickHandler = () => {
    setShowResetForm((currentState) => !currentState);
  };

  const emailInputClasses = emailInputHasError
    ? `${classes.input} ${classes.invalid}`
    : `${classes.input}`;

  const passwordInputClasses = passwordInputHasError
    ? `${classes.input} ${classes.invalid}`
    : `${classes.input}`;

  return (
    <div className={classes.container}>
      {isLoading && (
        <div className={classes.loading}>
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && showModal && (
        <Modal onClose={hideModalHandler}>
          <p>{modalMessage}</p>
        </Modal>
      )}
      {!isLoading && (
        <form onSubmit={LoginFormSubmitHandler} className={classes.form}>
          <p>Please enter your details</p>

          <SmallTextBox
            className={emailInputClasses}
            onBlur={emailBlurHandler}
            onChange={emailChangeHandler}
            value={enteredEmail}
            fieldName="Email"
          />
          <SmallTextBox
            className={passwordInputClasses}
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}
            value={enteredPassword}
            fieldName="Password"
            type="password"
          />
          <div className={classes.btnContainer}>
            <button>Sign in</button>
          </div>
        </form>
      )}
      <div className={classes.btnContainer}>
        <button onClick={onClickHandler} className={classes.btnForgot}>
          Forgot Password?
        </button>
      </div>
    </div>
  );
};
export default LoginForm;
