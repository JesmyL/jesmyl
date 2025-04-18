import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { DropdownItem, DropdownProps } from '#shared/ui/dropdown/Dropdown.model';
import { useToast } from '#shared/ui/modal/useToast';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { useState } from 'react';

export function SendableDropdown<Id extends string | number, Item extends DropdownItem<Id> = DropdownItem<Id>>(
  props: DropdownProps<Id, Item> & {
    onSend: (id: Id) => Promise<unknown>;
  },
) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  return (
    <div className="relative">
      <TheIconLoading
        className="absolute pos-right z-index:400 margin-gap"
        isLoading={isLoading}
      />
      <Dropdown<Id, Item>
        {...props}
        onSelectId={async id => {
          try {
            setIsLoading(true);
            await props.onSend(id);
          } catch (error) {
            toast('' + error, { mood: 'ko' });
          }

          setIsLoading(false);
        }}
      />
    </div>
  );
}
