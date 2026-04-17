import Link from 'next/link';
import { getCanonicalUrl } from '@/lib/siteMetadata';
import classes from './ResourceBreadcrumbs.module.scss';

type ResourceBreadcrumbsProps = {
  currentLabel?: string;
  currentPath?: string;
  trail?: BreadcrumbItem[];
};

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export function SiteBreadcrumbs({
  currentLabel,
  currentPath,
  trail,
}: ResourceBreadcrumbsProps) {
  const items: BreadcrumbItem[] =
    trail ??
    [
      { name: 'Home', href: '/' },
      { name: 'Resources', href: '/resources' },
      ...(currentLabel && currentPath
        ? [{ name: currentLabel, href: currentPath }]
        : []),
    ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.href),
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className={classes.breadcrumbs}>
          {items.map((item, index) => {
            const isCurrent = index === items.length - 1;

            return (
              <li className={classes.crumb} key={`${item.name}-${index}`}>
                {isCurrent ? (
                  <span className={classes.current} aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href}>{item.name}</Link>
                )}
                {!isCurrent ? <span className={classes.separator}>/</span> : null}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}

export const ResourceBreadcrumbs = SiteBreadcrumbs;
