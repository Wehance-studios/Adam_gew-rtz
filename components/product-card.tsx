'use client';

import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {ShoppingBag} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {type MenuItem, type ProductVariant} from '@/lib/supabase';

type Props = {
  item: MenuItem;
  selected: ProductVariant | null;
  isAdded: boolean;
  onSelectVariant: (variant: ProductVariant) => void;
  onAddToCart: () => void;
};

export function ProductCard({item, selected, isAdded, onSelectVariant, onAddToCart}: Props) {
  const t = useTranslations('products');
  const activeVariants = (item.product_variants ?? []).filter(v => v.is_active);
  const price = selected ? (selected.unit_price ?? selected.price ?? item.price) : item.price;

  return (
    <div className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-muted-foreground opacity-30" />
          </div>
        )}
        {item.menu_categories?.name && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium bg-background/90 backdrop-blur-sm rounded-full text-foreground">
            {item.menu_categories.name}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-semibold text-foreground mb-1 leading-snug">{item.name}</h3>
        {item.description && (
          <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-3 line-clamp-2">{item.description}</p>
        )}

        {activeVariants.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {activeVariants.map(v => (
              <button
                key={v.id}
                onClick={() => onSelectVariant(v)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                  selected?.id === v.id
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {v.name}
                {/* {v.unit && v.unit_value ? ` · ${v.unit_value}` : ''} */}
              </button>
            ))}
          </div>
        )}

        <p className="text-xl font-bold text-primary mb-4">${price.toFixed(2)}</p>

        <Button
          onClick={onAddToCart}
          className={`w-full rounded-xl font-medium transition-all ${
            isAdded
              ? 'bg-green-600 hover:bg-green-600 text-white'
              : 'bg-primary hover:bg-primary/90 text-primary-foreground'
          }`}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          {isAdded ? t('added') : t('addToCart')}
        </Button>
      </div>
    </div>
  );
}
