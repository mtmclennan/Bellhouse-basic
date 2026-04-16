'use client';

import Link from 'next/link';
import classes from './MainHeader.module.scss';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '../../../../public/assets/BellhouseLogo-text.png';
import { Fragment, useEffect, useState } from 'react';
import Hamburger from './Hamburger';
import MobileMenu from './MobileMenu';
import { CaretDownIcon, Phone } from '@phosphor-icons/react';
import { resourceNavigationItems } from './resourcesNavigation';

const MainHeader = ({ currentRoute }: { currentRoute?: string }) => {
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const isOverlayHeroRoute =
    currentRoute === '/service-areas' ||
    currentRoute?.startsWith('/service-areas/') ||
    currentRoute === '/contractors' ||
    currentRoute?.startsWith('/contractors/') ||
    currentRoute === '/calculators' ||
    currentRoute?.startsWith('/calculators/') ||
    currentRoute === '/resources' ||
    currentRoute?.startsWith('/resources/') ||
    currentRoute === '/about' ||
    currentRoute?.startsWith('/about/');

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
      <header
        className={`${classes.headerHome} ${isOverlayHeroRoute ? classes.headerHomeOverlay : ''}`}
      >
        <nav className={classes.navHome}>
          <div
            className={`${classes.logoHome} ${isOverlayHeroRoute ? classes.logoHomeMobileVisible : ''}`}
          >
            <Link href="/">
              <Image
                src={logo}
                alt="Bellhouse Excavating"
                width={200}
                height={151}
                sizes="(max-width: 800px) 220px, 300px"
                className={classes.logoImg}
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

            <li className={classes.actionContainer}>
              <Link className={classes.headerHome_cta} href="/contact">
                Request a Quote
              </Link>
            </li>

            <li>
              <a className={classes.phone} href="tel:5197528500">
                <Phone size={24} color="#ffc302" weight="duotone" />
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
