'use client';

import Link from 'next/link';
import classes from './MainHeader.module.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '../../../../public/assets/BellhouseLogo-text.png';
import { Fragment, useEffect, useState } from 'react';
import Hamburger from './Hamburger';
import MobileMenu from './MobileMenu';
import { Phone } from '@phosphor-icons/react';

const MainHeader = ({ currentRoute }: { currentRoute?: string }) => {
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
      <header className={`${classes.headerHome}`}>
        <nav className={classes.navHome}>
          <div className={classes.logoHome}>
            <Link href="/">
              <Image
                src={logo}
                alt="Bellhouse Excavating"
                width={250}
                height={189}
                style={{
                  width: 'auto',
                  height: 'auto',
                }}
              />
            </Link>
          </div>
          <ul>
            <li>
              <Link className={homeClassname} href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={aboutClassname} href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className={servicesClassname} href="/services">
                Services
              </Link>
            </li>
            <li>
              <Link className={contactClassname} href="/contact">
                Contact
              </Link>
            </li>
            <li className={classes.actionContainer}>
              <Link className={classes.headerHome_cta} href="/contact">
                Get An Estimate
              </Link>
            </li>
            <li>
              <a className={classes.phone} href="tel:519-752-8500">
                <Phone size={24} color={'#ffc302'} weight={'duotone'} />
                <h3>519-752-8500</h3>
              </a>
            </li>
          </ul>
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
