'use cilent';
import Link from 'next/link';
import classes from './MainHeader.module.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '../../../../public/assets/BellhouseLogo-text-LS.png';
import { Fragment, useEffect, useState } from 'react';
import Hamburger from './Hamburger';
import MobileMenu from './MobileMenu';
import { Phone } from '@phosphor-icons/react';

const MainHeader = ({ currentRoute }: { currentRoute: string }) => {
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const homeClassname = currentRoute === '/' ? 'active' : 'non-active';
  const servicesClassname =
    currentRoute === '/services' ? 'active' : 'non-active';
  const aboutClassname = currentRoute === '/about' ? 'active' : 'non-active';
  const careersClassname =
    currentRoute === '/careers' ? 'active' : 'non-active';
  const contactClassname =
    currentRoute === '/contact' ? 'active' : 'non-active';

  useEffect(() => {
    setShowMobileMenu(false);
  }, [currentRoute]);

  return (
    <Fragment>
      <header className={`${classes.header}`}>
        <nav className={classes.nav}>
          <div className={classes.logo}>
            <Link href="/">
              <Image
                src={logo}
                alt="Bellhouse Excavating"
                width={250}
                height={200}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </Link>
            {/* <h1>BELLHOUSE EXCAVATING</h1> */}
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
            {/* <li>
              <Link legacyBehavior={true} href="/careers">
                Careers
              </Link>
            </li> */}
          </ul>
          <div className={classes.actionContainer}>
            <button onClick={() => router.push('/contact')}>
              Get An Estimate
            </button>
            <li>
              <a className={classes.phone} href="tel:519-752-8500">
                <Phone size={24} />
                <h3>519-752-8500</h3>
              </a>
            </li>
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
        servicesClassname={servicesClassname}
        aboutClassname={aboutClassname}
        contactClassname={contactClassname}
        careersClassname={careersClassname}
      />
    </Fragment>
  );
};

export default MainHeader;
