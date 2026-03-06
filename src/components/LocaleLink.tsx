import React from 'react';
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  useParams,
} from 'react-router-dom';
import type { LinkProps, NavLinkProps } from 'react-router-dom';

/**
 * Locale-aware Link component.
 * Automatically prefixes the current language (from /:lang route param)
 * to absolute paths so navigation always stays within the language context.
 *
 * Usage: Drop-in replacement for react-router-dom's Link.
 *   import { Link } from "@/components/LocaleLink";
 *   <Link to="/products/drive-eraser" />
 *   // renders as /en/products/drive-eraser when lang=en
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, ...props }, ref) => {
    const { lang } = useParams<{ lang: string }>();
    const currentLang = lang || 'en';

    const localeTo =
      typeof to === 'string' && to.startsWith('/') && !to.startsWith(`/${currentLang}/`) && to !== `/${currentLang}`
        ? `/${currentLang}${to}`
        : to;

    return <RouterLink ref={ref} to={localeTo} {...props} />;
  }
);

Link.displayName = 'LocaleLink';

/**
 * Locale-aware NavLink component.
 * Same auto-prefixing behavior as Link above.
 */
export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ to, ...props }, ref) => {
    const { lang } = useParams<{ lang: string }>();
    const currentLang = lang || 'en';

    const localeTo =
      typeof to === 'string' && to.startsWith('/') && !to.startsWith(`/${currentLang}/`) && to !== `/${currentLang}`
        ? `/${currentLang}${to}`
        : to;

    return <RouterNavLink ref={ref} to={localeTo} {...props} />;
  }
);

NavLink.displayName = 'LocaleNavLink';
