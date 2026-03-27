import type { ReactNode } from 'react';
import FAQAccordion from '@/app/components/FAQAccordion';

type ServiceAreaFaqItem = {
  question: string;
  answer: string;
};

type ServiceAreaFaqProps = {
  heading?: string;
  items: ServiceAreaFaqItem[];
  cta?: ReactNode;
};

export default function ServiceAreaFaq({
  heading = 'Frequently asked questions',
  items,
  cta,
}: ServiceAreaFaqProps) {
  return (
    <FAQAccordion
      heading={heading}
      items={items.map((item) => ({
        question: item.question,
        answer: <p>{item.answer}</p>,
      }))}
      cta={cta}
      variant="serviceArea"
    />
  );
}
