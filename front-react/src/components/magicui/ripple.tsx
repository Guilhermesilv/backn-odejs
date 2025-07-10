import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"

interface RippleProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string
  duration?: number
}

export function Ripple({
  className,
  color = "rgba(255, 255, 255, 0.2)",
  duration = 1000,
  ...props
}: RippleProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; key: number }[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const x = Math.random() * 100
      const y = Math.random() * 100
      setRipples((prev) => [...prev, { x, y, key: Date.now() }])
    }, duration)

    return () => clearInterval(interval)
  }, [duration])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (ripples.length > 0) {
        setRipples((prev) => prev.slice(1))
      }
    }, duration)

    return () => clearTimeout(timeout)
  }, [ripples, duration])

  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      {ripples.map(({ x, y, key }) => (
        <div
          key={key}
          className="absolute rounded-full animate-ripple"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: "10px",
            height: "10px",
            backgroundColor: color,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  )
}
