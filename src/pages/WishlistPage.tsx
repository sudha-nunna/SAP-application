import { Link } from "react-router-dom"
import { useWishlist } from "@/components/cart-context"
import { BackButton } from "@/components/back-button"

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="max-w-5xl mx-auto py-24 px-4">
        <h2 className="text-2xl font-semibold">Your Wishlist</h2>
        <p className="mt-8 text-muted-foreground">Your wishlist is empty.</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="mb-6">
        <BackButton href="/products" label="Back to Products" />
      </div>
      <h2 className="text-2xl font-semibold">Your Wishlist</h2>

      <ul className="mt-6 space-y-4">
        {wishlist.map((p) => (
          <li key={p.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
            <img src={p.image} alt={p.title} className="w-24 h-24 object-contain" />
            <div className="flex-1">
              <Link to={`/products/${p.id}`} className="font-medium hover:underline">
                {p.title}
              </Link>
              <div className="text-sm text-muted-foreground">${p.price.toFixed(2)}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => removeFromWishlist(p.id)}
                className="px-3 py-1 rounded-md bg-red-600 text-white"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

