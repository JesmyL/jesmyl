import { complectIDB } from '#basis/lib/idb/complect';
import { FullScreenContent } from '#shared/ui/fullscreen-content';
import { ModalBody, ModalHeader } from '#shared/ui/modal';
import { useLiveQuery } from 'dexie-react-hooks';
import IconButton from 'front/08-shared/ui/the-icon/IconButton';
import React, { useState } from 'react';
import { defaultAlertLineConfig } from '../../atoms';
import { AlertLineConfigSettingsInner } from './AlertLineConfigSettings';

const LazyAlertLineConfigIcon = React.lazy(() => import('./AlertLineConfigIcon'));

export const AlertLineSettingsModalInner = () => {
  const configs = useLiveQuery(() => complectIDB.tb.alertLineConfigs.toArray());
  const [editConfigId, setEditConfigId] = useState<number | null>(null);

  return (
    <>
      <ModalHeader>Строка важного сообщения</ModalHeader>
      <ModalBody>
        {configs?.map(config => {
          return (
            <IconButton
              key={config.id}
              icon="Edit02"
              className="margin-gap-v pointer"
              prefix={
                <span className="flex flex-gap center">
                  <LazyAlertLineConfigIcon config={config} />
                  {config.title}
                </span>
              }
              onClick={() => setEditConfigId(config.id)}
            />
          );
        })}
        <IconButton
          icon="PlusSign"
          postfix="Добавить шаблон"
          onClick={() => complectIDB.tb.alertLineConfigs.add(defaultAlertLineConfig)}
        />
      </ModalBody>

      {editConfigId == null || (
        <FullScreenContent onClose={() => setEditConfigId(null)}>
          <AlertLineConfigSettingsInner configId={editConfigId} />
        </FullScreenContent>
      )}
    </>
  );
};
