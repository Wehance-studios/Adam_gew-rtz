'use client'

import Image from 'next/image'
import Link from 'next/link'
import {useLocale, useTranslations} from 'next-intl'
import {Minus, Plus, Trash2, ShoppingBag, ArrowRight} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Separator} from '@/components/ui/separator'
import {Header} from '@/components/header'
import {Footer} from '@/components/footer'
import {useCart} from '@/context/cart-context'

const SHIPPING_THRESHOLD = 50
const SHIPPING_COST = 4.99

export default function CartPage() {
  const {items, removeFromCart, updateQuantity, subtotal} = useCart()
  const t = useTranslations('cart')
  const locale = useLocale()

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 lg:px-8 py-24 flex flex-col items-center gap-6 text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground" />
          <h1 className="text-3xl font-bold text-foreground">{t('empty')}</h1>
          <p className="text-muted-foreground max-w-md">{t('emptyDesc')}</p>
          <Link href={`/${locale}/products`}>
            <Button className="mt-2 px-8 py-6 text-base font-semibold rounded-xl">{t('startShopping')}</Button>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">{t('title')}</h1>
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 bg-card border border-border rounded-2xl p-4 items-center">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium text-muted-foreground">{item.category}</span>
                  <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                  {item.variant_name && (
                    <p className="text-xs text-muted-foreground">
                      {item.variant_name}{item.variant_unit && item.variant_unit_value ? ` · ${item.variant_unit_value}${item.variant_unit}` : ''}
                    </p>
                  )}
                  <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="text-right min-w-[70px]">
                  <p className="font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive h-8 w-8" onClick={() => removeFromCart(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="mt-4">
              <Link href={`/${locale}/products`}>
                <Button variant="outline" className="rounded-xl">{t('continueShopping')}</Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-foreground mb-6">{t('orderSummary')}</h2>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('subtotal', {count: items.reduce((s, i) => s + i.quantity, 0)})}</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('shipping')}</span>
                  {shipping === 0 ? <span className="text-green-600 font-medium">{t('free')}</span> : <span className="font-medium">${shipping.toFixed(2)}</span>}
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground bg-muted rounded-lg px-3 py-2">
                    {t('freeShippingNote', {amount: `$${(SHIPPING_THRESHOLD - subtotal).toFixed(2)}`})}
                  </p>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between text-base font-bold text-foreground">
                  <span>{t('total')}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Link href={`/${locale}/checkout`}>
                <Button className="w-full mt-6 py-6 text-base font-semibold rounded-xl">
                  {t('proceedToCheckout')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <div className="mt-4 flex flex-col gap-2 text-xs text-muted-foreground text-center">
                <span>{t('secure')}</span>
                <span>{t('returns')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
