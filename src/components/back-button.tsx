import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BackButtonProps {
  href?: string
  label?: string
}

export function BackButton({ href, label = "Back" }: BackButtonProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (href) {
      navigate(href)
    } else {
      navigate(-1)
    }
  }

  return (
    <Button variant="ghost" onClick={handleClick} className="gap-2 hover:bg-secondary">
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Button>
  )
}

