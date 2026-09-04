import { Modal } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { WithAtom } from '#shared/ui/WithAtom';
import React, { Suspense } from 'react';

const BibleTranslateLoadModalInner = React.lazy(() =>
  import('$bible/entities/translate/ui/TranslatesLoadModalInner').then(m => ({
    default: m.BibleTranslateLoadModalInner,
  })),
);

export const BibleTranslateModulesRedactButton = () => {
  return (
    <WithAtom init={false}>
      {isOpenModalAtom => (
        <>
          <LazyIcon
            className="pointer"
            icon="PencilEdit02"
            onClick={isOpenModalAtom.do.toggle}
          />

          <Modal openAtom={isOpenModalAtom}>
            <Suspense>
              <BibleTranslateLoadModalInner />
            </Suspense>
          </Modal>
        </>
      )}
    </WithAtom>
  );
};
