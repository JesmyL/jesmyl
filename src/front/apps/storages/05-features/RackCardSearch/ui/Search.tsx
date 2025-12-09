import { Button } from '#shared/components/ui/button';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { Modal } from '#shared/ui/modal';
import { useNavigate } from '@tanstack/react-router';
import { atom } from 'atomaric';
import { useEffect } from 'react';
import { StoragesRack } from 'shared/model/storages/list.model';
import { StoragesRackCardSearchModalInner } from './ModalInner';

const isOpenSearchModal = atom(false);

export const StoragesRackCardSearch = ({ rack }: { rack: StoragesRack }) => {
  const navigate = useNavigate();

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(document.body, 'keydown', event => {
          if (!event.ctrlKey || event.code !== 'KeyF') return;
          event.stopPropagation();
          event.preventDefault();
          isOpenSearchModal.do.toggle();
        }),
      )
      .effect();
  }, []);

  return (
    <>
      <Button
        icon="SearchVisual"
        onClick={isOpenSearchModal.do.toggle}
      />

      <Modal openAtom={isOpenSearchModal}>
        <StoragesRackCardSearchModalInner
          rack={rack}
          onCardClick={async card => {
            await navigate({
              to: '/storages/i/$rackw/$cardMi',
              params: { cardMi: '' + card.mi, rackw: '' + rack.w },
            });

            isOpenSearchModal.reset();
          }}
        />
      </Modal>
    </>
  );
};
