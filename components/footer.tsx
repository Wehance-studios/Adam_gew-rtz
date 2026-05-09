'use client';

import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {Instagram, Facebook, Twitter} from 'lucide-react';

const socialLinks = [
  {name: 'Instagram', icon: Instagram, href: '#'},
  {name: 'Facebook', icon: Facebook, href: '#'},
  {name: 'Twitter', icon: Twitter, href: '#'},
];

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const year = new Date().getFullYear();

  const footerLinks = {
    shop: [
      {key: 'allProducts', href: `/${locale}/products`},
      {key: 'spices', href: `/${locale}/products?category=a196b6f9-94f0-44d3-b029-54a220dfd26f`},
      {key: 'herbs', href: `/${locale}/products?category=5cf05250-492f-42a2-b73b-858d79e44dd5`},
      {key: 'blends', href: `/${locale}/products?category=9ede5930-9e6b-4cd5-8a1d-cd71d26a585e`},
    ],
    company: [
      {key: 'about', href: '#'},
      {key: 'ourStory', href: `/${locale}/story`},
      {key: 'sustainability', href: '#'},
      {key: 'contact', href: `/${locale}/contact`},
    ],
    support: [
      {key: 'faq', href: '#'},
      {key: 'shipping', href: '#'},
      {key: 'returns', href: '#'},
      {key: 'trackOrder', href: '#'},
    ],
  };

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href={`/${locale}`} className="inline-block">
              <span className="text-xl font-bold text-foreground tracking-tight">Adam Gewürz</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{t('tagline')}</p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map(social => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {(['shop', 'company'] as const).map(section => (
            <div key={section}>
              <h3 className="text-sm font-semibold text-foreground mb-4">{t(section)}</h3>
              <ul className="space-y-3">
                {footerLinks[section].map(link => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t(`links.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {year} Earthy Spice Co. {t('copyright')}
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t('privacy')}
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
