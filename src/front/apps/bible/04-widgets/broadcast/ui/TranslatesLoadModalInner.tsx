import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { bibleAllTranslates, translateDescriptions } from '$bible/shared/const/consts';
import { useBibleMyTranslates } from '$bible/shared/hooks/translates';
import { bibleTsjrpcClient } from '$bible/shared/lib/tsjrpc';
import { removeBibleTranslate } from '$bible/shared/lib/utils';
import { useState } from 'react';
import { BibleTranslateName } from 'shared/api';

export default function TranslatesLoadModalInner() {
  const [myTranslates] = useBibleMyTranslates();
  const [translateOnLoad, setTranslateOnLoad] = useState<BibleTranslateName | null>(null);

  return (
    <>
      <ModalHeader>Переводы Библии</ModalHeader>

      <ModalBody>
        <h3 className="my-2 font-bold">Загруженные переводы</h3>
        {myTranslates.map(tName => {
          const isUnremovable = myTranslates.length < 2;
          const title = `${translateDescriptions[tName]} (${tName.toUpperCase()})`;

          return (
            <TheIconButton
              key={tName}
              icon={isUnremovable ? 'BookOpen02' : 'Delete02'}
              className="ml-2 my-2"
              iconClassName={isUnremovable ? undefined : 'text-xKO'}
              disabled={isUnremovable}
              confirm={`Удалить безвозвратно модуль "${title}"`}
              postfix={title}
              onClick={() => removeBibleTranslate(tName)}
            />
          );
        })}
        <h3 className="my-2 font-bold">Доступные к загрузке</h3>
        {bibleAllTranslates.map(tName => {
          if (myTranslates.includes(tName)) return null;
          const title = `${translateDescriptions[tName]} (${tName.toUpperCase()})`;

          return (
            <TheIconSendButton
              key={tName}
              icon="BookDownload"
              className="ml-2 my-2"
              postfix={title}
              disabled={translateOnLoad !== null}
              onSend={async () => {
                setTranslateOnLoad(tName);
                await bibleTsjrpcClient.requestTranslate({ translate: tName });
                setTranslateOnLoad(null);
              }}
            />
          );
        })}
      </ModalBody>
    </>
  );
}
