import { Button } from '#shared/components/ui/button';
import { Command } from '#shared/components/ui/command';
import { makeToastKOMoodConfig, ModalBody, ModalHeader } from '#shared/ui/modal';
import { QrReader } from '#shared/ui/qr-code/QrReader';
import { StoragesRackStatusFace } from '$storages/entities/RackStatusFace';
import { atom, useAtomValue } from 'atomaric';
import { StoragesRack, StoragesRackCard } from 'shared/model/storages/list.model';
import { toast } from 'sonner';

const termAtom = atom('', 'storages:searchTerm');
const isOpenQrSearchAtom = atom(false);

export const StoragesRackSearchModalInner = ({
  rack,
  onCardClick,
}: {
  rack: StoragesRack;
  onCardClick: (card: StoragesRackCard) => void;
}) => {
  const term = useAtomValue(termAtom);

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
          <Command.Input
            className="w-full ring-3 ring-x1 px-1"
            value={term}
            onInput={event => termAtom.set(event.currentTarget.value)}
            onFocus={event => event.currentTarget.select()}
          />
          <Command.List className="w-full max-h-[calc(100cqh-300px)]">
            {rack.cards.map(card => {
              return (
                <Command.Item
                  key={card.mi}
                  value={`${card.title} ${card.note ?? ''}`}
                  className="bg-x2 data-[selected=true]:bg-x2"
                  onSelect={() => onCardClick(card)}
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
