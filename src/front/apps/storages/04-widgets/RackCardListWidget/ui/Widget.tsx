import { Accordion } from '#shared/components/ui/accordion';
import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { SortDirection } from '#shared/model/sortDirection';
import { useConfirm } from '#shared/ui/modal';
import { StoragesRackStatusFace } from '$storages/entities/RackStatusFace';
import { storagesSortAndGroupAtom } from '$storages/shared/state/atoms';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { useNavigate } from '@tanstack/react-router';
import { Atom, atom, useAtomValue } from 'atomaric';
import { memo } from 'react';
import { StoragesRack, StoragesRackCard, StoragesRackWid } from 'shared/model/storages/list.model';
import { StoragesColumnType, StoragesDictItemi, StoragesRackColumn } from 'shared/model/storages/rack.model';

const noValue = '<Без значения>';
const openGroupsAtoms: PRecord<StoragesRackWid, Atom<string[]>> = {};

export const StoragesRackCardListWidget = memo((props: { rack: StoragesRack }) => {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const openGroupsAtom = (openGroupsAtoms[props.rack.w] ??= atom<string[]>([], {
    storeKey: `storages:openCardGroups/${props.rack.w}`,
    exp: () => new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
  }));
  const openGroups = useAtomValue(openGroupsAtom);

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

    const isAsc = dir === SortDirection.Asc;
    const compareNumbers = (a: number, b: number) => (isAsc ? a - b : b - a);
    const compareStrings = (a: string, b: string) =>
      isAsc ? a.toUpperCase().localeCompare(b.toUpperCase()) : b.toUpperCase().localeCompare(a.toUpperCase());

    if (sort === 'status') {
      const ord = props.rack.statusOrd;

      if (ord == null) {
        return cards
          .slice()
          .sort(
            (aCard, bCard) =>
              compareNumbers(aCard.status ?? 0, bCard.status ?? 0) || compareStrings(aCard.title, bCard.title),
          );
      }

      const statusIndexDict: Record<number, number> = {};

      return cards.slice().sort((aCard, bCard) => {
        const aIndex = (statusIndexDict[aCard.status ?? 0] ??= ord.indexOf(aCard.status ?? 0));
        const bIndex = (statusIndexDict[bCard.status ?? 0] ??= ord.indexOf(bCard.status ?? 0));

        return compareNumbers(aIndex, bIndex) || compareStrings(aCard.title, bCard.title);
      });
    }

    if (mylib.isStr(sort)) {
      return cards.slice().sort((aCard, bCard) => {
        let result = 0;

        if (mylib.isStr(aCard[sort]) && mylib.isStr(bCard[sort])) {
          result = compareStrings(aCard[sort], bCard[sort]);
        } else if (mylib.isNum(aCard[sort]) && mylib.isNum(bCard[sort])) {
          result = compareNumbers(aCard[sort], bCard[sort]);
        }

        result = compareStrings(aCard.title, bCard.title);

        return result;
      });
    }

    return cards.slice().sort((aCard, bCard) => {
      const aVal = aCard.row?.[sort]?.val;
      const bVal = bCard.row?.[sort]?.val;

      let result = 0;

      if (mylib.isNum(aVal) && mylib.isNum(bVal)) {
        result = compareNumbers(aVal, bVal);
      } else if (mylib.isStr(aVal) && mylib.isStr(bVal)) {
        result = compareStrings(aVal, bVal);
      }

      if (result === 0) result = compareStrings(aCard.title, bCard.title);

      return result;
    });
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
        <Accordion.Root
          type="multiple"
          defaultValue={openGroups}
          onValueChange={value => openGroupsAtom.set(value)}
        >
          {mylib.keys(groupedCards).map(groupKey => {
            return (
              <Accordion.Item
                key={groupKey}
                value={`${groupKey}`}
              >
                <div className="flex gap-3">
                  {group === 'status' && (
                    <StoragesRackStatusFace
                      statusi={groupedCards[groupKey]?.[0].status}
                      rack={props.rack}
                      card={null}
                      customTitile
                      onChange={async statusi => {
                        if (groupedCards[groupKey] == null) return;

                        if (
                          !(await confirm(
                            'Будут изменены статусы для всех карточек этого списка.\nВнести такие изменения?',
                          ))
                        )
                          return;

                        return storagesTsjrpcClient.setRackManyCardsStatus({
                          cardis: groupedCards[groupKey].map(card => card.i),
                          rackw: props.rack.w,
                          statusi,
                        });
                      }}
                    />
                  )}
                  <Accordion.Trigger>
                    {groupKey} ({groupedCards[groupKey]?.length ?? 0})
                  </Accordion.Trigger>
                </div>
                <Accordion.Content>{sortCards(groupedCards[groupKey])?.map(cardMapper)}</Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
      }
    </>
  );
});
