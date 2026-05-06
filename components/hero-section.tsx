'use client'

import Image from 'next/image'
import Link from 'next/link'
import {useLocale, useTranslations} from 'next-intl'
import {Button} from '@/components/ui/button'

export function HeroSection() {
  const t = useTranslations('hero')
  const locale = useLocale()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/50 to-background">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight text-balance">
              {t('title')}{' '}
              <span className="text-primary">{t('titleAccent')}</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t('subtitle')}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={`/${locale}/products`}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-semibold rounded-xl shadow-lg shadow-primary/20">
                  {t('shopNow')}
                </Button>
              </Link>
              <Link href={`/${locale}/story`}>
                <Button variant="outline" size="lg" className="border-border hover:bg-muted px-8 py-6 text-base font-semibold rounded-xl">
                  {t('learnMore')}
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/images/hero-spices.jpg" alt="Premium spices" fill className="object-cover" priority />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
