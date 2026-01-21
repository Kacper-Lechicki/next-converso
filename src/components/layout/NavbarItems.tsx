'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAV_ITEMS } from '@/constants/navigation';
import { cn } from '@/lib/utils';
import { NavbarItem } from '@/types';

const NavbarItems = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <nav className={cn('flex items-center gap-6', className)}>
      {NAV_ITEMS.map((item: NavbarItem) => {
        const isActive: boolean = pathname === item.href;

        return (
          <Link
            href={item.href}
            key={item.href}
            onClick={onClick}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'text-base font-medium transition-colors hover:text-primary',
              isActive ? 'text-primary font-bold' : 'text-muted-foreground',
            )}
          >
            {t(`Navbar.${item.labelKey}`)}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavbarItems;
