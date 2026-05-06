'use client';

import {useState, useEffect, useCallback, useRef} from 'react';
import {useSearchParams} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {Search, X, Loader2, SlidersHorizontal} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Skeleton} from '@/components/ui/skeleton';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Header} from '@/components/header';
import {Footer} from '@/components/footer';
import {ProductCard} from '@/components/product-card';
import {useCart} from '@/context/cart-context';
import {supabase, type MenuItem, type MenuCategory, type ProductVariant} from '@/lib/supabase';

const PAGE_SIZE = 10;

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

function defaultVariant(variants: ProductVariant[]): ProductVariant | null {
  if (!variants?.length) return null;
  return variants.find(v => v.is_default && v.is_active) ?? variants.find(v => v.is_active) ?? variants[0];
}

export default function ProductsPage() {
  const {addToCart} = useCart();
  const t = useTranslations('shop');
  const searchParams = useSearchParams();

  const sortLabels: Record<SortOption, string> = {
    featured: t('sort.featured'),
    'price-asc': t('sort.priceAsc'),
    'price-desc': t('sort.priceDesc'),
    'name-asc': t('sort.nameAsc'),
  };

  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string>(searchParams.get('category') ?? 'all');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('featured');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  // tracks the selected variant id per menu item
  const [selectedVariants, setSelectedVariants] = useState<Record<string, ProductVariant>>({});
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce search → hits Supabase only after user stops typing
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedSearch(search), 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search]);

  // Load categories once
  useEffect(() => {
    supabase
      .from('menu_categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', {ascending: true})
      .then(({data}) => {
        if (data) setCategories(data as MenuCategory[]);
      });
  }, []);

  // Build and run the Supabase query — includes product_variants
  const fetchItems = useCallback(
    async (currentOffset: number, replace: boolean) => {
      if (replace) setLoading(true);
      else setLoadingMore(true);

      let query = supabase
        .from('menu_items')
        .select('*, alt_name,menu_categories(name), product_variants(*)', {count: 'exact'})
        .eq('is_available', true);

      if (activeCategoryId !== 'all') {
        query = query.eq('category_id', activeCategoryId);
      }

      if (debouncedSearch.trim()) {
        query = query.or(`name.ilike.%${debouncedSearch}%,description.ilike.%${debouncedSearch}%`);
      }

      switch (sort) {
        case 'price-asc':
          query = query.order('price', {ascending: true});
          break;
        case 'price-desc':
          query = query.order('price', {ascending: false});
          break;
        case 'name-asc':
          query = query.order('name', {ascending: true});
          break;
        default:
          query = query.order('name', {ascending: true});
      }

      query = query.range(currentOffset, currentOffset + PAGE_SIZE - 1);

      const {data, count, error} = await query;

      if (!error && data) {
        const fetched = data as MenuItem[];
        setItems(prev => (replace ? fetched : [...prev, ...fetched]));
        setHasMore(count !== null && currentOffset + PAGE_SIZE < count);
        setOffset(currentOffset + PAGE_SIZE);

        // Seed selected variants for new items (pick default)
        setSelectedVariants(prev => {
          const next = {...prev};
          for (const item of fetched) {
            if (!(item.id in next)) {
              const def = defaultVariant(item.product_variants ?? []);
              if (def) next[item.id] = def;
            }
          }
          return next;
        });
      }

      if (replace) setLoading(false);
      else setLoadingMore(false);
    },
    [activeCategoryId, debouncedSearch, sort],
  );

  // Re-fetch from scratch when filters change
  useEffect(() => {
    setOffset(0);
    setHasMore(true);
    fetchItems(0, true);
  }, [fetchItems]);

  function handleLoadMore() {
    fetchItems(offset, false);
  }

  function selectVariant(itemId: string, variant: ProductVariant) {
    setSelectedVariants(prev => ({...prev, [itemId]: variant}));
  }

  function effectivePrice(item: MenuItem): number {
    const v = selectedVariants[item.id];
    return v ? (v.unit_price ?? v.price ?? item.price) : item.price;
  }

  function handleAddToCart(item: MenuItem) {
    const variant = selectedVariants[item.id] ?? null;
    addToCart({
      id: item.id,
      name: item.name,
      price: effectivePrice(item),
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

  const hasFilters = debouncedSearch.trim() !== '' || activeCategoryId !== 'all';

  function clearFilters() {
    setSearch('');
    setActiveCategoryId('all');
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Page Hero */}
      <div className="bg-card border-b border-border py-10 lg:py-14">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">{t('title')}</h1>
          <p className="mt-2 text-muted-foreground max-w-xl">{t('subtitle')}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder={t('searchPlaceholder')}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 rounded-xl"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <Select value={sort} onValueChange={v => setSort(v as SortOption)}>
              <SelectTrigger className="w-48 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(sortLabels) as SortOption[]).map(key => (
                  <SelectItem key={key} value={key}>
                    {sortLabels[key]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          <button
            onClick={() => setActiveCategoryId('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeCategoryId === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategoryId === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              {cat.name}
            </button>
          ))}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 underline underline-offset-2"
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          )}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({length: PAGE_SIZE}).map((_, i) => (
              <div key={i} className="rounded-2xl border border-border overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <div className="p-5 flex flex-col gap-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-8 w-full mt-1" />
                  <Skeleton className="h-9 w-full mt-1" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && items.length === 0 && (
          <div className="py-24 flex flex-col items-center gap-4 text-center">
            <p className="text-lg font-semibold text-foreground">{t('noProducts')}</p>
            <p className="text-sm text-muted-foreground">{t('noProductsDesc')}</p>
            {hasFilters && (
              <Button variant="outline" onClick={clearFilters} className="mt-2 rounded-xl">
                {t('clearFilters')}
              </Button>
            )}
          </div>
        )}

        {/* Product grid */}
        {!loading && items.length > 0 && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map(item => (
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

            {/* Load More */}
            {hasMore && (
              <div className="mt-10 flex justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-10 py-6 rounded-xl text-base font-semibold"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('loading')}
                    </>
                  ) : (
                    t('loadMore')
                  )}
                </Button>
              </div>
            )}

            {!hasMore && items.length > PAGE_SIZE && (
              <p className="mt-10 text-center text-sm text-muted-foreground">{t('allLoaded', {count: items.length})}</p>
            )}
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}
