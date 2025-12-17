import { ReactNode } from 'react';

export interface DropdownProps<Id, Item extends DropdownItem<Id>> {
  items: (Item | null)[];
  placeholder?: string;
  id?: Id;
  onSelect?: (item: Item) => und | void | null | Promise<unknown>;
  onSelectId?: (item: Id) => und | void | null | Promise<unknown>;
  className?: string;
  undTitle?: React.ReactNode;
  nullTitle?: React.ReactNode;
  label?: React.ReactNode;
  renderItem?: (props: { node: React.ReactNode; id: Id; afterClickAction: () => void }) => React.ReactNode;
  addContent?: React.ReactNode;
  disabled?: boolean;
  hiddenIds?: (Id | null)[];
  hiddenArrow?: boolean;
  triggerNode?: (isLoading: boolean) => React.ReactNode;
}

export interface DropdownItem<Id> {
  title: ReactNode;
  id: Id;
  disabled?: boolean;
  className?: string;
}

export const DropdownItemList = <Id>(list: DropdownItem<Id>[]) => list;
