'use client';

import Link from '@/components/SiteLink';
import { usePathname } from 'next/navigation';
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

const mobileResourceItems = resourceNavigationItems
  .filter((item) =>
    [
      '/resources/calculators',
      '/resources/calculators/excavation',
      '/resources/calculators/gravel',
    ].includes(item.href),
  )
  .map((item) =>
    item.href === '/resources/calculators'
      ? { ...item, label: 'Calculators' }
      : item,
  );

const MobileMenu = ({
  servicesClassname,
  aboutClassname,
  contactClassname,
  showMenu,
  setShowMenu,
}: MobileMenuProps) => {
  const menuClass = showMenu ? classes.menu : classes.menuHidden;
  const resourcesPanelId = useId();
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const pathname = usePathname();
  const resourcesActive = pathname?.startsWith('/resources');

  const getNavLinkClass = (isActive: boolean) =>
    [classes.navLink, isActive ? classes.activeLink : '']
      .filter(Boolean)
      .join(' ');

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
          <Link
            className={getNavLinkClass(servicesClassname === 'active')}
            onClick={() => setShowMenu(false)}
            href="/services"
          >
            Services
          </Link>
        </li>

        <li className={classes.link}>
          <button
            type="button"
            className={`${classes.dropdownToggle} ${
              resourcesActive ? classes.activeLink : ''
            }`.trim()}
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
              {mobileResourceItems.map((item) => (
                <Link
                  key={item.href}
                  className={
                    pathname === item.href ? classes.activeSubLink : ''
                  }
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
          <Link
            className={getNavLinkClass(aboutClassname === 'active')}
            onClick={() => setShowMenu(false)}
            href="/about"
          >
            About
          </Link>
        </li>

        <li className={classes.link}>
          <Link
            className={getNavLinkClass(contactClassname === 'active')}
            onClick={() => setShowMenu(false)}
            href="/contact"
          >
            Contact
          </Link>
        </li>

        <li className={classes.actionRow}>
          <a
            className={`${classes.actionButton} ${classes.callButton}`}
            href="tel:5197528500"
            onClick={() => setShowMenu(false)}
          >
            <Phone size={22} weight="duotone" />
            <span>Call</span>
          </a>
          <a
            className={`${classes.actionButton} ${classes.textButton}`}
            href="sms:5197528500"
            onClick={() => setShowMenu(false)}
          >
            <ChatTextIcon size={22} weight="duotone" />
            <span>Text</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
