import * as React from 'react';

import { cn } from '#shared/lib/utils';

export const Card = {
  Root({ className, disabled, onClick, ...props }: React.ComponentProps<'div'> & { disabled?: boolean }) {
    return (
      <div
        data-slot="card"
        className={cn(
          'bg-card text-card-foreground flex flex-col',
          'gap-6 rounded-xl border py-6 shadow-sm custom-align-items',
          disabled && 'disabled',
          className,
        )}
        {...props}
        onClick={disabled ? undefined : onClick}
      />
    );
  },

  Header({ className, ...props }: React.ComponentProps<'div'>) {
    return (
      <div
        data-slot="card-header"
        className={cn(
          '@container/card-header grid auto-rows-min grid-rows-[auto_auto]',
          'items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]',
          '[.border-b]:pb-6 w-full',
          className,
        )}
        {...props}
      />
    );
  },

  Title({ className, ...props }: React.ComponentProps<'div'>) {
    return (
      <div
        data-slot="card-title"
        className={cn('leading-none font-semibold', className)}
        {...props}
      />
    );
  },

  Description({ className, ...props }: React.ComponentProps<'div'>) {
    return (
      <div
        data-slot="card-description"
        className={cn('text-muted-foreground text-sm', className)}
        {...props}
      />
    );
  },

  Action({ className, ...props }: React.ComponentProps<'div'>) {
    return (
      <div
        data-slot="card-action"
        className={cn(
          //
          'col-start-2 row-span-2 row-start-1',
          'self-start justify-self-end',
          className,
        )}
        {...props}
      />
    );
  },

  Content({ className, ...props }: React.ComponentProps<'div'>) {
    return (
      <div
        data-slot="card-content"
        className={cn('px-6 custom-align-items', className)}
        {...props}
      />
    );
  },

  Footer({ className, ...props }: React.ComponentProps<'div'>) {
    return (
      <div
        data-slot="card-footer"
        className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
        {...props}
      />
    );
  },
};
