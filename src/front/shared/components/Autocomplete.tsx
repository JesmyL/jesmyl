import { mylib } from '#shared/lib/my-lib';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './ui/button';
import { Command } from './ui/command';
import { Popover } from './ui/popover';

export function Autocomplete<Item extends { title: React.ReactNode; value: string }>({
  onSelect,
  items,
  selected,
  placeholder,
  emptyMessage,
  onNewItem,
  isShowSelectedNodeOnly,
  termMinLenghtToShowList = 3,
}: {
  onSelect?: (index: number, value: string) => Promise<unknown> | nil | void;
  items: (Item | nil)[];
  /** selected indexes */
  selected?: number[] | number;
  placeholder?: React.ReactNode;
  emptyMessage?: React.ReactNode;
  onNewItem?: (title: string) => Promise<unknown> | nil | void;
  isShowSelectedNodeOnly?: boolean;
  termMinLenghtToShowList?: number;
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [term, setTerm] = useState('');

  const selectedSet = new Set([selected ?? []].flat());

  const selectedNode =
    selected != null &&
    (mylib.isArr(selected) ? (
      <span className="flex flex-wrap gap-x-1.5 max-w-[calc(100cqw-30px)]">
        {selected.map(index => (
          <span
            key={index}
            className="ellipsis bg-x2/50 px-1 rounded-sm"
          >
            {items[index]?.title}
          </span>
        ))}
      </span>
    ) : (
      items[selected]?.title
    ));

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
          {term.length >= termMinLenghtToShowList && (
            <Command.List className="w-full">
              {emptyMessage && <Command.Empty>{emptyMessage}</Command.Empty>}
              {!!term && !items.some(id => id?.value.toUpperCase() === term.toUpperCase()) && onNewItem && (
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
                {items.map(
                  (item, itemi) =>
                    !item || (
                      <Command.Item
                        key={item?.value ?? itemi}
                        value={item?.value}
                        className={twMerge(
                          'w-full flex justify-between my-2',
                          selectedSet.has(itemi) ? 'bg-x3/10! hover:bg-x3/15!' : '',
                        )}
                        onSelect={async value => {
                          setOpen(false);
                          let result;

                          if (onSelect != null) {
                            setIsLoading(true);
                            result = await onSelect(itemi, value);
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
                            setTerm(item.value);
                          }}
                        />
                      </Command.Item>
                    ),
                )}
              </Command.Group>
            </Command.List>
          )}
        </Command.Root>
      </Popover.Content>
    </Popover.Root>
  );
}
