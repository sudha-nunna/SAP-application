import { Link } from "react-router-dom"
import { ArrowRight, ShoppingBag, Truck, Shield, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: ShoppingBag,
    title: "Wide Selection",
    description: "Browse through thousands of products across multiple categories",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Get your orders delivered quickly and reliably",
  },
  {
    icon: Shield,
    title: "Secure Shopping",
    description: "Shop with confidence with our secure payment system",
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    description: "Multiple payment options for your convenience",
  },
]

const categories = [
  { name: "Electronics", image: "/modern-electronics.png" },
  { name: "Jewelry", image: "/elegant-gold-jewelry.jpg" },
  { name: "Men's Clothing", image: "/men-fashion-clothing.png" },
  { name: "Women's Clothing", image: "/diverse-women-fashion.png" },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                New arrivals every week
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
                Discover Products You'll <span className="text-primary">Love</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Explore our curated collection of premium products. From electronics to fashion, find everything you
                need in one place.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="gap-2 text-base">
                  <Link to="/products">
                    Browse Products
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base bg-transparent">
                  <Link to="/products">View Categories</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-4">
                <div>
                  <p className="text-3xl font-bold text-foreground">20+</p>
                  <p className="text-sm text-muted-foreground">Products</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">4</p>
                  <p className="text-sm text-muted-foreground">Categories</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">4.8</p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative lg:pl-8 hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
                <div className="relative bg-card rounded-3xl border border-border p-8 shadow-2xl">
                  <img src="/premium-shopping-products-collection.jpg" alt="Featured products" className="w-full h-auto rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose ShopFlow?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best shopping experience with quality products and excellent service.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="bg-card p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Shop by Category</h2>
              <p className="text-muted-foreground">Explore our diverse product categories</p>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex gap-2 bg-transparent">
              <Link to="/products">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to="/products"
                className="group relative overflow-hidden rounded-2xl bg-secondary/50 aspect-square"
              >
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-background">{category.name}</h3>
                  <p className="text-background/70 text-sm mt-1 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Shop now <ArrowRight className="h-4 w-4" />
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Button asChild className="w-full gap-2">
              <Link to="/products">
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Ready to Start Shopping?</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 text-lg">
            Browse our collection of premium products and find exactly what you're looking for.
          </p>
          <Button asChild size="lg" variant="secondary" className="gap-2 text-base">
            <Link to="/products">
              Explore Products
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

