import { Button, DropdownMenu } from '#shared/components';
import { serverSuccessCheckTSDeltaTimeAtom, serverTimeStampDeltaAtom } from '#shared/state/atoms';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { atom, useAtomValue } from 'atomaric';
import { useState } from 'react';
import { metronomeIsPlayAtom, metronomeUserBpmAtom } from '../lib/atoms';
import { metronomeIsSyncModeAtom } from '../state/atoms';

const openSoftTuneAtom = atom(false);

export const MetronomeToolsMenu = () => {
  const [isDropped, setDropped] = useState(false);
  const isSyncWithGroup = useAtomValue(metronomeIsSyncModeAtom);
  const serverSuccessCheckTSDeltaTime = useAtomValue(serverSuccessCheckTSDeltaTimeAtom);

  const onDeltaIncrement = (num: number) => () => {
    serverTimeStampDeltaAtom.do.setPartial(prev => ({ delta: Math.floor(prev.delta + num), isFinal: true }));
    metronomeIsPlayAtom.set(true);
  };

  return (
    <DropdownMenu.Root
      onOpenChange={setDropped}
      open={isDropped}
    >
      <DropdownMenu.Trigger>
        <Button
          icon="Settings01"
          asSpan
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item>
          <IconCheckbox
            checked={isSyncWithGroup}
            onChange={metronomeIsSyncModeAtom.do.toggle}
            postfix="Синхронный режим"
          />
        </DropdownMenu.Item>

        <DropdownMenu.Item onClick={openSoftTuneAtom.do.toggle}>
          <Button icon="Settings01">Тонкая настройка</Button>
        </DropdownMenu.Item>

        {!serverSuccessCheckTSDeltaTime || (
          <div className="opacity-80 text-x7 text-xs">
            Успешный синхрон {new Date(serverSuccessCheckTSDeltaTime).toLocaleString('ru')}
          </div>
        )}
      </DropdownMenu.Content>

      <Modal openAtom={openSoftTuneAtom}>
        <ModalHeader className="flex w-full justify-between">
          Тонкая настройка метронома
          <TheIconButton
            confirm="Удалить значения тонкой настройки?"
            icon="Delete02"
            className="text-xKO"
            onClick={() => serverTimeStampDeltaAtom.do.setPartial({ isFinal: false })}
          />
        </ModalHeader>
        <ModalBody>
          {[1, 5, 10, 50, 100].map(num => (
            <div
              key={num}
              className="flex gap-5 w-full justify-around mt-2"
            >
              <Button onClick={onDeltaIncrement(-num)}>-{num}</Button>
              <Button onClick={onDeltaIncrement(num)}>+{num}</Button>
            </div>
          ))}

          <div className="flex gap-5 w-full justify-around mt-10">
            <Button
              icon="ArrowLeft01"
              onClick={onDeltaIncrement(-(60 / metronomeUserBpmAtom.get()) * 1000)}
            />
            <Button
              icon="ArrowRight01"
              onClick={onDeltaIncrement((60 / metronomeUserBpmAtom.get()) * 1000)}
            />
          </div>
        </ModalBody>
      </Modal>
    </DropdownMenu.Root>
  );
};
