import { cn } from "@/lib/utils"

interface LoaderProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Loader({ size = "md", className }: LoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className={cn("animate-spin rounded-full border-primary border-t-transparent", sizeClasses[size])} />
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader size="lg" />
      <p className="text-muted-foreground animate-pulse">Loading...</p>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden animate-pulse">
      <div className="aspect-square bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="h-6 bg-muted rounded w-1/3" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

