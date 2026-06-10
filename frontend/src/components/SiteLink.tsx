import Link from 'next/link';
import type { ComponentProps } from 'react';

type SiteLinkProps = ComponentProps<typeof Link>;

const SiteLink = ({ prefetch = false, ...props }: SiteLinkProps) => {
  return <Link prefetch={prefetch} {...props} />;
};

export default SiteLink;
