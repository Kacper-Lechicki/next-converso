import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

const spinnerVariants = cva('animate-spin text-muted-foreground', {
  variants: {
    size: {
      default: 'size-6',
      sm: 'size-4',
      lg: 'size-8',
      xl: 'size-12',
    },
    variant: {
      default: 'text-muted-foreground',
      primary: 'text-primary',
      ghost: 'text-muted-foreground/50',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
});

export interface SpinnerProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {}

export function Spinner({ className, size, variant, ...props }: SpinnerProps) {
  return (
    <span
      className={cn('inline-flex items-center justify-center', className)}
      role="status"
      {...props}
    >
      <Loader2 className={cn(spinnerVariants({ size, variant }))} />
      <span className="sr-only">Loading...</span>
    </span>
  );
}
