import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from 'tailwind-variants'
import { ShimmerButton } from "./magicui/shimmer-button";

const buttonVariants = tv({
  base: 'rounded-lg px-5 font-medium flex items-center justify-center gap-2',
  variants: {
    variant: {
      primary: '',
      secondary: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
    },
    size: {
      default: 'py-2',
      full: 'w-full h-11'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default'
  }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  children: ReactNode;
  className?: string;
}

export function Button({ children, variant, size, className, ...props }: ButtonProps) {
  // Se for variante primary, usa ShimmerButton
  if (variant === 'primary') {
    return (
      <ShimmerButton
        background="linear-gradient(to right, #6cb9d3, #4a9bc7)"
        shimmerColor="#ffffff"
        borderRadius="8px"
        shimmerDuration="3s"
        className={`${buttonVariants({ variant: 'primary', size })} text-black ${className || ''}`}
        {...props}
      >
        {children}
      </ShimmerButton>
    );
  }

  // Se for variante secondary, usa button normal
  return (
    <button {...props} className={`${buttonVariants({ variant, size })} ${className || ''}`}>
      {children}
    </button>
  );
}