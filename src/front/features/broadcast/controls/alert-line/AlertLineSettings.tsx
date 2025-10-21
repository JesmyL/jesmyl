import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { ModalBody, ModalHeader } from '#shared/ui/modal';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { complectIDB } from '$index/shared/state';
import { atom } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import React from 'react';
import { defaultAlertLineConfig } from '../../consts';
import { AlertLineConfigSettingsInner } from './AlertLineConfigSettings';

const LazyAlertLineConfigIcon = React.lazy(() => import('./AlertLineConfigIcon'));
const editConfigIdAtom = atom<number | null>(null);

export const AlertLineSettingsModalInner = () => {
  const configs = useLiveQuery(() => complectIDB.tb.alertLineConfigs.toArray());

  return (
    <>
      <ModalHeader>Строка важного сообщения</ModalHeader>
      <ModalBody>
        {configs?.map(config => {
          return (
            <TheIconButton
              key={config.id}
              icon="Edit02"
              className="my-2 pointer"
              prefix={
                <span className="flex gap-2 center">
                  <LazyAlertLineConfigIcon config={config} />
                  {config.title}
                </span>
              }
              onClick={() => editConfigIdAtom.set(config.id)}
            />
          );
        })}
        <TheIconButton
          icon="PlusSign"
          postfix="Добавить шаблон"
          onClick={() => complectIDB.tb.alertLineConfigs.add(defaultAlertLineConfig)}
        />
      </ModalBody>

      <FullContent
        openAtom={editConfigIdAtom}
        checkIsOpen={it => it != null}
      >
        {id => <AlertLineConfigSettingsInner configId={id} />}
      </FullContent>
    </>
  );
};
