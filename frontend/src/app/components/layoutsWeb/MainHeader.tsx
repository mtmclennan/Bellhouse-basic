'use client';
import Link from '@/components/SiteLink';
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
        className={`${classes.header} ${isOverlayRoute ? classes.headerOverlay : ''}`}
      >
        <nav className={classes.nav}>
          <div className={classes.logoWrap}>
            <Link href="/" aria-label="Bellhouse Excavating home">
              <Image
                src={logo}
                alt="Bellhouse Excavating"
                width={250}
                priority
                height={200}
                className={classes.logoImg}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </Link>
          </div>
          <ul className={classes.desktopNav} aria-label="Main navigation">
            <li>
              <Link href="/" aria-current={currentRoute === '/' ? 'page' : undefined}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                aria-current={currentRoute.startsWith('/services') ? 'page' : undefined}
              >
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
              <Link href="/about" aria-current={currentRoute === '/about' ? 'page' : undefined}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" aria-current={currentRoute === '/contact' ? 'page' : undefined}>
                Contact
              </Link>
            </li>
          </ul>
          <div className={classes.rightSide}>
            <button
              type="button"
              className={classes.headerCta}
              onClick={() => router.push('/contact')}
            >
              Request a Quote
            </button>
            <a className={classes.phone} href="tel:5197528500">
              <Phone size={24} color={'#ffc302'} />
              <span>519-752-8500</span>
            </a>
          </div>
          <Hamburger
            showMenu={showMobileMenu}
            setShowMenu={setShowMobileMenu}
          />
        </nav>
      </header>

      <MobileMenu
        showMenu={showMobileMenu}
        setShowMenu={setShowMobileMenu}
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
