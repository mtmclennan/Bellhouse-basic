'use client';

import type { CSSProperties } from 'react';
import Link from '@/components/SiteLink';
import { Calculator, Truck, Ruler, Stack, Shovel } from '@phosphor-icons/react';
import type {
  BackgroundTone,
  ResourceIcon,
  ResourceSectionCard,
} from '@/types/sections';
import classes from './ResourceCardList.module.scss';

type ResourceCardListProps = {
  items: ResourceSectionCard[];
  isVisible?: boolean;
  tone?: BackgroundTone;
};

function renderIcon(icon?: ResourceIcon) {
  switch (icon) {
    case 'calculator':
      return <Calculator size={22} weight="duotone" />;
    case 'truck':
      return <Truck size={22} weight="duotone" />;
    case 'ruler':
      return <Ruler size={22} weight="duotone" />;
    case 'layers':
      return <Stack size={22} weight="duotone" />;
    case 'shovel':
      return <Shovel size={22} weight="duotone" />;
    default:
      return <Calculator size={22} weight="duotone" />;
  }
}

export default function ResourceCardList({
  items,
  isVisible = false,
  tone = 'default',
}: ResourceCardListProps) {
  const toneClassMap = {
    default: classes.toneDefault,
    soft: classes.toneSoft,
    muted: classes.toneMuted,
  };

  return (
    <div className={`${classes.cardRail} ${toneClassMap[tone]}`}>
      {items.map((item, index) => {
        const cardStyle = {
          ...(item.image
            ? { ['--card-image' as const]: `url("${item.image}")` }
            : {}),
          transitionDelay: `${index * 90}ms`,
        } as CSSProperties;

        return (
          <article
            className={`${classes.card} ${isVisible ? classes.cardVisible : ''}`}
            key={item.id}
            style={cardStyle}
          >
            <div className={classes.cardInner}>
              <div className={classes.cardHeader}>
                <span className={classes.cardIcon}>
                  {renderIcon(item.icon)}
                </span>

                <div className={classes.cardMetaWrap}>
                  {item.meta ? (
                    <span className={classes.cardMeta}>{item.meta}</span>
                  ) : null}
                  {item.tag ? (
                    <span className={classes.cardTag}>{item.tag}</span>
                  ) : null}
                </div>
              </div>

              <h3>{item.title}</h3>
              <p className={classes.cardLead}>{item.description}</p>

              {item.detail ? (
                <p className={classes.cardDetail}>{item.detail}</p>
              ) : null}

              {item.outputs?.length ? (
                <div
                  className={classes.outputList}
                  aria-label={`${item.title} outputs`}
                >
                  {item.outputs.map((output) => (
                    <span className={classes.outputChip} key={output}>
                      {output}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className={classes.cardActions}>
                {item.href && item.linkLabel ? (
                  <Link className={classes.cardPrimaryLink} href={item.href}>
                    {item.linkLabel}
                  </Link>
                ) : null}

                {item.actions?.map((action) => (
                  <Link
                    key={`${item.id}-${action.href}-${action.label}`}
                    className={
                      action.variant === 'secondary'
                        ? classes.cardSecondaryLink
                        : classes.cardPrimaryLink
                    }
                    href={action.href}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
