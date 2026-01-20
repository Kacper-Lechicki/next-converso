'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { ASSETS } from '@/constants/assets';
import NavbarItems from '@/components/layout/NavbarItems';

const Navbar = () => {
  const t = useTranslations('Navbar');

  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex items-center gap-2.5">
          <Image
            preload
            src={ASSETS.logo}
            alt={t('homeAlt')}
            width={46}
            height={44}
            className="w-[46px] h-auto"
          />
        </div>
      </Link>

      <div className="flex items-center gap-8">
        <NavbarItems />
        <Link href="/sign-in">{t('signIn')}</Link>
      </div>
    </nav>
  );
};

export default Navbar;
