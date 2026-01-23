'use client';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import NavbarItems from '@/components/layout/NavbarItems';
import { ASSETS } from '@/config/assets';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const t = useTranslations('Navbar');
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300 w-full bg-background',
        isScrolled ? 'border-b border-primary' : 'border-b border-transparent',
      )}
      role="banner"
    >
      <div className="flex items-center justify-between mx-auto w-full max-w-[1400px] px-14 py-4 max-sm:px-4">
        <Link href="/" className="z-50" onClick={() => setIsOpen(false)}>
          <div className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <Image
              priority
              src={ASSETS.logo}
              alt={t('home_alt')}
              width={40}
              height={39}
              className="w-[40px] h-[39px] rounded-xl"
            />
          </div>
        </Link>

        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main navigation"
        >
          <NavbarItems />
          <LanguageSwitcher />

          <SignedOut>
            <Link
              href="/sign-in"
              className="btn-signin transition-colors hover:bg-primary hover:text-primary-foreground active:bg-primary/90"
            >
              {t('sign_in')}
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-10 h-10',
                },
              }}
            />
          </SignedIn>
        </nav>

        <button
          className="md:hidden z-50 p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? (
            <X className="size-6" aria-hidden="true" />
          ) : (
            <Menu className="size-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {isOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-background backdrop-blur-sm p-4 animate-in fade-in slide-in-from-top-5 duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <NavbarItems
            className="flex-col text-xl gap-8"
            onClick={() => setIsOpen(false)}
          />

          <LanguageSwitcher />

          <SignedOut>
            <Link
              href="/sign-in"
              className="btn-signin text-base px-8 py-3"
              onClick={() => setIsOpen(false)}
            >
              {t('sign_in')}
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-12 h-12',
                },
              }}
            />
          </SignedIn>
        </div>
      )}
    </header>
  );
};

export default Navbar;
