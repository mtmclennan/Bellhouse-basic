'use client';

import Footer from './Footer';
import { Fragment, ReactNode } from 'react';
import Image from 'next/legacy/image';
import classes from './LayoutWeb.module.scss';
import { usePathname } from 'next/navigation';
import HeaderHome from './HeaderHome';

type LayoutProps = {
  children: ReactNode;
  background?: 'off' | 'on';
};

const LayoutHome = ({ children, background = 'on' }: LayoutProps) => {
  const pathname = usePathname();
  return (
    <Fragment>
      {background === 'on' && (
        <div className="background">
          <Image
            className="background-image"
            layout="fill"
            quality={70}
            // placeholder="blur"
            src="/assets/background.jpg"
            alt="background"
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
