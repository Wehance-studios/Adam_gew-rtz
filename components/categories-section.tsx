import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Spices",
    description: "Pure whole and ground spices",
    image: "/images/categories/spices.jpg",
    href: "#",
  },
  {
    name: "Herbs",
    description: "Fresh and dried culinary herbs",
    image: "/images/categories/herbs.jpg",
    href: "#",
  },
  {
    name: "Blends",
    description: "Signature spice combinations",
    image: "/images/categories/blends.jpg",
    href: "#",
  },
  {
    name: "Special Mixes",
    description: "Exotic and rare selections",
    image: "/images/categories/mixes.jpg",
    href: "#",
  },
]

export function CategoriesSection() {
  return (
    <section id="categories" className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            Shop by Category
          </h2>
          <p className="mt-4 text-muted-foreground">
            Explore our carefully curated collection of spices and herbs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-white/80 mb-3">
                  {category.description}
                </p>
                <span className="inline-flex items-center text-sm font-medium text-white group-hover:gap-2 transition-all">
                  Explore
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
