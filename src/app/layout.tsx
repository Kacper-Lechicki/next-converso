import type { Metadata } from 'next';
import { Bricolage_Grotesque } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import '@/styles/globals.css';

import favicon from '@/assets/favicon.ico';
import Navbar from '@/components/layout/Navbar';

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Converso',
  description: 'Real-time AI Teaching Platform',
  icons: {
    icon: favicon.src,
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
    <html lang={locale}>
      <body
        className={`${bricolage.variable} flex min-h-screen flex-col antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex flex-1 flex-col">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
