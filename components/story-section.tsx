import Image from "next/image"
import { Button } from "@/components/ui/button"

export function StorySection() {
  return (
    <section id="story" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/story-origin.jpg"
                alt="Spice farm and harvesting"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 lg:bottom-8 lg:-right-8 bg-card p-6 rounded-2xl shadow-xl border border-border">
              <div className="text-3xl font-bold text-primary">25+</div>
              <div className="text-sm text-muted-foreground">Years of Excellence</div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-lg">
            <span className="inline-block px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
              Our Story
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight">
              From Farm to Your Kitchen
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              For over two decades, we&apos;ve been partnering directly with farmers 
              across India, Morocco, and beyond. Our commitment to authenticity 
              means every spice is sourced at its origin, ensuring the purest 
              flavors reach your table.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We believe in sustainable practices and fair trade relationships, 
              supporting communities while bringing you the finest spices nature 
              has to offer.
            </p>
            <div className="mt-8 flex flex-wrap gap-8">
              <div>
                <div className="text-2xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Partner Farms</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">12</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">100K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
            </div>
            <Button
              size="lg"
              variant="outline"
              className="mt-8 border-border hover:bg-muted px-8 py-6 text-base font-semibold rounded-xl"
            >
              Read Our Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
