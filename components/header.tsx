'use client'

import {useState} from 'react'
import Link from 'next/link'
import {useLocale, useTranslations} from 'next-intl'
import {usePathname} from 'next/navigation'
import {Menu, X} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {MiniCart} from '@/components/mini-cart'
import {LanguageSwitcher} from '@/components/language-switcher'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()

  const navLinks = [
    {label: t('shop'), href: `/${locale}/products`},
    {label: t('categories'), href: `/${locale}/categories`},
    {label: t('ourStory'), href: `/${locale}/story`},
    {label: t('contact'), href: `/${locale}/contact`},
  ]

  function navClass(href: string) {
    const isActive = pathname === href || pathname.startsWith(href + '/')
    return isActive
      ? 'text-sm font-medium text-foreground relative after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-primary'
      : 'text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground tracking-tight">
              <img src="/images/logo.png" className="w-20" alt="Adam Gewürz Logo" />
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({label, href}) => (
              <Link key={href} href={href} className={navClass(href)}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <MiniCart />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-muted"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map(({label, href}) => {
                const isActive = pathname === href || pathname.startsWith(href + '/')
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-sm font-medium transition-colors ${
                      isActive ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {label}
                  </Link>
                )
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
