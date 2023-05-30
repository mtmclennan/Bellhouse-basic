import Footer from "./Footer";
import { Fragment, ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import classes from "./LayoutWeb.module.scss";
import { useRouter } from "next/router";
import HeaderHome from "./HeaderHome";

type LayoutProps = {
  children: ReactNode;
};

const LayoutHome = ({ children }: LayoutProps) => {
  const [showBackground, setShowBackground] = useState(false);
  const router = useRouter();
  const currentRoute = router.pathname;

  useEffect(() => {
    if (
      currentRoute === "/" ||
      currentRoute === "/about" ||
      currentRoute === "/contact" ||
      currentRoute === "/tools"
    ) {
      setShowBackground(true);
    } else setShowBackground(false);
  }, [currentRoute]);

  return (
    <Fragment>
      {/* <div className="background">
        <Image
          className="background-image"
          layout="fill"
          quality={80}
          //   placeholder="blur"
          src="/assets/20230509_103809.jpg"
          alt="background"
        />
      </div> */}

      <HeaderHome currentRoute={currentRoute} />
      <main className={classes.container}>{children}</main>
      <Footer />
    </Fragment>
  );
};

export default LayoutHome;
