import { Modal } from '#shared/ui/modal/Modal/Modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { atom } from 'atomaric';
import React, { JSX } from 'react';

const TranslatesLoadModalInner = React.lazy(() => import('$bible/widgets/TranslatesLoadModalInner'));
const isOpenModalAtom = atom(false);

export function BibleModulesTranslationsRedactButton(): JSX.Element {
  return (
    <>
      <LazyIcon
        className="pointer"
        icon="PencilEdit02"
        onClick={isOpenModalAtom.toggle}
      />

      <Modal openAtom={isOpenModalAtom}>
        <TranslatesLoadModalInner />
      </Modal>
    </>
  );
}
