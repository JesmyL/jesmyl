import { twMerge } from 'tailwind-merge';
import { Drawer as DrawerPrimitive } from 'vaul';

export const Drawer = {
  Above(props: React.ComponentProps<typeof DrawerPrimitive.Root>) {
    return (
      <DrawerPrimitive.Root
        data-slot="drawer"
        {...props}
      />
    );
  },

  Trigger(props: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
    return (
      <DrawerPrimitive.Trigger
        data-slot="drawer-trigger"
        {...props}
      />
    );
  },

  Portal(props: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
    return (
      <DrawerPrimitive.Portal
        data-slot="drawer-portal"
        {...props}
      />
    );
  },

  Close(props: React.ComponentProps<typeof DrawerPrimitive.Close>) {
    return (
      <DrawerPrimitive.Close
        {...props}
        data-slot="drawer-close"
      />
    );
  },

  Overlay(props: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
    return (
      <DrawerPrimitive.Overlay
        {...props}
        data-slot="drawer-overlay"
        className={twMerge(
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
          props.className,
        )}
      />
    );
  },

  Content(props: React.ComponentProps<typeof DrawerPrimitive.Content>) {
    return (
      <Drawer.Portal data-slot="drawer-portal">
        <Drawer.Overlay />
        <DrawerPrimitive.Content
          {...props}
          data-slot="drawer-content"
          className={twMerge(
            'group/drawer-content bg-background fixed z-50 flex h-auto flex-col',
            'data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b',

            `data-[vaul-drawer-direction=bottom]:inset-x-0
             data-[vaul-drawer-direction=bottom]:bottom-0
             data-[vaul-drawer-direction=bottom]:mt-24
             data-[vaul-drawer-direction=bottom]:max-h-[100vh]
             data-[vaul-drawer-direction=bottom]:rounded-t-lg
             data-[vaul-drawer-direction=bottom]:border-t`,

            'data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm',
            'data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm',
            props.className,
          )}
        >
          <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
          {props.children}
        </DrawerPrimitive.Content>
      </Drawer.Portal>
    );
  },

  Header(props: React.ComponentProps<'div'>) {
    return (
      <div
        {...props}
        data-slot="drawer-header"
        className={twMerge(
          'flex flex-col gap-0.5 pb-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left',
          props.className,
        )}
      />
    );
  },

  Footer(props: React.ComponentProps<'div'>) {
    return (
      <div
        {...props}
        data-slot="drawer-footer"
        className={twMerge('mt-auto flex flex-col gap-2 p-4', props.className)}
      />
    );
  },

  Title(props: React.ComponentProps<typeof DrawerPrimitive.Title>) {
    return (
      <DrawerPrimitive.Title
        {...props}
        data-slot="drawer-title"
        className={twMerge('text-foreground font-semibold', props.className)}
      />
    );
  },

  Description(props: React.ComponentProps<typeof DrawerPrimitive.Description>) {
    return (
      <DrawerPrimitive.Description
        {...props}
        data-slot="drawer-description"
        className={twMerge('text-muted-foreground text-sm', props.className)}
      />
    );
  },
};
