import {Header} from '@/components/header'
import {HeroSection} from '@/components/hero-section'
import {FeaturesSection} from '@/components/features-section'
import {ProductsSection} from '@/components/products-section'
import {CategoriesSection} from '@/components/categories-section'
import {StorySection} from '@/components/story-section'
import {CtaBanner} from '@/components/cta-banner'
import {Footer} from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ProductsSection />
      <CategoriesSection />
      <StorySection />
      <CtaBanner />
      <Footer />
    </main>
  )
}
