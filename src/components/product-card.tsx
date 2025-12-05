import { Link } from "react-router-dom"
import { Star } from "lucide-react"
import type { Product } from "@/lib/api"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1">
        {/* Image Container */}
        <div className="aspect-square bg-secondary/30 p-6 relative overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-tight">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium">{product.rating.rate}</span>
            </div>
            <span className="text-xs text-muted-foreground">({product.rating.count} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
            <span className="text-xs text-primary font-medium px-3 py-1 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              View Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

