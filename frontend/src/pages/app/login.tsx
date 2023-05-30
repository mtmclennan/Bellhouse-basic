import React, { useState } from "react";
import Image from "next/image";
import logo from "../../../public/assets/excvator-white.png";
import LoginForm from "@/components/forms/LoginForm";
import ForgotPassword from "@/components/forms/ForgotPassword";

const Login = () => {
  const [showResetForm, setShowResetForm] = useState(false);

  return (
    <div className="login__container">
      <div className="login-form__container">
        <Image src={logo} alt="BELLHOUSE logo" layout="responsive" />
        <h1 className="logo">BELLHOUSE EXCAVATING</h1>
        {!showResetForm && (
          <>
            <h1>Welcome Back</h1>
            <LoginForm setShowResetForm={setShowResetForm} />
          </>
        )}
        {showResetForm && (
          <div>
            <h2>Reset Password</h2>
            <ForgotPassword setShowResetForm={setShowResetForm} />
          </div>
        )}
      </div>
      {/* <div className="login__hero"></div> */}
    </div>
  );
};

export default Login;
