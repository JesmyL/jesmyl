import { Button } from '#shared/components/ui/button';
import { DropdownMenu } from '#shared/components/ui/dropdown-menu';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { makeToastKOMoodConfig } from '../modal';
import { useOnSendPromiseCallback } from '../sends/useOnSendPromiseCallback';
import { LazyIcon } from '../the-icon/LazyIcon';
import { DropdownItem, DropdownProps } from './Dropdown.model';

export function Dropdown<Id, Item extends DropdownItem<Id> = DropdownItem<Id>>(props: DropdownProps<Id, Item>) {
  const [selectedId, setId] = useState(props.id);
  const [isDropped, setDropped] = useState(false);
  const selectedItem = useMemo(() => props.items.find(item => item?.id === selectedId), [props.items, selectedId]);

  useEffect(() => setId(props.id), [props.id]);

  const [onClick, error, isLoading] = useOnSendPromiseCallback(
    item => {
      return props.onSelect === undefined ? props.onSelectId?.(item.id) : props.onSelect(item);
    },
    isOk => {
      if (!isOk) setId(props.id);
    },
    error => {
      setId(props.id);
      toast(error, makeToastKOMoodConfig());
    },
  );

  const renderItem = props.renderItem ?? (({ node }) => node);
  const afterClickAction = () => setDropped(false);

  return (
    <DropdownMenu.Root
      onOpenChange={setDropped}
      open={isDropped}
    >
      <DropdownMenu.Trigger className="flex gap-2">
        {props.label}
        <Button asSpan>
          {selectedItem?.title || (
            <span className="not-selected">
              {props.undTitle ?? props.nullTitle ?? props.placeholder ?? 'Не выбрано'}
            </span>
          )}

          {error ? (
            <LazyIcon
              icon="Alert01"
              className="text-xKO"
            />
          ) : isLoading ? (
            <LazyIcon
              icon="Loading03"
              className="rotate"
            />
          ) : (
            props.hiddenArrow || (
              <LazyIcon
                icon="ArrowDown01"
                className={twMerge(isDropped && 'rotate-180', 'transition-[rotate]')}
              />
            )
          )}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content onClick={() => setDropped(false)}>
        {props.undTitle && (
          <DropdownMenu.Item onClick={() => onClick({ id: undefined, title: props.undTitle })}>
            {renderItem({ node: props.undTitle, id: undefined!, afterClickAction })}
          </DropdownMenu.Item>
        )}
        {props.nullTitle && (
          <DropdownMenu.Item onClick={() => onClick({ id: null, title: props.nullTitle })}>
            {renderItem({ node: props.nullTitle, id: null!, afterClickAction })}
          </DropdownMenu.Item>
        )}
        {!props.disabled &&
          props.items.map(item => {
            if (!item) return null;
            if (props.hiddenIds?.includes(item.id)) return null;

            return (
              <DropdownMenu.Item
                key={JSON.stringify(item.id)}
                disabled={item.disabled}
                className={item.color ? ` colored color_${item.color} ` : ''}
                onClick={event => {
                  event.stopPropagation();
                  setId(item.id);
                  onClick(item);
                }}
              >
                {renderItem({ node: item.title, id: item.id, afterClickAction })}
              </DropdownMenu.Item>
            );
          })}
        {props.addContent}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
