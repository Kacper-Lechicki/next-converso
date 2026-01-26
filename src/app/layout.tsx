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
import { clerkAppearance } from '@/config/clerk';
import { env } from '@/config/env';

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
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
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
