"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Organic Cumin Seeds",
    price: 8.99,
    image: "/images/products/cumin.jpg",
    category: "Spices",
  },
  {
    id: 2,
    name: "Smoked Paprika",
    price: 9.49,
    image: "/images/products/paprika.jpg",
    category: "Spices",
  },
  {
    id: 3,
    name: "Premium Saffron",
    price: 24.99,
    image: "/images/products/saffron.jpg",
    category: "Special",
  },
  {
    id: 4,
    name: "Golden Turmeric",
    price: 7.99,
    image: "/images/products/turmeric.jpg",
    category: "Spices",
  },
  {
    id: 5,
    name: "Ceylon Cinnamon",
    price: 11.99,
    image: "/images/products/cinnamon.jpg",
    category: "Spices",
  },
  {
    id: 6,
    name: "Italian Herb Blend",
    price: 12.49,
    image: "/images/products/herb-blend.jpg",
    category: "Blends",
  },
]

export function ProductsSection() {
  return (
    <section id="products" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            Our Products
          </h2>
          <p className="mt-4 text-muted-foreground">
            Discover our collection of premium spices, herbs, and blends.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-background/90 backdrop-blur-sm rounded-full text-foreground">
                  {product.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {product.name}
                </h3>
                <p className="text-xl font-bold text-primary mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition-all"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-border hover:bg-muted px-8 py-6 text-base font-semibold rounded-xl"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
