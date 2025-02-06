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
                priority
                alt="Bellhouse Excavating"
                width={250}
                height={189}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </Link>
          </div>
          <ul>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            {/* <li>
              <Link href="/careers">Careers</Link>
            </li> */}
            <li className={classes.actionContainer}>
              <button onClick={() => router.push('/contact')}>
                Get An Estimate
              </button>
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
