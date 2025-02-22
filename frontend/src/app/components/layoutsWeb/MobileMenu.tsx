import Link from 'next/link';
import classes from './MobileMenu.module.scss';
import { Phone } from '@phosphor-icons/react';
// import { useEffect, useState } from "react";

type MobileMenuProps = {
  homeClassname: string;
  servicesClassname: string;
  careersClassname: string;
  aboutClassname: string;
  contactClassname: string;
  showMenu: boolean;
};

const MobileMenu = ({
  showMenu,
  homeClassname,
  servicesClassname,
  careersClassname,
  aboutClassname,
  contactClassname,
}: MobileMenuProps) => {
  const menuClass = showMenu ? classes.menu : classes.menuHidden;
  return (
    <div className={menuClass}>
      <ul>
        <li className={classes.link}>
          <Link href="/">Home</Link>
        </li>
        <li className={classes.link}>
          <Link href="/services">Services</Link>
        </li>
        <li className={classes.link}>
          <Link href="/about">About</Link>
        </li>
        <li className={classes.link}>
          <Link href="/contact">Contact</Link>
        </li>
        {/* <li className={classes.link}>
          <Link href="/careers">Careers</Link>
        </li> */}
        <li className={classes.link}>
          <a className={classes.phone} href="tel:519-752-8500">
            <Phone size={30} />
            <h3>519-752-8500</h3>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
