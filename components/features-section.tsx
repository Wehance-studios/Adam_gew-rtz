'use client'

import {useTranslations} from 'next-intl'
import {Leaf, Package, ShieldCheck, Award} from 'lucide-react'

const icons = [Leaf, Package, ShieldCheck, Award]
const keys = ['natural', 'packed', 'noAdditives', 'premium'] as const

export function FeaturesSection() {
  const t = useTranslations('features')

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">{t('title')}</h2>
          <p className="mt-4 text-muted-foreground">{t('subtitle')}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keys.map((key, i) => {
            const Icon = icons[i]
            return (
              <div key={key} className="group p-6 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{t(`items.${key}.title`)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(`items.${key}.desc`)}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
