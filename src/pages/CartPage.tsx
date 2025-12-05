import { Link } from "react-router-dom"
import { useCart } from "@/components/cart-context"
import { BackButton } from "@/components/back-button"

export default function CartPage() {
  const { cart, removeFromCart } = useCart()

  if (!cart || cart.length === 0) {
    return (
      <div className="max-w-5xl mx-auto py-24 px-4">
        <h2 className="text-2xl font-semibold">Your Cart</h2>
        <p className="mt-8 text-muted-foreground">Your cart is empty.</p>
      </div>
    )
  }

  const total = cart.reduce((s, p) => s + p.price, 0)

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="mb-6">
        <BackButton href="/products" label="Back to Products" />
      </div>
      <h2 className="text-2xl font-semibold">Your Cart</h2>

      <ul className="mt-6 space-y-4">
        {cart.map((p) => (
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
                onClick={() => removeFromCart(p.id)}
                className="px-3 py-1 rounded-md bg-red-500 text-white"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-end gap-4">
        <div className="text-lg font-semibold">Total: ${total.toFixed(2)}</div>
        <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground">Checkout</button>
      </div>
    </div>
  )
}

