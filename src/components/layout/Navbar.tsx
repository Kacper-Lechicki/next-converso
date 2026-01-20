'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';

import { ASSETS } from '@/constants/assets';
import NavbarItems from '@/components/layout/NavbarItems';

const Navbar = () => {
  const t = useTranslations('Navbar');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar relative z-50">
      <Link href="/" className="z-50" onClick={() => setIsOpen(false)}>
        <div className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <Image
            preload
            src={ASSETS.logo}
            alt={t('home_alt')}
            width={46}
            height={44}
            className="w-[46px] h-auto"
          />
        </div>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <NavbarItems />

        <Link
          href="/sign-in"
          className="btn-signin transition-colors hover:bg-primary hover:text-primary-foreground active:bg-primary/90"
        >
          {t('sign_in')}
        </Link>
      </div>

      <button
        className="md:hidden z-50 p-2 text-foreground"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-background/95 backdrop-blur-sm p-4 animate-in fade-in slide-in-from-top-5 duration-200">
          <NavbarItems
            className="flex-col text-lg gap-8"
            onClick={() => setIsOpen(false)}
          />

          <Link
            href="/sign-in"
            className="btn-signin text-base px-8 py-3"
            onClick={() => setIsOpen(false)}
          >
            {t('sign_in')}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
