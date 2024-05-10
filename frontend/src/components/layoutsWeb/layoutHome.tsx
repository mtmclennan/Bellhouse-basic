import Footer from "./Footer";
import { Fragment, ReactNode, useEffect, useState } from "react";

import classes from "./LayoutWeb.module.scss";
import { useRouter } from "next/router";
import HeaderHome from "./HeaderHome";

type LayoutProps = {
  children: ReactNode;
};

const LayoutHome = ({ children }: LayoutProps) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <Fragment>
      <HeaderHome currentRoute={currentRoute} />
      <main className={classes.containerHome}>{children}</main>
      <Footer />
    </Fragment>
  );
};

export default LayoutHome;
