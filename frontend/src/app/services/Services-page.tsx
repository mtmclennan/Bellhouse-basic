import { Fragment } from 'react';
import FinalCtaSection from '@/app/components/sections/FinalCtaSection/FinalCtaSection';
import HeroSection from '@/app/components/sections/HeroSection/HeroSection';
import ServiceAreasSection from '@/app/components/sections/ServiceAreaSection/ServiceAreaSection';
import ServicesSection from '@/app/components/sections/ServicesSection/ServicesSection';
import {
  servicesFinalCtaSection,
  servicesHeroData,
  servicesServiceAreasSection,
  servicesServicesSection,
} from '@/content/pages/servicesSections';

const Services = () => {
  return (
    <Fragment>
      <HeroSection data={servicesHeroData} />
      <ServicesSection data={servicesServicesSection} />
      <ServiceAreasSection data={servicesServiceAreasSection} />
      <FinalCtaSection data={servicesFinalCtaSection} />
    </Fragment>
  );
};

export default Services;
