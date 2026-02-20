import classes from './Footer.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../public/assets/BellhouseLogo-text.png';
import { Phone } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const router = usePathname();
  const currentRoute = router;

  const homeClassname = currentRoute === '/' ? 'active' : 'non-active';
  const servicesClassname =
    currentRoute === '/services' ? 'active' : 'non-active';
  const aboutClassname = currentRoute === '/about' ? 'active' : 'non-active';
  const contactClassname =
    currentRoute === '/contact' ? 'active' : 'non-active';

  const year = new Date().getFullYear();
  return (
    <footer className={classes.footer}>
      <div className={classes.logoContainer}>
        <div className={classes.logo}>
          <Image
            src={logo}
            alt="Bellhouse Excavating"
            width={200}
            height={151}
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      </div>
      <a className={classes.phone} href="tel:519-752-8500">
        <Phone size={30} color={'#ffc302'} weight={'duotone'} />
        <h3>519-752-8500</h3>
      </a>
      <div className={classes.nav}>
        <ul>
          <li>
            <Link className={homeClassname} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={servicesClassname} href="/services">
              Services
            </Link>
          </li>
          <li>
            <Link className={aboutClassname} href="/about">
              About
            </Link>
          </li>
          <li>
            <Link className={contactClassname} href="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <a
        target="blank"
        className={classes.review}
        href="https://g.page/r/CZtOlkcv7cW2EBM/review"
      >
        Leave Us a Google Review{' '}
      </a>
      <div className={classes.copyright}>
        <p>{`©${year} By BELLHOUSE EXCAVATING`}</p>

        <div className={classes.legal}>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>

        <small className={classes.siteBy}>
          <a
            href="https://all8webworks.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Site by ALL8 Webworks
          </a>
        </small>
      </div>
    </footer>
  );
};

export default Footer;
