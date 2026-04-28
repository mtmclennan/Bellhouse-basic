import Link from 'next/link';

import type { ResolvedServiceResourcesConfig } from '@/lib/servicePageLayout';
import type { ServiceResourcesSectionData } from '@/types/serviceSections';
import type { ServiceSectionAppearance } from '../serviceSectionTypes';
import ServiceSectionWrapper from '../primitives/ServiceSectionWrapper/ServiceSectionWrapper';
import classes from './ServiceResourcesSection.module.scss';

interface ServiceResourcesSectionProps {
  resourcesConfig: ResolvedServiceResourcesConfig | null;
  appearance: ServiceSectionAppearance;
  section?: ServiceResourcesSectionData;
}

type ResourceItem = {
  href: string;
  title: string;
  description: string;
  label: string;
};

function getResourceTypeLabel(href: string, title: string) {
  const normalizedTitle = title.toLowerCase();

  if (href.includes('/calculators/') || normalizedTitle.includes('calculator')) {
    return 'Calculator';
  }

  if (href.includes('/guides/') || normalizedTitle.includes('guide')) {
    return 'Guide';
  }

  return 'Planning resource';
}

export default function ServiceResourcesSection({
  resourcesConfig,
  appearance,
  section,
}: ServiceResourcesSectionProps) {
  if (!resourcesConfig && !section) {
    return null;
  }

  const items: ResourceItem[] = (section?.cards ?? resourcesConfig?.links ?? []).map(
    (linkItem) => {
      const isV2Card = 'body' in linkItem;

      return {
        href: linkItem.href,
        title: linkItem.title,
        description: isV2Card ? linkItem.body : linkItem.description,
        label:
          (isV2Card ? linkItem.label : linkItem.actionLabel) ?? 'View resource',
      };
    },
  );

  const actions =
    section?.actions?.map((action) => ({
      label: action.label,
      href: action.href,
      variant: action.variant === 'text' ? 'secondary' : action.variant,
    })) ??
    (resourcesConfig
      ? [
          {
            label: resourcesConfig.viewAllAction.label,
            href: resourcesConfig.viewAllAction.href,
            variant: 'secondary' as const,
          },
        ]
      : []);

  const sectionClassName = [
    classes.resourcesSection,
    appearance.backgroundVariant === 'dark'
      ? classes.resourcesSectionDark
      : classes.resourcesSectionLight,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ServiceSectionWrapper
      spacing="6"
      backgroundVariant={appearance.backgroundVariant}
      backgroundTone={appearance.backgroundTone}
      className={sectionClassName}
      containerClassName={classes.resourcesShell}
      heading={{
        eyebrow: section?.eyebrow ?? resourcesConfig?.eyebrow,
        title: section?.heading ?? resourcesConfig?.title ?? '',
        subtext: section?.subheading ?? resourcesConfig?.description,
        align: 'left',
      }}
    >
      <div className={classes.resourcesLayout}>
        <ul className={classes.resourceList}>
          {items.map((item, index) => (
            <li className={classes.resourceItem} key={item.href}>
              <article className={classes.resourceCard}>
                <div className={classes.resourceMetaRow}>
                  <span className={classes.resourceType}>
                    {getResourceTypeLabel(item.href, item.title)}
                  </span>
                  <span className={classes.resourceIndex}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className={classes.resourceBody}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <Link className={classes.resourceAction} href={item.href}>
                  {item.label}
                </Link>
              </article>
            </li>
          ))}
        </ul>

        {actions.length > 0 ? (
          <div className={classes.resourcesActions}>
            {actions.map((action) => (
              <Link
                key={`${action.href}-${action.label}`}
                className={
                  action.variant === 'secondary'
                    ? classes.secondaryAction
                    : classes.primaryAction
                }
                href={action.href}
              >
                {action.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </ServiceSectionWrapper>
  );
}
