import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {

  return (
    <Sonner
      theme="system"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      richColors
      toastOptions={{
        classNames: {
            success: 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-100 dark:border-green-800',
            error: 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900 dark:text-red-100 dark:border-red-800',
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
