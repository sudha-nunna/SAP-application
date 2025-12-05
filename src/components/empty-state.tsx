import { Package } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  title?: string
  message?: string
  actionLabel?: string
  actionHref?: string
}

export function EmptyState({
  title = "No items found",
  message = "There are no items to display at the moment.",
  actionLabel = "Go Home",
  actionHref = "/",
}: EmptyStateProps) {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="p-4 rounded-full bg-muted">
        <Package className="h-10 w-10 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="text-muted-foreground max-w-md">{message}</p>
      </div>
      <Button asChild className="mt-2">
        <Link to={actionHref}>{actionLabel}</Link>
      </Button>
    </div>
  )
}

