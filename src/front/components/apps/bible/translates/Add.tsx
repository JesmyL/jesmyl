import { bibleSokiInvocatorClient } from '#basis/lib/invocators/bible/invocator';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import IconButton from 'front/08-shared/ui/the-icon/IconButton';
import { LazyIcon } from 'front/08-shared/ui/the-icon/LazyIcon';
import { useState } from 'react';
import { BibleTranslateName } from 'shared/api';
import { removeBibleTranslate } from '../utils';
import { bibleAllTranslates, translateDescriptions } from './complect';
import { useBibleMyTranslates } from './hooks';

export default function BibleModulesTranslationsRedactButton(): JSX.Element {
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
