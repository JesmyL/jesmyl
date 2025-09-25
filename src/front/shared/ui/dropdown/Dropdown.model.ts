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
  renderItem?: (node: React.ReactNode) => React.ReactNode;
  addContent?: React.ReactNode;
  disabled?: boolean;
  hiddenIds?: (Id | null)[];
}

export interface DropdownItem<Id> {
  title: ReactNode;
  id: Id;
  disabled?: boolean;
  color?: DropdownItemColor | null;
}

export const DropdownItemList = <Id>(list: DropdownItem<Id>[]) => list;
export type DropdownItemColor = 'ko';
