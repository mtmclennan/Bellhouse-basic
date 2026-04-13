'use client';

import Footer from './Footer';
import { Fragment, ReactNode } from 'react';
import Image from 'next/image';
import classes from './LayoutWeb.module.scss';
import { usePathname } from 'next/navigation';
import HeaderHome from './HeaderHome';

type LayoutProps = {
  children: ReactNode;
  background?: 'off' | 'on';
};

const LayoutHome = ({ children, background = 'on' }: LayoutProps) => {
  const pathname = usePathname();
  const isServicesPage =
    pathname?.startsWith('/services/') && pathname !== '/services';
  const isOverlayHeroRoute =
    pathname === '/service-areas' ||
    pathname?.startsWith('/service-areas/') ||
    pathname === '/contractors' ||
    pathname?.startsWith('/contractors/') ||
    pathname === '/calculators' ||
    pathname?.startsWith('/calculators/') ||
    pathname === '/about' ||
    pathname?.startsWith('/about/');

  const showBackground = isServicesPage || isOverlayHeroRoute ? 'off' : background;

  return (
    <Fragment>
      {showBackground === 'on' && (
        <div className="background">
          <Image
            className="background-image"
            quality={70}
            priority
            fill
            src="/assets/background.jpg"
            alt="an excavator digging a foundation, loading fill onto a dump truck"
          />
        </div>
      )}
      <HeaderHome currentRoute={`${pathname ? pathname : '/'}`} />
      <main className={classes.containerHome}>{children}</main>
      <Footer />
    </Fragment>
  );
};

export default LayoutHome;
