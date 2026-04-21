import { Fragment } from 'react';
import CallToAction from './components/webpage/CallToAction';
import ServiceAreasSection from './components/sections/ServiceAreaSection/ServiceAreaSection';

import HeroSectionBlock from './components/sections/HeroSection/HeroSection';
import ProofSection from './components/sections/ProofSection/ProofSection';
import {
  homeProofSection,
  homeHeroData,
  homeServicesSection,
  homeAudienceSection,
  homeTestimonialsSection,
  homeServiceAreasSection,
  homeResourcesSection,
  homeFinalCtaSection,
} from '@/content/pages/homeSections';
import ServicesSection from './components/sections/ServicesSection/ServicesSection';
import AudienceSection from './components/sections/AudienceSection/AudienceSection';
import TestimonialsSection from './components/sections/TestimonialsSection/TestimonialsSection';
import ResourcesSection from './components/sections/ResourcesSection/ResourcesSection';
import FinalCtaSection from './components/sections/FinalCtaSection/FinalCtaSection';

const HomePage = () => {
  return (
    <Fragment>
      <HeroSectionBlock data={homeHeroData} />
      <ProofSection data={homeProofSection} />
      <ServicesSection data={homeServicesSection} />
      <AudienceSection data={homeAudienceSection} />
      <TestimonialsSection data={homeTestimonialsSection} />
      <ServiceAreasSection data={homeServiceAreasSection} />
      <ResourcesSection data={homeResourcesSection} />
      <FinalCtaSection data={homeFinalCtaSection} />
    </Fragment>
  );
};

export default HomePage;
