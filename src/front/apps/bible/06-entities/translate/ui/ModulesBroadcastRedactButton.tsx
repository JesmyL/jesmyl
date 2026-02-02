import { Modal } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { Atom, atom } from 'atomaric';
import React from 'react';

const TranslatesLoadModalInner = React.lazy(() => import('$bible/entities/translate/ui/TranslatesLoadModalInner'));
let isOpenModalAtom: Atom<boolean>;

export const BibleTranslateModulesRedactButton = () => {
  isOpenModalAtom ??= atom(false);

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
