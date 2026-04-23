'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { CaretDownIcon, Phone } from '@phosphor-icons/react';

import classes from './MainHeader.module.scss';
import logo from '../../../../public/assets/BellhouseLogo-text.png';
import Hamburger from './Hamburger';
import MobileMenu from './MobileMenu';
import { resourceNavigationItems } from './resourcesNavigation';

const MainHeader = () => {
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

  useEffect(() => {
    const updateScrollState = () => {
      setIsAtTop(window.scrollY < 8);
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });

    return () => window.removeEventListener('scroll', updateScrollState);
  }, [pathname]);

  const isOverlayHeroRoute = useMemo(() => {
    if (!pathname) return false;

    return (
      pathname === '/' ||
      pathname === '/service-areas' ||
      pathname.startsWith('/service-areas/') ||
      pathname === '/contractors' ||
      pathname.startsWith('/contractors/') ||
      pathname === '/resources' ||
      pathname.startsWith('/resources/') ||
      pathname === '/about' ||
      pathname.startsWith('/about/')
    );
  }, [pathname]);

  const getNavClass = (href: string) =>
    pathname === href ? 'active' : 'non-active';

  const homeClassname = getNavClass('/');
  const servicesClassname = getNavClass('/services');
  const aboutClassname = getNavClass('/about');
  const careersClassname = getNavClass('/careers');
  const contactClassname = getNavClass('/contact');

  return (
    <Fragment>
      <header
        className={`${classes.header} ${
          isAtTop
            ? classes.headerTop
            : isOverlayHeroRoute
              ? classes.headerOverlay
              : classes.headerSolid
        }`}
      >
        <nav className={classes.nav}>
          <div className={classes.logoWrap}>
            <Link href="/" aria-label="Bellhouse Excavating home">
              <Image
                src={logo}
                alt="Bellhouse Excavating"
                width={200}
                height={151}
                sizes="(max-width: 800px) 150px, 200px"
                className={classes.logoImg}
                priority
              />
            </Link>
          </div>

          <ul className={classes.desktopNav}>
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

            <li className={classes.menuListItem}>
              <Menu as="div" className={classes.menu}>
                <MenuButton className={classes.menuButton}>
                  <span>Resources</span>
                  <CaretDownIcon size={16} color="#ffc302" weight="regular" />
                </MenuButton>

                <MenuItems transition className={classes.menuItems}>
                  {resourceNavigationItems.map((item) => (
                    <MenuItem key={item.href}>
                      <Link href={item.href} className={classes.menuItem}>
                        {item.label}
                      </Link>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </li>

            <li>
              <Link className={contactClassname} href="/contact">
                Contact
              </Link>
            </li>

            <li>
              <Link className={aboutClassname} href="/about">
                About
              </Link>
            </li>
          </ul>

          <div className={classes.rightSide}>
            <a className={classes.phone} href="tel:5197528500">
              <Phone size={22} color="#ffc302" weight="duotone" />
              <span>519-752-8500</span>
            </a>

            <Link className={classes.headerCta} href="/contact">
              Request a Quote
            </Link>

            <a
              className={classes.mobileCall}
              href="tel:5197528500"
              aria-label="Call Bellhouse Excavating"
            >
              <Phone size={16} weight="duotone" />
              <span>Call</span>
            </a>

            <Hamburger
              showMenu={showMobileMenu}
              setShowMenu={setShowMobileMenu}
            />
          </div>
        </nav>
      </header>

      <MobileMenu
        setShowMenu={setShowMobileMenu}
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
