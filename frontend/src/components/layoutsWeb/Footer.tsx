import classes from "./Footer.module.scss";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/assets/excvator-white.png";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const homeClassname = currentRoute === "/" ? "active" : "non-active";
  const blogClassname = currentRoute === "/blog" ? "active" : "non-active";
  const toolsClassname = currentRoute === "/tools" ? "active" : "non-active";
  const aboutClassname = currentRoute === "/about" ? "active" : "non-active";
  const contactClassname =
    currentRoute === "/contact" ? "active" : "non-active";

  const year = new Date().getFullYear();
  return (
    <footer className={classes.footer}>
      <div className={classes.logoContainer}>
        <div className={classes.logo}>
          <Image src={logo} alt="EdgeInMind" layout="responsive" />
        </div>
        <h1>BELLHOUSE EXCAVATING</h1>
      </div>
      <div className={classes.nav}>
        <ul>
          <li>
            <Link href="/"></Link>
          </li>
          <li>
            <Link className={blogClassname} href="/services">
              Services
            </Link>
          </li>
          <li>
            <Link href="/careers" className={toolsClassname}>
              Careers
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
        </ul>
      </div>
      <div className={classes.copyright}>
        <p>{`©${year} By BellHouse Excavating`}</p>
      </div>
    </footer>
  );
};

export default Footer;
