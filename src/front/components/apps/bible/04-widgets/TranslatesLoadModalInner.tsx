import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { bibleAllTranslates, translateDescriptions } from '$bible/basis/lib/const/consts';
import { useBibleMyTranslates } from '$bible/basis/lib/hooks/translates';
import { removeBibleTranslate } from '$bible/basis/lib/utils';
import { bibleSokiInvocatorBaseClient, bibleSokiInvocatorClient } from '$bible/processes/invocator';
import { useEffect, useState } from 'react';
import { BibleTranslateName } from 'shared/api';

export default function TranslatesLoadModalInner() {
  const [myTranslates] = useBibleMyTranslates();
  const [translateOnLoad, setTranslateOnLoad] = useState<BibleTranslateName | null>(null);

  useEffect(() => bibleSokiInvocatorBaseClient.$$register(), []);

  return (
    <>
      <ModalHeader>Переводы Библии</ModalHeader>

      <ModalBody>
        <h3 className="margin-gap-v text-bold">Загруженные переводы</h3>
        {myTranslates.map(tName => {
          const isUnremovable = myTranslates.length < 2;
          const title = `${translateDescriptions[tName]} (${tName.toUpperCase()})`;

          return (
            <TheIconButton
              key={tName}
              icon={isUnremovable ? 'BookOpen02' : 'Delete02'}
              className="margin-gap-l margin-gap-v"
              iconClassName={isUnremovable ? undefined : 'color--ko'}
              disabled={isUnremovable}
              confirm={`Удалить безвозвратно модуль "${title}"`}
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
            <TheIconSendButton
              key={tName}
              icon="BookDownload"
              className="margin-gap-l margin-gap-v"
              postfix={title}
              disabled={translateOnLoad !== null}
              onSend={async () => {
                setTranslateOnLoad(tName);
                await bibleSokiInvocatorClient.requestTranslate({ translate: tName });
                setTranslateOnLoad(null);
              }}
            />
          );
        })}
      </ModalBody>
    </>
  );
}
