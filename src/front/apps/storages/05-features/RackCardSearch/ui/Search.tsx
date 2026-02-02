import { Button } from '#shared/components/ui/button';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { Modal } from '#shared/ui/modal';
import { useNavigate } from '@tanstack/react-router';
import { Atom, atom } from 'atomaric';
import { useEffect } from 'react';
import { StoragesRack } from 'shared/model/storages/list.model';
import { StoragesRackCardSearchModalInner } from './ModalInner';

let isOpenSearchModalAtom: Atom<boolean>;

export const StoragesRackCardSearch = ({ rack }: { rack: StoragesRack }) => {
  isOpenSearchModalAtom ??= atom(false);

  const navigate = useNavigate();

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(document.body, 'keydown', event => {
          if (!event.ctrlKey || event.code !== 'KeyF') return;
          event.stopPropagation();
          event.preventDefault();
          isOpenSearchModalAtom.do.toggle();
        }),
      )
      .effect();
  }, []);

  return (
    <>
      <Button
        icon="SearchVisual"
        onClick={isOpenSearchModalAtom.do.toggle}
      />

      <Modal openAtom={isOpenSearchModalAtom}>
        <StoragesRackCardSearchModalInner
          rack={rack}
          onCardClick={async card => {
            await navigate({
              to: '/storages/i/$rackw/$cardi',
              params: { cardi: '' + card.i, rackw: '' + rack.w },
            });

            isOpenSearchModalAtom.reset();
          }}
        />
      </Modal>
    </>
  );
};
