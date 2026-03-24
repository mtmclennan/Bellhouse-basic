'use client';

import Footer from './Footer';
import { Fragment, ReactNode, useMemo } from 'react';
import Image from 'next/legacy/image';
import classes from './LayoutWeb.module.scss';
import { usePathname } from 'next/navigation';
import MainHeader from './MainHeader';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const currentRoute = usePathname() ?? '/';

  const showBackground = useMemo(
    () =>
      currentRoute === '/' ||
      currentRoute === '/about' ||
      currentRoute === '/contact' ||
      currentRoute === '/tools',
    [currentRoute],
  );

  return (
    <Fragment>
      {showBackground ? (
        <div className="background">
          <Image
            className="background-image"
            layout="fill"
            quality={80}
            src="/assets/background.jpg"
            alt="background"
          />
        </div>
      ) : null}

      <MainHeader currentRoute={currentRoute} />
      <main className={classes.container}>{children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
