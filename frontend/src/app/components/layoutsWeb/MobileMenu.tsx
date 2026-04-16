'use client';

import Link from 'next/link';
import classes from './MobileMenu.module.scss';
import { Phone, ChatTextIcon, CaretDown } from '@phosphor-icons/react';
import { useEffect, useId, useState } from 'react';
import { resourceNavigationItems } from './resourcesNavigation';

type MobileMenuProps = {
  homeClassname: string;
  servicesClassname: string;
  careersClassname: string;
  aboutClassname: string;
  contactClassname: string;
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
};

const MobileMenu = ({ showMenu, setShowMenu }: MobileMenuProps) => {
  const menuClass = showMenu ? classes.menu : classes.menuHidden;
  const resourcesPanelId = useId();
  const [resourcesOpen, setResourcesOpen] = useState(false);

  useEffect(() => {
    if (!showMenu) {
      setResourcesOpen(false);
    }
  }, [showMenu]);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    if (showMenu) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [showMenu]);

  return (
    <div className={menuClass}>
      <ul>
        <li className={classes.link}>
          <Link onClick={() => setShowMenu(false)} href="/">
            Home
          </Link>
        </li>

        <li className={classes.link}>
          <Link onClick={() => setShowMenu(false)} href="/services">
            Services
          </Link>
        </li>

        {/* RESOURCES DROPDOWN */}
        <li className={classes.link}>
          <button
            type="button"
            className={classes.dropdownToggle}
            aria-expanded={resourcesOpen}
            aria-controls={resourcesPanelId}
            onClick={() => setResourcesOpen(!resourcesOpen)}
          >
            <span>Resources</span>
            <CaretDown
              size={18}
              className={resourcesOpen ? classes.rotate : ''}
            />
          </button>

          {resourcesOpen && (
            <div className={classes.subMenu} id={resourcesPanelId}>
              {resourceNavigationItems.map((item) => (
                <Link
                  key={item.href}
                  onClick={() => setShowMenu(false)}
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </li>

        <li className={classes.link}>
          <Link onClick={() => setShowMenu(false)} href="/about">
            About
          </Link>
        </li>

        <li className={classes.link}>
          <Link onClick={() => setShowMenu(false)} href="/contact">
            Contact
          </Link>
        </li>

        <li className={classes.link}>
          <a className={classes.phone} href="tel:5197528500">
            <Phone size={30} />
            <h3>519-752-8500</h3>
          </a>
        </li>

        <li className={classes.link}>
          <a className={classes.phone} href="sms:5197528500">
            <ChatTextIcon size={30} />
            Text Us
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
