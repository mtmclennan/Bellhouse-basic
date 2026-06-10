import classes from './Footer.module.scss';
import Link from '@/components/SiteLink';
import Image from 'next/image';
import logo from '../../../../public/assets/BellhouseLogo-text.png';
import { Phone } from '@phosphor-icons/react';
import { GOOGLE_REVIEWS_URL } from '@/lib/reviewLinks';

const footerSections = [
  {
    title: 'Services',
    links: [
      { href: '/services', label: 'All Services' },
      {
        href: '/services/foundation-excavation',
        label: 'Foundation Excavation',
      },
      {
        href: '/services/site-preparation-land-grading',
        label: 'Site Prep & Grading',
      },
      {
        href: '/services/land-grading-drainage',
        label: 'Land Grading & Drainage',
      },
      {
        href: '/services/dirt-gravel-delivery',
        label: 'Dirt & Gravel Delivery',
      },
      {
        href: '/services/house-barn-demolition',
        label: 'Demolition',
      },
    ],
  },
  {
    title: 'Service Areas',
    links: [
      { href: '/service-areas', label: 'All Service Areas' },
      { href: '/service-areas/brantford', label: 'Brantford' },
      { href: '/service-areas/paris', label: 'Paris' },
      { href: '/service-areas/hamilton', label: 'Hamilton' },
      { href: '/service-areas/cambridge', label: 'Cambridge' },
      { href: '/service-areas/ancaster', label: 'Ancaster' },
      { href: '/service-areas/woodstock', label: 'Woodstock' },
    ],
  },
  {
    title: 'Contractors',
    links: [
      { href: '/contractors', label: 'Contractors' },
      {
        href: '/services/heavy-equipment-hauling',
        label: 'Heavy Equipment Hauling',
      },
      {
        href: '/services/dump-truck-rental',
        label: 'Dump Truck Services',
      },
      {
        href: '/services/volvo-a35-off-road-dump-truck-rental',
        label: 'Off-Road Dump Truck',
      },
      {
        href: '/services/site-preparation-land-grading',
        label: 'Site Prep & Grading',
      },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/resources/calculators', label: 'Estimating Calculators' },
      {
        href: '/resources/calculators/excavation',
        label: 'Excavation Calculator',
      },
      {
        href: '/resources/calculators/gravel',
        label: 'Gravel Calculator',
      },
      {
        href: '/resources/calculators/topsoil',
        label: 'Topsoil Calculator',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/privacy-policy', label: 'Privacy Policy' },
    ],
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={classes.footer}>
      <div className={classes.top}>
        <div className={classes.brand}>
          <Link
            href="/"
            className={classes.logoLink}
            aria-label="Bellhouse Excavating home"
          >
            <Image
              src={logo}
              alt="Bellhouse Excavating"
              width={200}
              height={151}
              className={classes.logo}
              priority={false}
            />
          </Link>

          <a className={classes.phone} href="tel:5197528500">
            <Phone size={26} color="#ffc302" weight="duotone" />
            <span>519-752-8500</span>
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            className={classes.review}
            href={GOOGLE_REVIEWS_URL}
          >
            Leave Us a Google Review
          </a>
        </div>

        <nav className={classes.linkGrid} aria-label="Footer navigation">
          {footerSections.map((section) => (
            <div key={section.title} className={classes.linkColumn}>
              <h3>{section.title}</h3>
              <ul>
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className={classes.bottom}>
        <p>&copy; {year} Bellhouse Excavating</p>

        <small className={classes.siteBy}>
          <a
            href="https://all8webworks.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Site by ALL8 Webworks
          </a>
        </small>
      </div>
    </footer>
  );
};

export default Footer;
