'use client';

import Link from 'next/link';
import classes from './MobileMenu.module.scss';
import { Phone, ChatTextIcon } from '@phosphor-icons/react';
import { useEffect } from 'react';

type MobileMenuProps = {
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
};

const MobileMenu = ({ showMenu, setShowMenu }: MobileMenuProps) => {
  const menuClass = showMenu ? classes.menu : classes.menuHidden;

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

        <li className={classes.link}>
          <Link onClick={() => setShowMenu(false)} href="/service-areas">
            Service Areas
          </Link>
        </li>

        <li className={classes.link}>
          <Link onClick={() => setShowMenu(false)} href="/contractors">
            Contractors
          </Link>
        </li>

        <li className={classes.link}>
          <Link onClick={() => setShowMenu(false)} href="/resources">
            Resources
          </Link>
        </li>

        <li className={classes.link}>
          <Link onClick={() => setShowMenu(false)} href="/resources/calculators">
            Calculators
          </Link>
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
