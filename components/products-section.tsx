'use client'

import Image from 'next/image'
import Link from 'next/link'
import {useLocale, useTranslations} from 'next-intl'
import {Button} from '@/components/ui/button'
import {ShoppingBag} from 'lucide-react'
import {useCart} from '@/context/cart-context'
import {products} from '@/lib/products'

const FEATURED_COUNT = 6

export function ProductsSection() {
  const {addToCart} = useCart()
  const t = useTranslations('products')
  const locale = useLocale()

  return (
    <section id="products" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">{t('title')}</h2>
          <p className="mt-4 text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.slice(0, FEATURED_COUNT).map(product => (
            <div key={product.id} className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-background/90 backdrop-blur-sm rounded-full text-foreground">
                  {product.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground mb-1">{product.name}</h3>
                <p className="text-xl font-bold text-primary mb-4">${product.price.toFixed(2)}</p>
                <Button onClick={() => addToCart(product)} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition-all">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  {t('addToCart')}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href={`/${locale}/products`}>
            <Button variant="outline" size="lg" className="border-border hover:bg-muted px-8 py-6 text-base font-semibold rounded-xl">
              {t('viewAll')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
