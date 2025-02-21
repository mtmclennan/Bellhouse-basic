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
  return (
    <Fragment>
      {background === 'on' && (
        <div className="background">
          <Image
            className="background-image"
            quality={70}
            // placeholder="blur"
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
