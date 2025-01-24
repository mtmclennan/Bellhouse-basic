import Footer from './Footer';
import { Fragment, ReactNode, useEffect, useState } from 'react';
import Image from 'next/legacy/image';
import classes from './LayoutWeb.module.scss';
import { useRouter } from 'next/router';
import MainHeader from './MainHeader';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [showBackground, setShowBackground] = useState(false);
  const router = useRouter();
  const currentRoute = router.pathname;

  useEffect(() => {
    if (
      currentRoute === '/' ||
      currentRoute === '/about' ||
      currentRoute === '/contact' ||
      currentRoute === '/tools'
    ) {
      setShowBackground(true);
    } else setShowBackground(false);
  }, [currentRoute]);

  return (
    <Fragment>
      <div className="background">
        <Image
          className="background-image"
          layout="fill"
          quality={80}
          // placeholder="blur"
          src="/assets/background.jpg"
          alt="background"
        />
      </div>

      <MainHeader currentRoute={currentRoute} />
      <main className={classes.container}>{children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
