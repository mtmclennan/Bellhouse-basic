'use client';

import Footer from './Footer';
import { Fragment, ReactNode } from 'react';
import Image from 'next/image';
import classes from './LayoutWeb.module.scss';
import { usePathname } from 'next/navigation';
import HeaderHome from './HeaderHome';
import backgroundImage from '../../../../public/assets/foundation-excavation-dump-truck-loading-brantford.webp';

type LayoutProps = {
  children: ReactNode;
  background?: 'off' | 'on';
};

const LayoutHome = ({ children, background = 'on' }: LayoutProps) => {
  const pathname = usePathname();
  const isLandingPage = pathname?.startsWith('/landing/');
  const isServicesPage =
    pathname?.startsWith('/services/') && pathname !== '/services';
  const isOverlayHeroRoute =
    pathname === '/service-areas' ||
    pathname?.startsWith('/service-areas/') ||
    pathname === '/contractors' ||
    pathname?.startsWith('/contractors/') ||
    pathname === '/resources' ||
    pathname?.startsWith('/resources/');

  const showBackground =
    isLandingPage || isServicesPage || isOverlayHeroRoute ? 'off' : background;

  return (
    <Fragment>
      {showBackground === 'on' && (
        <div className="background">
          <Image
            className="background-image"
            quality={70}
            priority
            fill
            src={backgroundImage}
            alt="an excavator digging a foundation, loading fill onto a dump truck"
            sizes="100vw"
          />
        </div>
      )}
      {!isLandingPage && <HeaderHome />}
      <main className={classes.containerHome}>{children}</main>
      {!isLandingPage && <Footer />}
    </Fragment>
  );
};

export default LayoutHome;
