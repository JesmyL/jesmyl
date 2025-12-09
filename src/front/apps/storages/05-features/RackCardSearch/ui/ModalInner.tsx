import { Badge } from '#shared/components/ui/badge';
import { Button } from '#shared/components/ui/button';
import { Command } from '#shared/components/ui/command';
import { mylib } from '#shared/lib/my-lib';
import { makeToastKOMoodConfig, ModalBody, ModalHeader } from '#shared/ui/modal';
import { QrReader } from '#shared/ui/qr-code/QrReader';
import { StoragesRackStatusFace } from '$storages/entities/RackStatusFace';
import { atom, useAtomValue } from 'atomaric';
import { StoragesRack, StoragesRackCard } from 'shared/model/storages/list.model';
import { StoragesColumnType, StoragesRackColumn } from 'shared/model/storages/rack.model';
import { toast } from 'sonner';

const termAtom = atom('', 'storages:searchTerm');
const isOpenQrSearchAtom = atom(false);
const searchByAtom = atom(new Set<keyof StoragesRackCard | number>(['title']), 'storages:searchByFields');

const searchFields: { key: keyof StoragesRackCard | number; title: string }[] = [
  { key: 'title', title: 'Название' },
  { key: 'note', title: 'Заметка' },
];

export const StoragesRackCardSearchModalInner = ({
  rack,
  onCardClick,
}: {
  rack: StoragesRack;
  onCardClick: (card: StoragesRackCard) => void;
}) => {
  const term = useAtomValue(termAtom);
  const searchByKeySet = useAtomValue(searchByAtom);

  return (
    <>
      <ModalHeader className="flex justify-between">
        Поиск
        <Button
          icon="QrCode"
          onClick={isOpenQrSearchAtom.do.toggle}
        />
      </ModalHeader>

      <ModalBody>
        <Command.Root className="bg-x2">
          <div className="w-[100%] overflow-auto mb-5 no-scrollbar">
            <div className="flex gap-2">
              {searchFields
                .concat(rack.cols.map((col, coli) => ({ key: coli, title: col.title })))
                .map(({ key, title }) => {
                  if (
                    mylib.isNum(key) &&
                    rack.cols[key].t !== StoragesColumnType.Link &&
                    rack.cols[key].t !== StoragesColumnType.Text &&
                    rack.cols[key].t !== StoragesColumnType.String
                  )
                    return;

                  return (
                    <Badge
                      key={key}
                      variant={searchByKeySet.has(key) ? undefined : 'secondary'}
                      onClick={() => {
                        if (searchByKeySet.size === 1 && searchByKeySet.has(key)) return;
                        searchByAtom.do.toggle(key);
                      }}
                    >
                      {title}
                    </Badge>
                  );
                })}
            </div>
          </div>
          <Command.Input
            className="w-full ring-3 ring-x1 px-1"
            value={term}
            onInput={event => termAtom.set(event.currentTarget.value)}
            onFocus={event => event.currentTarget.select()}
            autoFocus
            ref={elem => {
              setTimeout(() => elem?.focus(), 100);
            }}
          />
          <Command.List className="w-full max-h-[calc(100cqh-300px)]">
            {term.length > 2 &&
              rack.cards.map(card => {
                const fieldsText = Array.from(searchByKeySet)
                  .map(coli => {
                    if (!mylib.isNum(coli)) return '';
                    const cell = card.row?.[coli];

                    if (cell == null) return '';
                    if (cell.t !== StoragesColumnType.String) return cell.val ?? '';

                    const column = rack.cols[coli] as StoragesRackColumn<StoragesColumnType.String>;
                    if (column == null || column.t !== StoragesColumnType.String) return '';
                    return rack.dicts[column.di ?? 0].li[cell.val] ?? '';
                  })
                  .join(' ');

                return (
                  <Command.Item
                    key={card.i}
                    className="bg-x2 data-[selected=true]:bg-x2"
                    onSelect={() => onCardClick(card)}
                    value={`${searchByKeySet.has('title') ? card.title : ''} ${searchByKeySet.has('note') ? (card.note ?? '') : ''} ${fieldsText}`}
                  >
                    <StoragesRackStatusFace
                      rack={rack}
                      card={card}
                      statusi={card.status}
                      customTitile
                    />
                    <Button className="w-full flex justify-start w-[80cqw] ellipsis">{card.title}</Button>
                  </Command.Item>
                );
              })}
          </Command.List>
        </Command.Root>
      </ModalBody>

      <QrReader
        openAtom={isOpenQrSearchAtom}
        formats={['any']}
        onReadData={meta => {
          const card = rack.cards.find(card => card.meta === meta);

          if (card == null) {
            toast('Такой карточки нет', makeToastKOMoodConfig());
            return;
          }

          onCardClick(card);
        }}
      />
    </>
  );
};
