/**
 * UniversalLink - A drop-in replacement for UniversalLink from @lark-apaas/client-toolkit-lite
 * 
 * Key differences from the original:
 * 1. Correctly handles tel: and mailto: links as <a> tags (original treats them as internal routes)
 * 2. Uses forwardRef to support Radix Slot (Button asChild pattern)
 * 3. Works without the 秒搭 platform context
 */

import * as React from 'react';
import { Link } from 'react-router-dom';

export interface UniversalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
}

export const UniversalLink = React.forwardRef<HTMLAnchorElement, UniversalLinkProps>(
  ({ to, children, ...rest }, ref) => {
    // External URLs (http, https)
    if (to.startsWith('http://') || to.startsWith('https://')) {
      return (
        <a
          ref={ref}
          href={to}
          target={rest.target || '_blank'}
          rel={rest.rel || 'noreferrer'}
          {...rest}
        >
          {children}
        </a>
      );
    }

    // tel: and mailto: links - render as <a> tags, NOT internal routes
    if (to.startsWith('tel:') || to.startsWith('mailto:')) {
      return (
        <a ref={ref} href={to} {...rest}>
          {children}
        </a>
      );
    }

    // Internal routes - use React Router Link
    return (
      <Link ref={ref as any} to={to} {...rest}>
        {children}
      </Link>
    );
  }
);

UniversalLink.displayName = 'UniversalLink';

export default UniversalLink;
