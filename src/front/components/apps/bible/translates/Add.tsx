import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { IconButton } from '#shared/ui/the-icon/IconButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { bibleSokiInvocatorClient } from '@bible/invoctors/invocator';
import { removeBibleTranslate } from '@bible/utils';
import { useState } from 'react';
import { BibleTranslateName } from 'shared/api';
import { bibleAllTranslates, translateDescriptions } from './complect';
import { useBibleMyTranslates } from './hooks';

export function BibleModulesTranslationsRedactButton(): JSX.Element {
  const [myTranslates] = useBibleMyTranslates();
  const [translateOnLoad, setTranslateOnLoad] = useState<BibleTranslateName | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<unknown>(false);

  return (
    <>
      <LazyIcon
        className="pointer"
        icon="PencilEdit02"
        onClick={setIsOpenModal}
      />

      {isOpenModal && (
        <Modal onClose={setIsOpenModal}>
          <ModalHeader>Переводы Библии</ModalHeader>

          <ModalBody>
            <h3 className="margin-gap-v text-bold">Загруженные переводы</h3>
            {myTranslates.map(tName => {
              const isUnremovable = myTranslates.length < 2;
              const title = `${translateDescriptions[tName]} (${tName.toUpperCase()})`;

              return (
                <IconButton
                  key={tName}
                  icon={isUnremovable ? 'BookOpen02' : 'Delete02'}
                  className="margin-gap-l margin-gap-v"
                  iconClassName={isUnremovable ? undefined : 'color--ko'}
                  disabled={isUnremovable}
                  confirm={`Удалить безвозвратно модуль  "${title}"`}
                  postfix={title}
                  onClick={() => removeBibleTranslate(tName)}
                />
              );
            })}
            <h3 className="margin-gap-v text-bold">Доступные к загрузке</h3>
            {bibleAllTranslates.map(tName => {
              if (myTranslates.includes(tName)) return null;
              const title = `${translateDescriptions[tName]} (${tName.toUpperCase()})`;

              return (
                <IconButton
                  key={tName}
                  icon="BookDownload"
                  className="margin-gap-l margin-gap-v"
                  postfix={title}
                  disabled={translateOnLoad !== null}
                  onClick={async () => {
                    setTranslateOnLoad(tName);
                    await bibleSokiInvocatorClient.requestTranslate(null, tName);
                    setTranslateOnLoad(null);
                  }}
                />
              );
            })}
          </ModalBody>
        </Modal>
      )}
    </>
  );
}
