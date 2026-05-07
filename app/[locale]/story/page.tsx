'use client'

import Image from 'next/image'
import Link from 'next/link'
import {useLocale, useTranslations} from 'next-intl'
import {Leaf, Award, Globe, Heart} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Header} from '@/components/header'
import {Footer} from '@/components/footer'

const valueIcons = [Leaf, Award, Globe, Heart]
const valueKeys = ['sustainable', 'quality', 'global', 'community'] as const
const milestoneYears = ['2014', '2016', '2019', '2022', '2024'] as const

export default function StoryPage() {
  const t = useTranslations('storyPage')
  const locale = useLocale()

  return (
    <main className="min-h-screen">
      <Header />

      <section
        className="relative border-b border-border overflow-hidden"
        style={{backgroundImage: 'url(/images/hero-spices.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-28 max-w-3xl">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">{t('label')}</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">{t('heroTitle')}</h1>
          <p className="mt-6 text-lg text-white/75 leading-relaxed">{t('heroSubtitle')}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted">
              <Image src="/images/story/founder.jpg" alt={t('founderTitle')} fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">{t('founderTitle')}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{t('founderP1')}</p>
              <p className="text-muted-foreground leading-relaxed mb-4">{t('founderP2')}</p>
              <p className="text-muted-foreground leading-relaxed">{t('founderP3')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-foreground tracking-tight">{t('valuesTitle')}</h2>
            <p className="mt-3 text-muted-foreground">{t('valuesSubtitle')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueKeys.map((key, i) => {
              const Icon = valueIcons[i]
              return (
                <div key={key} className="bg-background rounded-2xl border border-border p-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{t(`values.${key}.title`)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(`values.${key}.body`)}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <h2 className="text-3xl font-bold text-foreground tracking-tight mb-10 text-center">{t('timelineTitle')}</h2>
          <ol className="relative border-l border-border ml-4 flex flex-col gap-10">
            {milestoneYears.map(year => (
              <li key={year} className="ml-8">
                <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-4 ring-background">
                  <span className="h-2 w-2 rounded-full bg-primary-foreground" />
                </span>
                <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">{year}</p>
                <p className="text-foreground">{t(`milestones.${year}`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-xl">
          <h2 className="text-3xl font-bold mb-4">{t('ctaTitle')}</h2>
          <p className="text-primary-foreground/80 mb-8">{t('ctaDesc')}</p>
          <Link href={`/${locale}/products`}>
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-10 py-6 text-base font-semibold rounded-xl">
              {t('ctaButton')}
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
