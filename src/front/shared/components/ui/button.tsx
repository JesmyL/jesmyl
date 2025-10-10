import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '#shared/lib/utils';
import { makeToastKOMoodConfig } from '#shared/ui/modal/toast.configs';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { toast } from 'sonner';
import { StameskaIconKind } from 'stameska-icon/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading,
  children,
  asSpan,
  disabled,
  icon,
  disabledReason,
  withoutAnimation,
  iconKind,
  ...props
}: OmitOwn<React.ComponentProps<'button'>, 'onClick'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    asSpan?: boolean;
    isLoading?: boolean;
    icon?: KnownStameskaIconName;
    withoutAnimation?: boolean;
    iconKind?: StameskaIconKind;
    disabledReason?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<unknown>;
  }) {
  const Comp = asSpan ? 'span' : asChild ? Slot : 'button';
  const [promiseIsLoading, setIsLoading] = React.useState(false);

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          size: icon && !children ? 'icon' : size,
          className: [disabled && 'opacity-50', className],
        }),
      )}
      disabled={disabled && !disabledReason}
      {...props}
      onClick={
        disabled
          ? disabledReason
            ? () => toast(disabledReason, makeToastKOMoodConfig())
            : undefined
          : async event => {
              const result = props.onClick?.(event);

              if (result instanceof Promise) {
                setIsLoading(true);
                try {
                  await result;
                } catch (_) {
                  //
                }
              }

              setIsLoading(false);
            }
      }
    >
      <TheIconLoading
        icon={icon}
        iconKind={iconKind}
        withoutAnimation={withoutAnimation}
        isLoading={promiseIsLoading || isLoading}
      />
      {children}
    </Comp>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
