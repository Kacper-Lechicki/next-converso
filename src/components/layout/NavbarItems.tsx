'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface NavbarItem {
  labelKey: string;
  href: string;
}

const NAV_ITEMS: NavbarItem[] = [
  { labelKey: 'companions', href: '/companions' },
  { labelKey: 'my_journey', href: '/my-journey' },
];

const NavbarItems = () => {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <nav className="flex items-center gap-4">
      {NAV_ITEMS.map((item) => {
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
