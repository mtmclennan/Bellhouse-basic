'use client';

import Link from 'next/link';
import { ChatText, ClipboardText, PhoneCall } from '@phosphor-icons/react';
import type {
  ContactMethodIcon,
  ContactMethodsSectionData,
} from '@/types/sections';
import classes from './ContactMethodsSection.module.scss';

type Props = {
  data: ContactMethodsSectionData;
};

function renderIcon(icon?: ContactMethodIcon) {
  const iconProps = { size: 24, weight: 'fill' as const };

  switch (icon) {
    case 'call':
      return <PhoneCall {...iconProps} />;
    case 'text':
      return <ChatText {...iconProps} />;
    case 'form':
      return <ClipboardText {...iconProps} />;
    default:
      return null;
  }
}

export default function ContactMethodsSection({ data }: Props) {
  const {
    eyebrow,
    heading,
    intro,
    fitText,
    methods,
    supportingLinks = [],
    backgroundVariant = 'dark',
    backgroundTone = 'default',
  } = data;

  const variantClassMap = {
    light: classes.variantLight,
    dark: classes.variantDark,
    transparent: classes.variantTransparent,
  };

  const toneClassMap = {
    default: '',
    soft: classes.toneSoft,
    muted: classes.toneMuted,
  };

  return (
    <section
      className={[
        classes.section,
        variantClassMap[backgroundVariant],
        toneClassMap[backgroundTone],
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={classes.inner}>
        <div className={classes.introBlock}>
          {eyebrow ? <p className={classes.eyebrow}>{eyebrow}</p> : null}
          <h2>{heading}</h2>
          <p>{intro}</p>
          {fitText ? <p className={classes.fitText}>{fitText}</p> : null}
        </div>

        <div className={classes.methodGrid}>
          {methods.map((method) => (
            <article key={method.id} className={classes.methodCard}>
              <div className={classes.methodTop}>
                {method.icon ? (
                  <span className={classes.icon} aria-hidden="true">
                    {renderIcon(method.icon)}
                  </span>
                ) : null}
                <h3>{method.title}</h3>
              </div>
              <p>{method.text}</p>
              <Link href={method.action.href} className={classes.methodAction}>
                {method.action.label}
              </Link>
            </article>
          ))}
        </div>

        {supportingLinks.length > 0 ? (
          <div className={classes.supportingLinks}>
            {supportingLinks.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className={
                  link.variant === 'primary'
                    ? classes.supportingPrimary
                    : classes.supportingSecondary
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
