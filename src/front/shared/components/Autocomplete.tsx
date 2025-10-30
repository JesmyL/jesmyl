import { mylib } from '#shared/lib/my-lib';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './ui/button';
import { Command } from './ui/command';
import { Popover } from './ui/popover';

export function Autocomplete<Id extends string, Multiple extends boolean>({
  onSelect,
  items,
  selected,
  placeholder,
  emptyMessage,
  onNewItem,
  isShowSelectedNodeOnly,
}: {
  onSelect?: (item: { title: React.ReactNode; id: Id }) => Promise<unknown> | nil | void;
  items: { title: React.ReactNode; id: Id }[];
  selected?: Multiple extends true ? Id[] : Id;
  placeholder?: React.ReactNode;
  emptyMessage?: React.ReactNode;
  onNewItem?: (title: string) => Promise<unknown> | nil | void;
  isShowSelectedNodeOnly?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [term, setTerm] = useState('');

  const selectedSet = new Set<Id>([selected ?? []].flat() as never);

  const selectedNode = mylib.isArr(selected) ? (
    <span className="flex flex-wrap gap-x-1 max-w-[calc(100cqw-30px)]">
      {selected.map((id, idi, ida) => (
        <span
          key={id}
          className="ellipsis bg-x2 px-1"
        >
          {items.find(it => it.id === id)?.title}
          {ida.length > 1 && idi < ida.length - 1 ? ',' : ''}
        </span>
      ))}
    </span>
  ) : (
    items.find(item => item.id === selected)?.title
  );

  if (isShowSelectedNodeOnly) return <div className="@container *:max-w-full">{selectedNode}</div>;

  return (
    <Popover.Root
      open={open}
      onOpenChange={setOpen}
    >
      <Popover.Trigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-auto @container w-full"
        >
          {(selected ? selectedNode : placeholder) || <span />}

          <TheIconLoading
            icon={open ? 'ArrowUp01' : 'ArrowDown01'}
            className="opacity-50"
            isLoading={isLoading}
          />
        </Button>
      </Popover.Trigger>
      <Popover.Content className="p-0">
        <Command.Root>
          <Command.Input
            className="w-full"
            value={term}
            onInput={event => setTerm(event.currentTarget.value)}
          />
          <Command.List className="w-full">
            {emptyMessage && <Command.Empty>{emptyMessage}</Command.Empty>}
            {!!term && !items.some(id => id.id === term) && onNewItem && (
              <Button
                icon="PlusSign"
                className="max-w-[300px] m-1 w-full"
                isLoading={isLoading}
                onClick={async () => {
                  setIsLoading(true);
                  const result = await onNewItem(term);
                  setIsLoading(false);
                  setOpen(false);
                  setTerm('');

                  return result;
                }}
              >
                <span className="ellipsis">{term}</span>
              </Button>
            )}
            <Command.Group className="w-full">
              {items.map(item => (
                <Command.Item
                  key={item.id}
                  value={item.id}
                  className={twMerge(
                    'w-full flex justify-between my-2',
                    selectedSet.has(item.id) ? 'bg-x3/10! hover:bg-x3/15!' : '',
                  )}
                  onSelect={async () => {
                    setOpen(false);
                    let result;

                    if (onSelect != null) {
                      setIsLoading(true);
                      result = await onSelect(item);
                    }

                    setIsLoading(false);

                    return result;
                  }}
                >
                  <div className="ellipsis">{item.title}</div>
                  <Button
                    icon="ArrowUpLeft01"
                    onClick={event => {
                      event.stopPropagation();
                      setTerm(item.id);
                    }}
                  />
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command.Root>
      </Popover.Content>
    </Popover.Root>
  );
}
