import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['de', 'ar'],
  defaultLocale: 'de',
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
