'use client';

import {useState, useEffect} from 'react';
import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {Button} from '@/components/ui/button';
import {Skeleton} from '@/components/ui/skeleton';
import {useCart} from '@/context/cart-context';
import {ProductCard} from '@/components/product-card';
import {supabase, type MenuItem, type ProductVariant} from '@/lib/supabase';

const FEATURED_COUNT = 6;

function defaultVariant(variants: ProductVariant[]): ProductVariant | null {
  if (!variants?.length) return null;
  return variants.find(v => v.is_default && v.is_active) ?? variants.find(v => v.is_active) ?? variants[0];
}

export function ProductsSection() {
  const {addToCart} = useCart();
  const t = useTranslations('products');
  const locale = useLocale();

  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, ProductVariant>>({});
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    supabase
      .from('menu_items')
      .select('*, alt_name, menu_categories(name, alt_name), product_variants(*)')
      .eq('is_available', true)
      .order('name', {ascending: true})
      .limit(FEATURED_COUNT)
      .then(({data}) => {
        if (data) {
          const fetched = data as MenuItem[];
          setItems(fetched);
          setSelectedVariants(() => {
            const map: Record<string, ProductVariant> = {};
            for (const item of fetched) {
              const def = defaultVariant(item.product_variants ?? []);
              if (def) map[item.id] = def;
            }
            return map;
          });
        }
        setLoading(false);
      });
  }, []);

  function selectVariant(itemId: string, variant: ProductVariant) {
    setSelectedVariants(prev => ({...prev, [itemId]: variant}));
  }

  function handleAddToCart(item: MenuItem) {
    const variant = selectedVariants[item.id] ?? null;
    const price = variant ? (variant.unit_price ?? variant.price ?? item.price) : item.price;
    addToCart({
      id: item.id,
      name: item.name,
      price,
      image: item.image_url,
      category: item.menu_categories?.name ?? '',
      ...(variant && {
        variant_id: variant.id,
        variant_name: variant.name,
        variant_unit: variant.unit,
        variant_unit_value: variant.unit_value,
      }),
    });
    setAddedIds(prev => new Set(prev).add(item.id));
    setTimeout(() => {
      setAddedIds(prev => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }, 1500);
  }

  return (
    <section id="products" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">{t('title')}</h2>
          <p className="mt-4 text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {loading
            ? Array.from({length: FEATURED_COUNT}).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border overflow-hidden">
                  <Skeleton className="aspect-square w-full" />
                  <div className="p-5 flex flex-col gap-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-8 w-full mt-1" />
                    <Skeleton className="h-9 w-full mt-1" />
                  </div>
                </div>
              ))
            : items.map(item => (
                <ProductCard
                  key={item.id}
                  item={item}
                  selected={selectedVariants[item.id] ?? null}
                  isAdded={addedIds.has(item.id)}
                  onSelectVariant={variant => selectVariant(item.id, variant)}
                  onAddToCart={() => handleAddToCart(item)}
                />
              ))}
        </div>

        <div className="mt-12 text-center">
          <Link href={`/${locale}/products`}>
            <Button
              variant="outline"
              size="lg"
              className="border-border hover:bg-muted px-8 py-6 text-base font-semibold rounded-xl"
            >
              {t('viewAll')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
