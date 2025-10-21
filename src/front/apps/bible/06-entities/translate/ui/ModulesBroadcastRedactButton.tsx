import { Modal } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { atom } from 'atomaric';
import React from 'react';

const TranslatesLoadModalInner = React.lazy(() => import('$bible/entities/translate/ui/TranslatesLoadModalInner'));
const isOpenModalAtom = atom(false);

export const BibleTranslateModulesRedactButton = () => {
  return (
    <>
      <LazyIcon
        className="pointer"
        icon="PencilEdit02"
        onClick={isOpenModalAtom.do.toggle}
      />

      <Modal openAtom={isOpenModalAtom}>
        <TranslatesLoadModalInner />
      </Modal>
    </>
  );
};
