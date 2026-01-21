import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Bricolage_Grotesque } from 'next/font/google';
import { Suspense } from 'react';

import '@/styles/globals.css';

import Template from '@/app/template';
import Navbar from '@/components/layout/Navbar';

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <Suspense fallback={null}>
      <NextIntlClientProvider messages={messages}>
        <ClerkProvider appearance={{ variables: { colorPrimary: '#171717' } }}>
          <html lang={locale}>
            <head>
              <link
                rel="preconnect"
                href="https://fonts.googleapis.com"
                crossOrigin="anonymous"
              />

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
              <Navbar />

              <main className="flex-1">
                <Template>{children}</Template>
              </main>
            </body>
          </html>
        </ClerkProvider>
      </NextIntlClientProvider>
    </Suspense>
  );
}
