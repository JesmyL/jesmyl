import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { DropdownItem, DropdownProps } from '#shared/ui/dropdown/Dropdown.model';
import { makeToastKOMoodConfig } from '#shared/ui/modal/toast.configs';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { useState } from 'react';
import { toast } from 'sonner';

export function SendableDropdown<Id extends string | number, Item extends DropdownItem<Id> = DropdownItem<Id>>(
  props: DropdownProps<Id, Item> & {
    onSend: (id: Id) => Promise<unknown>;
  },
) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="relative">
      <TheIconLoading
        className="absolute right-0 z-400 m-2"
        isLoading={isLoading}
      />
      <Dropdown<Id, Item>
        {...props}
        onSelectId={async id => {
          try {
            setIsLoading(true);
            await props.onSend(id);
          } catch (error) {
            toast('' + error, makeToastKOMoodConfig());
          }

          setIsLoading(false);
        }}
      />
    </div>
  );
}
