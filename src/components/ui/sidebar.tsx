
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sidebarVariants = cva(
  "flex h-full w-full flex-col bg-sidebar text-sidebar-foreground",
  {
    variants: {
      variant: {
        default: "border-r",
        floating: "border border-border",
      },
      side: {
        left: "",
        right: "",
      },
    },
    defaultVariants: {
      variant: "default",
      side: "left",
    },
  }
)

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & VariantProps<typeof sidebarVariants>
>(({ className, variant, side, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(sidebarVariants({ variant, side }), className)}
      {...props}
    />
  )
})
Sidebar.displayName = "Sidebar"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-1 flex-col gap-2 overflow-auto p-4", className)}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-screen bg-background">{children}</div>
}

const SidebarTrigger = ({ className, ...props }: React.ComponentProps<"button">) => {
  return (
    <button
      className={cn("flex h-8 w-8 items-center justify-center rounded-md", className)}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="3" x2="21" y1="6" y2="6" />
        <line x1="3" x2="21" y1="12" y2="12" />
        <line x1="3" x2="21" y1="18" y2="18" />
      </svg>
    </button>
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
}
