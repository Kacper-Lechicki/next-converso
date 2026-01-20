'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/constants/navigation';
import { NavbarItem } from '@/types';

const NavbarItems = () => {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <nav className="flex items-center gap-4">
      {NAV_ITEMS.map((item: NavbarItem) => {
        const isActive: boolean = pathname === item.href;

        return (
          <Link
            href={item.href}
            key={item.href}
            className={cn(isActive && 'text-primary font-semibold')}
          >
            {t(`Navbar.${item.labelKey}`)}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavbarItems;
