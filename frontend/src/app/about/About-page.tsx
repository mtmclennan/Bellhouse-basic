import { Fragment } from 'react';
import AboutStorySection from '@/app/components/sections/AboutStorySection/AboutStorySection';
import FinalCtaSection from '@/app/components/sections/FinalCtaSection/FinalCtaSection';
import HeroSection from '@/app/components/sections/HeroSection/HeroSection';
import ProofSection from '@/app/components/sections/ProofSection/ProofSection';
import ServiceAreasSection from '@/app/components/sections/ServiceAreaSection/ServiceAreaSection';
import TestimonialsSection from '@/app/components/sections/TestimonialsSection/TestimonialsSection';
import { aboutFaqSection } from '@/content/pages/aboutSections';

import {
  aboutFinalCtaSection,
  aboutHeroData,
  aboutProofSection,
  aboutServiceAreasSection,
  aboutStorySection,
  aboutTestimonialsSection,
} from '@/content/pages/aboutSections';
import FaqSection from '../components/sections/FaqSection/FaqSection';

const About = () => {
  return (
    <Fragment>
      <HeroSection data={aboutHeroData} />
      <AboutStorySection data={aboutStorySection} />
      <ProofSection data={aboutProofSection} />
      <FaqSection data={aboutFaqSection} />
      <TestimonialsSection data={aboutTestimonialsSection} />
      <ServiceAreasSection data={aboutServiceAreasSection} />
      <FinalCtaSection data={aboutFinalCtaSection} />
    </Fragment>
  );
};

export default About;
