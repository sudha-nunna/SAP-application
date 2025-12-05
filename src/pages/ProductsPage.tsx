import { useState } from "react"
import useSWR from "swr"
import { Search, Filter, Grid, List } from "lucide-react"
import { fetchProducts, fetchCategories, type Product } from "@/lib/api"
import { ProductCard } from "@/components/product-card"
import { ProductGridSkeleton } from "@/components/loader"
import { ErrorMessage } from "@/components/error-message"
import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [displayCount, setDisplayCount] = useState(8)

  const {
    data: products,
    error: productsError,
    isLoading: productsLoading,
    mutate,
  } = useSWR<Product[]>("products", fetchProducts)

  const { data: categories } = useSWR<string[]>("categories", fetchCategories)

  // Filter products based on search and category
  const filteredProducts = products?.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Get products to display (paginated)
  const displayedProducts = filteredProducts?.slice(0, displayCount) || []
  const hasMore = filteredProducts ? filteredProducts.length > displayCount : false
  const canShowLess = displayCount > 8

  const handleViewMore = () => {
    setDisplayCount((prev) => prev + 8)
  }

  const handleViewLess = () => {
    setDisplayCount((prev) => Math.max(8, prev - 8))
  }

  if (productsError) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ErrorMessage
          title="Failed to load products"
          message="We couldn't fetch the products. Please check your connection and try again."
          onRetry={() => mutate()}
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">All Products</h1>
        <p className="text-muted-foreground">Discover our collection of {products?.length || 0} amazing products</p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className="shrink-0"
          >
            <Filter className="h-4 w-4 mr-2" />
            All
          </Button>
          {categories?.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="capitalize shrink-0"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="hidden lg:flex gap-1 bg-secondary rounded-lg p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2 rounded-md transition-colors",
              viewMode === "grid" ? "bg-card shadow-sm" : "hover:bg-card/50",
            )}
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-2 rounded-md transition-colors",
              viewMode === "list" ? "bg-card shadow-sm" : "hover:bg-card/50",
            )}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Results Info */}
      {!productsLoading && filteredProducts && (
        <p className="text-sm text-muted-foreground mb-6">
          Showing {displayedProducts.length} of {filteredProducts.length} products
          {selectedCategory && <span className="capitalize"> in {selectedCategory}</span>}
          {searchQuery && <span> matching "{searchQuery}"</span>}
        </p>
      )}

      {/* Products Grid */}
      {productsLoading ? (
        <ProductGridSkeleton />
      ) : filteredProducts?.length === 0 ? (
        <EmptyState
          title="No products found"
          message="Try adjusting your search or filter to find what you're looking for."
          actionLabel="Clear Filters"
          actionHref="/products"
        />
      ) : (
        <>
          <div
            className={cn(
              "gap-6 mb-8",
              viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "flex flex-col",
            )}
          >
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {/* View More / View Less Buttons */}
          {(hasMore || canShowLess) && (
            <div className="flex justify-center gap-4 mt-8">
              {canShowLess && (
                <Button
                  onClick={handleViewLess}
                  size="lg"
                  variant="outline"
                  className="gap-2"
                >
                  View Less
                </Button>
              )}
              {hasMore && (
                <Button
                  onClick={handleViewMore}
                  size="lg"
                  variant="outline"
                  className="gap-2"
                >
                  View More Products
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

