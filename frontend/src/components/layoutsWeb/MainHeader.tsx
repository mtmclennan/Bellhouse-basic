import Link from "next/link";
import classes from "./MainHeader.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../../public/assets/excvator-white.png";

import { Fragment, useEffect, useState } from "react";
import Hamburger from "./Hamburger";
import MobileMenu from "./MobileMenu";
// import SubscribeButton from "../UI/SubscribeButton";

const MainHeader = ({ currentRoute }: { currentRoute: string }) => {
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  // const currentRoute = router.pathname;

  const homeClassname = currentRoute === "/" ? "active" : "non-active";
  const blogClassname = currentRoute === "/blog" ? "active" : "non-active";
  const aboutClassname = currentRoute === "/about" ? "active" : "non-active";
  const toolsClassname = currentRoute === "/tools" ? "active" : "non-active";
  const contactClassname =
    currentRoute === "/contact" ? "active" : "non-active";

  useEffect(() => {
    setShowMobileMenu(false);
  }, [currentRoute]);

  return (
    <Fragment>
      <header className={`${classes.header}`}>
        <nav className={classes.nav}>
          <div className={classes.logo}>
            <Link href="/">
              <Image src={logo} alt="bellhouse" layout="fill" />
            </Link>
            <h1>BELLHOUSE EXCAVATING</h1>
          </div>
          <ul>
            <li>
              <Link legacyBehavior={true} href="/">
                Home
              </Link>
            </li>
            <li>
              <Link legacyBehavior={true} href="/services">
                Services
              </Link>
            </li>
            <li>
              <Link legacyBehavior={true} href="/about">
                About
              </Link>
            </li>
            <li>
              <Link legacyBehavior={true} href="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link legacyBehavior={true} href="/careers">
                Careers
              </Link>
            </li>
          </ul>
          <div className={classes.actionContainer}>
            <button>Get An Estimate</button>
          </div>
          <Hamburger
            showMenu={showMobileMenu}
            setShowMenu={setShowMobileMenu}
          />
        </nav>
      </header>

      <MobileMenu
        showMenu={showMobileMenu}
        homeClassname={homeClassname}
        blogClassname={blogClassname}
        aboutClassname={aboutClassname}
        contactClassname={contactClassname}
        toolsClassname={toolsClassname}
      />
    </Fragment>
  );
};

export default MainHeader;
