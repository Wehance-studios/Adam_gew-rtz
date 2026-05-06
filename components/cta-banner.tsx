'use client'

import Link from 'next/link'
import {useLocale, useTranslations} from 'next-intl'
import {Button} from '@/components/ui/button'
import {ArrowRight} from 'lucide-react'

export function CtaBanner() {
  const t = useTranslations('cta')
  const locale = useLocale()

  return (
    <section className="py-16 lg:py-24 bg-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-background tracking-tight leading-tight text-balance">
            {t('title')}
          </h2>
          <p className="mt-6 text-lg text-background/70 max-w-xl mx-auto">{t('subtitle')}</p>
          <Link href={`/${locale}/products`}>
            <Button size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-semibold rounded-xl shadow-lg transition-all hover:shadow-xl">
              {t('explore')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
