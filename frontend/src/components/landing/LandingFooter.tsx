import Link from 'next/link';
import Image from 'next/image';
import type { LandingPageData } from '@/data/landingPages/types';
import LandingCtaLink from './LandingCtaLink';
import logo from '../../../public/assets/BellhouseLogo-text.png';

type LandingFooterProps = {
  footer: LandingPageData['footer'];
  serviceName: string;
  serviceKey: string;
  pageSlug: string;
};

export default function LandingFooter({
  footer,
  serviceName,
  serviceKey,
  pageSlug,
}: LandingFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="landing-footer">
      <div className="landing-footer__brand">
        <Link href="/" aria-label={`${footer.logoLabel ?? serviceName} home`}>
          <Image
            src={logo}
            alt={footer.logoLabel ?? 'Bellhouse Excavating'}
            width={200}
            height={151}
            sizes="140px"
          />
        </Link>
        <p>&copy; {year} Bellhouse Excavating</p>
      </div>
      <div className="landing-footer__details">
        <p>{footer.serviceLine}</p>
        <p>{footer.locationLine}</p>
      </div>
      <LandingCtaLink
        cta={footer.phoneCta}
        serviceKey={serviceKey}
        pageSlug={pageSlug}
      />
    </footer>
  );
}
