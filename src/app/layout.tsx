import { enUS, plPL } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Bricolage_Grotesque } from 'next/font/google';
import { Suspense } from 'react';

import '@/styles/globals.css';

import Template from '@/app/template';
import Navbar from '@/components/layout/Navbar';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { Toaster } from '@/components/ui/sonner';
import { env } from '@/lib/env';

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const clerkLocalizations: Record<string, typeof enUS> = {
  en: enUS,
  pl: plPL,
};

export const viewport: Viewport = {
  themeColor: '#171717',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Converso | Real-time AI Teaching Platform',
    template: '%s | Converso',
  },
  description:
    'Experience the future of education with Converso. Real-time AI teaching partners tailored to your learning style.',
  keywords: [
    'AI education',
    'online learning',
    'tutoring',
    'AI companions',
    'Converso',
    'education platform',
  ],
  authors: [{ name: 'Converso Team' }],
  creator: 'Converso Team',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Converso',
    title: 'Converso | Real-time AI Teaching Platform',
    description:
      'Experience the future of education with Converso. Real-time AI teaching partners tailored to your learning style.',
  },
};

export const clerkAppearance = {
  layout: {
    unsafe_disableDevelopmentModeWarnings: true,
  },
  variables: {
    colorPrimary: '#171717',
    colorBackground: '#ffffff',
    colorInputBackground: '#ffffff',
    colorText: '#171717',
    colorTextSecondary: '#6b7280',
    fontFamily: 'var(--font-bricolage)',
    borderRadius: '12px',
  },
  elements: {
    rootBox: '!w-full !flex !justify-center !items-center',
    cardBox:
      '!rounded-[24px] !border !border-black !shadow-none !bg-white !p-6 !w-full !max-w-[1000px]',
    card: '!border-0 !shadow-none !bg-transparent',
    headerTitle: '!font-bold !text-2xl !text-black',
    formButtonPrimary:
      '!bg-[#171717] !text-white !rounded-[24px] !shadow-none !text-base !font-medium !h-[42px]',
    socialButtonsBlockButton:
      '!rounded-[24px] !border !border-black !bg-white !text-black !shadow-none !h-[42px] !font-medium',
    socialButtonsBlockButtonText: '!font-medium !text-sm',
    formFieldInput:
      '!rounded-[24px] !border !border-black !bg-white !focus:ring-0 !focus:border-black !min-h-[42px] !text-base !px-4',
    formFieldLabel: '!text-black !font-medium !text-sm',
    formFieldLabelRow: '!mb-1',
    footer: '!bg-none',
    lastAuthenticationStrategyBadge:
      '!bg-black !text-white !rounded-[24px] !text-xs !px-2 !py-1 !font-medium !inline-flex !items-center !justify-center',
    userButtonPopoverCard:
      '!rounded-[24px] !border !border-black !shadow-none !bg-white !overflow-hidden',
    userButtonPopoverMain: '!border-none !shadow-none',
    userButtonPopoverActions: '!bg-white !border-none !shadow-none',
    userButtonPopoverActionButton:
      '!rounded-[12px] !border-none !shadow-none hover:!bg-gray-100 !text-black',
    userButtonPopoverActionButtonText: '!font-medium !text-sm',
    userButtonPopoverActionButtonIcon: '!text-black',
    userButtonPopoverFooter: '!bg-white !border-t !border-gray-200',
    userPreviewMainIdentifier: '!font-semibold !text-black',
    userPreviewSecondaryIdentifier: '!text-gray-500 !text-sm',
    modalContent:
      '!rounded-[24px] !border !border-black !shadow-none !bg-white !overflow-hidden !w-full !max-w-[1000px] !mx-[16px]',
    modalCloseButton: '!rounded-full !text-black hover:!bg-gray-100',
    navbar: '!bg-white !border-r !border-gray-200 !rounded-l-[12px]',
    navbarButton:
      '!rounded-[12px] !text-black hover:!bg-gray-100 data-[active=true]:!bg-gray-100',
    navbarButtonIcon: '!text-black',
    pageScrollBox: '!bg-white !rounded-[12px]',
    page: '!bg-white',
    profilePage: '!bg-white',
    profileSectionTitle: '!font-semibold !text-black !text-lg',
    profileSectionTitleText: '!font-semibold !text-black',
    profileSectionContent: '!bg-white',
    profileSectionPrimaryButton:
      '!bg-[#171717] !text-white !rounded-[24px] !shadow-none !font-medium !w-fit',
    accordionTriggerButton: '!rounded-[12px] hover:!bg-gray-100 !text-black',
    accordionContent: '!bg-white',
    formFieldSuccessText: '!text-green-600',
    tabButton:
      '!rounded-[24px] !text-black !font-medium !border-0 !shadow-none data-[active=true]:!bg-black data-[active=true]:!text-white !px-4 !py-2',
    tabListContainer: '!border-0 !gap-2',
    tabPanel: '!bg-white',
    badge:
      '!bg-black !text-white !rounded-[24px] !text-xs !px-3 !py-1 !font-medium !border-0 !w-fit',
    tagInputContainer: '!rounded-[24px] !border !border-black !bg-white',
    tagPillContainer:
      '!bg-black !text-white !rounded-[24px] !text-xs !px-2 !py-1',
    button: '!rounded-[24px] !shadow-none !font-medium',
    buttonPrimary: '!bg-[#171717] !text-white !rounded-[24px] !shadow-none',
    buttonArrowIcon: '!text-current',
    avatarBox: '!rounded-full !border !border-black',
    userButtonAvatarBox: '!rounded-full !border !border-black',
    navbarMobileMenuRow: '!rounded-t-[12px]',
    activeDevice: '!flex !flex-col !gap-1',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <ClerkProvider
      appearance={clerkAppearance}
      publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      localization={clerkLocalizations[locale] ?? enUS}
    >
      <html lang={locale}>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />

          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />

          <link rel="dns-prefetch" href="https://clerk.com" />
          <link rel="preconnect" href="https://clerk.com" />
        </head>

        <body
          className={`${bricolage.variable} flex min-h-screen flex-col antialiased`}
        >
          <NextIntlClientProvider messages={messages}>
            <Suspense fallback={null}>
              <Navbar />

              <main className="flex-1">
                <Template>{children}</Template>
              </main>

              <ScrollToTop />
              <Toaster />
            </Suspense>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
