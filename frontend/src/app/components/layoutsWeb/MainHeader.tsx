'use client';
import Link from 'next/link';
import classes from './MainHeader.module.scss';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '../../../../public/assets/BellhouseLogo-text-LS.png';
import { Fragment, useEffect, useState } from 'react';
import Hamburger from './Hamburger';
import MobileMenu from './MobileMenu';
import { CaretDownIcon, Phone } from '@phosphor-icons/react';
import { resourceNavigationItems } from './resourcesNavigation';

const MainHeader = ({ currentRoute }: { currentRoute: string }) => {
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const isOverlayRoute =
    currentRoute === '/service-areas' ||
    currentRoute.startsWith('/service-areas/') ||
    currentRoute.startsWith('/contractors') ||
    currentRoute === '/resources' ||
    currentRoute.startsWith('/resources/');

  useEffect(() => {
    setShowMobileMenu(false);
  }, [currentRoute]);

  return (
    <Fragment>
      <header
        className={`${classes.header} ${isOverlayRoute ? classes.headerOverlay : ''}`}
      >
        <nav className={classes.nav}>
          <div className={classes.logo}>
            <Link href="/">
              <Image
                src={logo}
                alt="Bellhouse Excavating"
                width={250}
                priority
                height={200}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </Link>
          </div>
          <ul>
            <li>
              <Link legacyBehavior={true} href="/services">
                Services
              </Link>
            </li>
            <li>
              <Link legacyBehavior={true} href="/service-areas">
                Service Areas
              </Link>
            </li>
            <li>
              <Link legacyBehavior={true} href="/contractors">
                Contractors
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
              <Link legacyBehavior={true} href="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link legacyBehavior={true} href="/about">
                About
              </Link>
            </li>
          </ul>
          <div className={classes.actionContainer}>
            <button onClick={() => router.push('/contact')}>
              Request a Quote
            </button>
            <li>
              <a className={classes.phone} href="tel:5197528500">
                <Phone size={24} color={'#ffc302'} />
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

      <MobileMenu showMenu={showMobileMenu} setShowMenu={setShowMobileMenu} />
    </Fragment>
  );
};

export default MainHeader;

