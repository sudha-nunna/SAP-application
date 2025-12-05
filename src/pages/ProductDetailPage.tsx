import { useParams } from "react-router-dom"
import useSWR from "swr"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import { fetchProductById, type Product } from "@/lib/api"
import { BackButton } from "@/components/back-button"
import { PageLoader } from "@/components/loader"
import { ErrorMessage } from "@/components/error-message"
import { Button } from "@/components/ui/button"
import { useCart, useWishlist } from "@/components/cart-context"

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()

  const { data: product, error, isLoading, mutate } = useSWR<Product>(
    id ? `product-${id}` : null,
    () => (id ? fetchProductById(id) : Promise.reject(new Error("No product ID")))
  )

  if (isLoading) {
    return <PageLoader />
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ErrorMessage
          title="Product not found"
          message="We couldn't find the product you're looking for. It may have been removed or doesn't exist."
          onRetry={() => mutate()}
        />
      </div>
    )
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating)
            ? "fill-amber-400 text-amber-400"
            : i < rating
              ? "fill-amber-400/50 text-amber-400"
              : "text-muted"
        }`}
      />
    ))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <BackButton href="/products" label="Back to Products" />
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative">
          <div className="sticky top-24">
            <div className="bg-card rounded-2xl border border-border p-8 lg:p-12">
              <div className="aspect-square relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            {/* Category Badge */}
            <span className="absolute top-4 left-4 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full capitalize">
              {product.category}
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Title & Price */}
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight text-balance">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex">{renderStars(product.rating.rate)}</div>
              <span className="font-semibold text-foreground">{product.rating.rate}</span>
              <span className="text-muted-foreground">({product.rating.count} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
              <span className="text-lg text-muted-foreground line-through">${(product.price * 1.2).toFixed(2)}</span>
              <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">Save 20%</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <AddCartButtons product={product} />
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t border-border">
            <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl">
              <Truck className="h-6 w-6 text-primary shrink-0" />
              <div>
                <p className="font-medium text-sm text-foreground">Free Shipping</p>
                <p className="text-xs text-muted-foreground">Orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl">
              <Shield className="h-6 w-6 text-primary shrink-0" />
              <div>
                <p className="font-medium text-sm text-foreground">Secure Payment</p>
                <p className="text-xs text-muted-foreground">100% protected</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl">
              <RotateCcw className="h-6 w-6 text-primary shrink-0" />
              <div>
                <p className="font-medium text-sm text-foreground">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30-day policy</p>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="pt-6 border-t border-border">
            <h3 className="font-semibold text-foreground mb-4">Product Information</h3>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-muted-foreground">Category</dt>
                <dd className="font-medium capitalize">{product.category}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Product ID</dt>
                <dd className="font-medium">#{product.id}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Availability</dt>
                <dd className="font-medium text-accent">In Stock</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Rating</dt>
                <dd className="font-medium">{product.rating.rate} / 5</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

function AddCartButtons({ product }: { product: Product }) {
  const { cart, addToCart, removeFromCart } = useCart()
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()

  const inCart = cart.some((c) => c.id === product.id)
  const inWishlist = wishlist.some((w) => w.id === product.id)

  const handleAdd = () => {
    if (!inCart) addToCart(product)
  }
  const handleRemove = () => {
    if (inCart) removeFromCart(product.id)
  }

  const handleWishlistToggle = () => {
    if (inWishlist) removeFromWishlist(product.id)
    else addToWishlist(product)
  }

  return (
    <>
      <Button
        size="lg"
        className={"flex-1 gap-2 text-base " + (inCart ? "bg-emerald-600 text-white" : "")}
        onClick={inCart ? handleRemove : handleAdd}
        aria-pressed={inCart}
      >
        <ShoppingCart className="h-5 w-5" />
        {inCart ? "Added in Cart" : "Add to Cart"}
      </Button>

      <div>
        <Button
          size="lg"
          variant={inWishlist ? undefined : "outline"}
          className={"gap-2 " + (inWishlist ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-transparent")}
          onClick={handleWishlistToggle}
        >
          <Heart className={inWishlist ? "h-5 w-5 text-white fill-white" : "h-5 w-5"} />
          {inWishlist ? "Wishlisted" : "Wishlist"}
        </Button>
      </div>

      <Button size="lg" variant="outline" className="gap-2 bg-transparent">
        <Share2 className="h-5 w-5" />
      </Button>
    </>
  )
}

