import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorMessageProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorMessage({
  title = "Something went wrong",
  message = "We couldn't load the data. Please try again.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="p-4 rounded-full bg-destructive/10">
        <AlertCircle className="h-10 w-10 text-destructive" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="text-muted-foreground max-w-md">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2 mt-2 bg-transparent">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  )
}

