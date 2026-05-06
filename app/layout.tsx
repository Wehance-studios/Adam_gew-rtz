import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {Analytics} from '@vercel/analytics/next';
import {getLocale} from 'next-intl/server';
import {CartProvider} from '@/context/cart-context';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Earthy Spice Co. | Pure Spices. Real Flavor.',
  description:
    'Premium natural spices, herbs, and blends sourced from the finest farms. Experience authentic flavor in every dish.',
  icons: {
    icon: [
      {url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)'},
      {url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)'},
      {url: '/icon.svg', type: 'image/svg+xml'},
    ],
    apple: '/apple-icon.png',
  },
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const locale = await getLocale();
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        <CartProvider>{children}</CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
