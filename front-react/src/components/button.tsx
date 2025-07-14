import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'rounded-lg px-5 font-medium flex items-center justify-center gap-2 cursor-pointer',
  variants: {
    variant: {
      primary: 'bg-gradient-to-r from-[#6cb9d3] to-[#4a9bc7] text-black hover:brightness-110 transition-all',
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
  return (
    <button {...props} className={`${buttonVariants({ variant, size })} ${className || ''}`}>
      {children}
    </button>
  );
}