export type LandingCta = {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'phone';
  trackingId?: string;
};

export type LandingImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  priority?: boolean;
};

export type LandingFormField = {
  name: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'tel'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'file'
    | 'date';
  required?: boolean;
  placeholder?: string;
  options?: string[];
  defaultValue?: string;
  width?: 'full' | 'half';
};

export type LandingPageData = {
  slug: string;
  serviceName: string;
  serviceKey: string;

  seo: {
    title: string;
    description: string;
    noindex?: boolean;
    canonical?: string;
    ogImage?: LandingImage;
  };

  header: {
    logoLabel?: string;
    phoneCta: LandingCta;
    quoteCta: LandingCta;
  };

  hero: {
    eyebrow?: string;
    titleHighlight?: string;
    title: string;
    subtitle: string;
    bullets?: string[];
    primaryCta: LandingCta;
    secondaryCta?: LandingCta;
    phoneCta?: LandingCta;
    backgroundImage?: LandingImage;
  };

  form: {
    id?: string;
    heading: string;
    description?: string;
    submitLabel: string;
    successMessage?: string;
    fields: LandingFormField[];
  };

  trustBar?: {
    items: {
      label: string;
      value?: string;
      icon?: string;
    }[];
  };

  audience?: {
    eyebrow?: string;
    heading: string;
    intro?: string;
    items: {
      title: string;
      description: string;
      icon?: string;
    }[];
  };

  handles?: {
    eyebrow?: string;
    heading: string;
    intro?: string;
    items: {
      title: string;
      description: string;
      icon?: string;
    }[];
  };

  pricing?: {
    eyebrow?: string;
    heading: string;
    intro?: string;
    basis?: {
      icon: string;
      kicker: string;
      title: string;
    }[];
    factors: {
      title: string;
      description: string;
    }[];
    rail?: {
      eyebrow?: string;
      heading: string;
      body: string;
      anchorLabel?: string;
      anchorLow?: { value: string; sub: string };
      anchorHigh?: { value: string; sub: string };
      chips?: string[];
      cta?: LandingCta;
    };
    sideNote?: {
      heading: string;
      body: string;
      cta?: LandingCta;
    };
  };

  proof?: {
    eyebrow?: string;
    heading: string;
    intro?: string;
    stats?: {
      value: string;
      label: string;
    }[];
    gallery?: LandingImage[];
  };

  faq?: {
    eyebrow?: string;
    heading: string;
    items: {
      question: string;
      answer: string;
    }[];
  };

  finalCta: {
    eyebrow?: string;
    heading: string;
    body: string;
    primaryCta: LandingCta;
    secondaryCta?: LandingCta;
    phoneCta?: LandingCta;
  };

  footer: {
    logoLabel?: string;
    serviceLine: string;
    locationLine: string;
    phoneCta: LandingCta;
  };

  mobileBar?: {
    callCta: LandingCta;
    textCta: LandingCta;
  };
};
