'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShoppingCart} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from '@/components/ui/sheet';
import {useCart} from '@/context/cart-context';

const SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 5;

export function MiniCart() {
  const {items, removeFromCart, updateQuantity, itemCount, subtotal} = useCart();
  const t = useTranslations('miniCart');
  const locale = useLocale();

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const progressPct = Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-muted">
          <ShoppingBag className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          )}
          <span className="sr-only">Shopping cart</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0 gap-0">
        <SheetHeader className="px-5 py-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-base font-bold">
            <ShoppingCart className="h-4 w-4" />
            {t('title')}
            {itemCount > 0 && (
              <span className="ml-1 text-xs font-medium text-muted-foreground">
                ({t('items_other', {count: itemCount})})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-5 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="h-7 w-7 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{t('empty')}</p>
              <p className="text-sm text-muted-foreground mt-1">{t('emptyDesc')}</p>
            </div>
            <SheetClose asChild>
              <Link href={`/${locale}/products`}>
                <Button className="rounded-xl mt-2">{t('browseProducts')}</Button>
              </Link>
            </SheetClose>
          </div>
        ) : (
          <>
            {subtotal < SHIPPING_THRESHOLD && (
              <div className="px-5 py-3 bg-muted/50 border-b border-border">
                <p className="text-xs text-muted-foreground mb-1.5">
                  {t('freeShippingProgress', {amount: `$${(SHIPPING_THRESHOLD - subtotal).toFixed(2)}`})}
                </p>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{width: `${progressPct}%`}}
                  />
                </div>
              </div>
            )}
            {subtotal >= SHIPPING_THRESHOLD && (
              <div className="px-5 py-2.5 bg-green-50 dark:bg-green-950/30 border-b border-border">
                <p className="text-xs font-medium text-green-700 dark:text-green-400">{t('freeShippingUnlocked')}</p>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 items-start">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                    <Image src={item?.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                    <p className="text-sm font-semibold text-foreground leading-tight truncate">{item.name}</p>
                    {item.variant_name && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.variant_name}
                        {item.variant_unit && item.variant_unit_value
                          ? ` · ${item.variant_unit_value}${item.variant_unit}`
                          : ''}
                      </p>
                    )}
                    <p className="text-sm font-bold text-primary mt-0.5">${(item.price * item.quantity).toFixed(2)}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 rounded-md"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 rounded-md"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive flex-shrink-0"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>

            <SheetFooter className="px-5 pt-4 pb-6 border-t border-border gap-3">
              <div className="w-full flex flex-col gap-2 text-sm mb-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('subtotal')}</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('shipping')}</span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-medium">{t('free')}</span>
                  ) : (
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  )}
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-base text-foreground">
                  <span>{t('total')}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <SheetClose asChild>
                <Link href={`/${locale}/checkout`} className="w-full">
                  <Button className="w-full py-5 text-sm font-semibold rounded-xl">
                    {t('checkout', {total: `$${total.toFixed(2)}`})}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={`/${locale}/cart`} className="w-full">
                  <Button variant="outline" className="w-full rounded-xl">
                    {t('viewCart')}
                  </Button>
                </Link>
              </SheetClose>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
