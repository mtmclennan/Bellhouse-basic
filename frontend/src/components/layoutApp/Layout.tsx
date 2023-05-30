import { AuthContextProvider } from "@/store/auth-context";
import React from "react";
import Header from "./Header";
import classes from "./Layout.module.scss";
import Protected from "./Protected";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className={classes.container}>{children}</div>
    </>
  );
};

export default Layout;
