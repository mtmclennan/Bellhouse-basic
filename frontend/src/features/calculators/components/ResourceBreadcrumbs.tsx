import Link from 'next/link';
import classes from './ResourceBreadcrumbs.module.scss';

type ResourceBreadcrumbsProps = {
  currentLabel?: string;
  trail?: BreadcrumbItem[];
};

type BreadcrumbItem = {
  name: string;
  href?: string;
};

const baseUrl = 'https://bellhouseexcavating.ca';

export function ResourceBreadcrumbs({
  currentLabel,
  trail,
}: ResourceBreadcrumbsProps) {
  const items: BreadcrumbItem[] =
    trail ??
    [
      { name: 'Home', href: '/' },
      { name: 'Resources', href: '/resources' },
      ...(currentLabel ? [{ name: currentLabel }] : []),
    ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.href ?? '/resources'}`,
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
                ) : item.href ? (
                  <Link href={item.href}>{item.name}</Link>
                ) : (
                  item.name
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
