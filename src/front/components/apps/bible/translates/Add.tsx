import { Modal } from '#shared/ui/modal/Modal/Modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import React, { JSX, useState } from 'react';

const TranslatesLoadModalInner = React.lazy(() => import('./ui/TranslatesLoadModalInner'));

export function BibleModulesTranslationsRedactButton(): JSX.Element {
  const [isOpenModal, setIsOpenModal] = useState<unknown>(false);

  return (
    <>
      <LazyIcon
        className="pointer"
        icon="PencilEdit02"
        onClick={setIsOpenModal}
      />

      {isOpenModal && (
        <Modal
          onClose={setIsOpenModal}
          isRenderHere
        >
          <TranslatesLoadModalInner />
        </Modal>
      )}
    </>
  );
}
