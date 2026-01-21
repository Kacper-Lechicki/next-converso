import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Bricolage_Grotesque } from 'next/font/google';
import { Suspense } from 'react';

import '@/styles/globals.css';

import Template from '@/app/template';
import favicon from '@/assets/favicon.ico';
import Navbar from '@/components/layout/Navbar';

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

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
    icon: favicon.src,
    apple: favicon.src,
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
      <ClerkProvider appearance={{ variables: { colorPrimary: '#171717' } }}>
        <html lang={locale}>
          <body
            className={`${bricolage.variable} flex min-h-screen flex-col antialiased`}
          >
            <NextIntlClientProvider messages={messages}>
              <Navbar />

              <main className="flex-1">
                <Template>{children}</Template>
              </main>
            </NextIntlClientProvider>
          </body>
        </html>
      </ClerkProvider>
    </Suspense>
  );
}
