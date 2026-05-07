'use client';

import {useState, useEffect} from 'react';
import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {ArrowRight} from 'lucide-react';
import {Header} from '@/components/header';
import {Footer} from '@/components/footer';
import {Skeleton} from '@/components/ui/skeleton';
import {supabase, type MenuCategory} from '@/lib/supabase';

const FALLBACK_GRADIENTS = [
  'from-amber-900/80 via-amber-700/40',
  'from-emerald-900/80 via-emerald-700/40',
  'from-rose-900/80 via-rose-700/40',
  'from-violet-900/80 via-violet-700/40',
  'from-sky-900/80 via-sky-700/40',
  'from-orange-900/80 via-orange-700/40',
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('categories');
  const locale = useLocale();

  useEffect(() => {
    supabase
      .from('menu_categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', {ascending: true})
      .then(({data}) => {
        if (data) setCategories(data as MenuCategory[]);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      <div
        className="relative border-b border-border py-16 lg:py-24 overflow-hidden"
        style={{backgroundImage: 'url(/images/hero-spices.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">{t('title')}</h1>
          <p className="mt-2 text-white/75 max-w-xl">{t('subtitle')}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({length: 6}).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] rounded-2xl" />
            ))}
          </div>
        )}
        {!loading && categories.length === 0 && (
          <div className="py-24 text-center text-muted-foreground">{t('noCategories')}</div>
        )}
        {!loading && categories.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/${locale}/products?category=${cat.id}`}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted block"
              >
                <div
                  className={`absolute inset-0 to-transparent bg-cover bg-center`}
                  style={{backgroundImage: `url('${cat?.img_url}')`}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-2xl font-bold text-white mb-1">{locale == 'de' ? cat.name : cat.alt_name}</h2>
                  {cat.description && <p className="text-sm text-white/80 mb-3 line-clamp-2">{cat.description}</p>}
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-white/90 group-hover:gap-2 transition-all">
                    {t('browse')}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
