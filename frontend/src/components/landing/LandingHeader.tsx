import Link from '@/components/SiteLink';
import Image from 'next/image';
import type { LandingPageData } from '@/data/landingPages/types';
import LandingCtaLink from './LandingCtaLink';
import logo from '../../../public/assets/BellhouseLogo-text-LS.png';

type LandingHeaderProps = {
  header: LandingPageData['header'];
  serviceKey: string;
  pageSlug: string;
};

export default function LandingHeader({
  header,
  serviceKey,
  pageSlug,
}: LandingHeaderProps) {
  return (
    <header className="landing-header">
      <Link
        className="landing-header__brand"
        href="/"
        aria-label={`${header.logoLabel ?? 'Bellhouse Excavating'} home`}
      >
        <Image
          src={logo}
          alt={header.logoLabel ?? 'Bellhouse Excavating'}
          width={1086}
          height={224}
          sizes="(max-width: 699px) 112px, 170px"
          priority
        />
      </Link>
      <nav aria-label="Landing page contact actions">
        <LandingCtaLink
          cta={header.phoneCta}
          serviceKey={serviceKey}
          pageSlug={pageSlug}
        />
        <LandingCtaLink
          cta={header.quoteCta}
          serviceKey={serviceKey}
          pageSlug={pageSlug}
        />
      </nav>
    </header>
  );
}
