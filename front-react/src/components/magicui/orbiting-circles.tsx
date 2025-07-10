import { cn } from "@/lib/utils"
import React from "react"

interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {}

export function OrbitingCircles({ className, ...props }: OrbitingCirclesProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        className
      )}
      {...props}
    >
      <div className="absolute h-32 w-32 animate-[orbit_4s_linear_infinite]">
        <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-primary-500/30" />
      </div>
      <div className="absolute h-32 w-32 animate-[orbit_4s_linear_infinite] [animation-delay:-1s]">
        <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-primary-500/30" />
      </div>
      <div className="absolute h-32 w-32 animate-[orbit_4s_linear_infinite] [animation-delay:-2s]">
        <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-primary-500/30" />
      </div>
      <div className="absolute h-32 w-32 animate-[orbit_4s_linear_infinite] [animation-delay:-3s]">
        <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-primary-500/30" />
      </div>
      <div className="absolute h-32 w-32 animate-[orbit_4s_linear_infinite] [animation-delay:-4s]">
        <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-primary-500/30" />
      </div>
      <div className="h-4 w-4 rounded-full bg-primary-500" />
    </div>
  )
}
