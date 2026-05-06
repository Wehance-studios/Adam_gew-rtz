'use client'

import {useTransition} from 'react'
import {useLocale} from 'next-intl'
import {usePathname, useRouter} from 'next/navigation'

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function switchLocale(next: string) {
    if (next === locale) return
    const segments = pathname.split('/')
    segments[1] = next
    startTransition(() => {
      router.replace(segments.join('/'))
    })
  }

  return (
    <div
      className={`flex items-center gap-1 rounded-full border border-border px-1 py-0.5 transition-opacity ${
        isPending ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      {(['de', 'ar'] as const).map(lang => (
        <button
          key={lang}
          onClick={() => switchLocale(lang)}
          className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
            locale === lang
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
