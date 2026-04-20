import { Leaf, Package, ShieldCheck, Award } from "lucide-react"

const features = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "Pure ingredients with no artificial additives or preservatives",
  },
  {
    icon: Package,
    title: "Freshly Packed",
    description: "Sealed at peak freshness to lock in flavor and aroma",
  },
  {
    icon: ShieldCheck,
    title: "No Additives",
    description: "Free from fillers, colors, and artificial enhancers",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Hand-selected from the finest farms around the world",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            Why Choose Us
          </h2>
          <p className="mt-4 text-muted-foreground">
            We believe in bringing you the purest, most flavorful spices straight from the source.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
