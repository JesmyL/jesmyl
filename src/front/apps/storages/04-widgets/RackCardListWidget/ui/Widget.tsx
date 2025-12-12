import { Accordion } from '#shared/components/ui/accordion';
import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { SortDirection } from '#shared/model/sortDirection';
import { StoragesRackStatusFace } from '$storages/entities/RackStatusFace';
import { storagesSortAndGroupAtom } from '$storages/shared/state/atoms';
import { useNavigate } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { memo } from 'react';
import { StoragesRack, StoragesRackCard } from 'shared/model/storages/list.model';
import { StoragesColumnType, StoragesDictItemi, StoragesRackColumn } from 'shared/model/storages/rack.model';

const noValue = '<Без значения>';

export const StoragesRackCardListWidget = memo((props: { rack: StoragesRack }) => {
  const navigate = useNavigate();

  const allSortRules = useAtomValue(storagesSortAndGroupAtom);
  let rackSortRules = allSortRules[props.rack.w];
  if (mylib.isNum(rackSortRules)) rackSortRules = allSortRules[rackSortRules];
  if (mylib.isNum(rackSortRules)) return;

  const { dir, group, sort } = rackSortRules ?? {};

  const cardMapper = (card: StoragesRackCard<StoragesDictItemi>) => {
    return (
      <div
        key={card.i}
        className="flex gap-2 my-3"
      >
        <StoragesRackStatusFace
          statusi={card.status}
          rack={props.rack}
          card={card}
          customTitile
        />
        <Button
          onClick={() => {
            navigate({
              to: '/storages/i/$rackw/$cardi',
              params: { cardi: `${card.i}`, rackw: `${props.rack.w}` },
            });
          }}
        >
          <span className="max-w-[calc(100vw-100px)] h-[1lh]">
            <span className="ellipsis">{card.title || <span className="text-xKO">Новая карточка</span>}</span>
          </span>
        </Button>
      </div>
    );
  };

  if (props.rack.cards.length < 2 || (group == null && (sort == null || !dir))) {
    return props.rack.cards.map(cardMapper);
  }

  const sortCards = <Cards extends StoragesRackCard<StoragesDictItemi>[] | nil>(cards: Cards) => {
    if (cards == null || cards.length < 2 || sort == null || !dir) return cards;

    return cards.sort(
      mylib.isStr(sort)
        ? (aCard, bCard) => {
            if (mylib.isStr(aCard[sort]) && mylib.isStr(bCard[sort]))
              return dir === SortDirection.Asc
                ? aCard[sort].toUpperCase().localeCompare(bCard[sort].toUpperCase())
                : bCard[sort].toUpperCase().localeCompare(aCard[sort].toUpperCase());

            if (mylib.isNum(aCard[sort]) && mylib.isNum(bCard[sort]))
              return dir === SortDirection.Asc ? aCard[sort] - bCard[sort] : bCard[sort] - aCard[sort];

            return 0;
          }
        : () => 0,
    );
  };

  if (group == null) return sortCards(props.rack.cards).map(cardMapper);

  const groupedCards = Object.groupBy(props.rack.cards, card => {
    if (mylib.isStr(group)) {
      if (group === 'status') return props.rack.statuses[card.status || 0]?.title;
      if (mylib.isNum(card[group]) || mylib.isStr(card[group])) return card[group];
      return noValue;
    }

    if (card.row?.[group]?.val == null) return noValue;

    if (mylib.isNum(group)) {
      const col = props.rack.cols[group] as StoragesRackColumn<StoragesColumnType.String>;

      if (col.t === StoragesColumnType.String && mylib.isNum(card.row[group].val))
        return props.rack.dicts[col.di ?? 0].li[card.row[group].val] || card.row[group].val;
    }

    if (mylib.isNum(card.row[group].val) || mylib.isStr(card.row[group].val)) return card.row[group].val;

    return noValue;
  });

  return (
    <>
      {
        <Accordion.Root type="multiple">
          {mylib
            .keys(groupedCards)
            .sort(
              dir === SortDirection.Asc
                ? (a, b) => `${a}`.toUpperCase().localeCompare(`${b}`.toUpperCase())
                : (a, b) => `${b}`.toUpperCase().localeCompare(`${a}`.toUpperCase()),
            )
            .map(groupKey => {
              return (
                <Accordion.Item
                  key={groupKey}
                  value={`${groupKey}`}
                >
                  <Accordion.Trigger>
                    {groupKey} ({groupedCards[groupKey]?.length ?? 0})
                  </Accordion.Trigger>
                  <Accordion.Content>{sortCards(groupedCards[groupKey])?.map(cardMapper)}</Accordion.Content>
                </Accordion.Item>
              );
            })}
        </Accordion.Root>
      }
    </>
  );
});
