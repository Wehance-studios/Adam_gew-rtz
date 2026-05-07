'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {ArrowRight} from 'lucide-react';

const categories = [
  {name: 'Spices', alt_name: '', image: '/images/categories/spices.jpg'},
  {name: 'Herbs', alt_name: '', image: '/images/categories/herbs.jpg'},
  {name: 'Blends', alt_name: '', image: '/images/categories/blends.jpg'},
  {name: 'Special Mixes', alt_name: '', image: '/images/categories/mixes.jpg'},
];

export function CategoriesSection() {
  const t = useTranslations('categories');
  const locale = useLocale();

  return (
    <section id="categories" className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">{t('title')}</h2>
          <p className="mt-4 text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <Link
              key={category.name}
              href={`/${locale}/categories`}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden"
            >
              <Image
                src={category?.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-1">
                  {locale === 'de' ? category.name : category.alt_name}
                </h3>
                <span className="inline-flex items-center text-sm font-medium text-white group-hover:gap-2 transition-all">
                  {t('explore')}
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
