import type { LandingPageData } from '@/data/landingPages/types';
import LandingAudience from './LandingAudience';
import LandingFaq from './LandingFaq';
import LandingFinalCta from './LandingFinalCta';
import LandingFooter from './LandingFooter';
import LandingHandles from './LandingHandles';
import LandingHeader from './LandingHeader';
import LandingHero from './LandingHero';
import LandingMobileBar from './LandingMobileBar';
import LandingPricing from './LandingPricing';
import LandingProof from './LandingProof';
import LandingTrustBar from './LandingTrustBar';

type LandingPageTemplateProps = {
  page: LandingPageData;
};

export default function LandingPageTemplate({ page }: LandingPageTemplateProps) {
  return (
    <article className="landing-page landing-page-shell">
      <LandingHeader
        header={page.header}
        serviceKey={page.serviceKey}
        pageSlug={page.slug}
      />
      <main>
        <LandingHero
          hero={page.hero}
          form={page.form}
          serviceKey={page.serviceKey}
          pageSlug={page.slug}
        />
        <LandingTrustBar trustBar={page.trustBar} />
        <LandingAudience audience={page.audience} />
        <LandingHandles handles={page.handles} />
        <LandingPricing
          pricing={page.pricing}
          serviceKey={page.serviceKey}
          pageSlug={page.slug}
        />
        <LandingProof proof={page.proof} />
        <LandingFaq faq={page.faq} />
        <LandingFinalCta
          finalCta={page.finalCta}
          serviceKey={page.serviceKey}
          pageSlug={page.slug}
        />
      </main>
      <LandingFooter
        footer={page.footer}
        serviceName={page.serviceName}
        serviceKey={page.serviceKey}
        pageSlug={page.slug}
      />
      <LandingMobileBar
        mobileBar={page.mobileBar}
        serviceKey={page.serviceKey}
        pageSlug={page.slug}
      />
    </article>
  );
}
