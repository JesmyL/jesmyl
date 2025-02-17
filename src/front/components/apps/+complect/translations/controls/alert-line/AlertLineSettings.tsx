import IconButton from '#shared/ui/the-icon/IconButton';
import { FullContent } from '#widgets/fullscreen-content/FullContent';
import { ModalBody } from '#widgets/modal/Modal/ModalBody';
import { ModalHeader } from '#widgets/modal/Modal/ModalHeader';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useState } from 'react';
import { complectIDB } from '../../../_idb/complectIDB';
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
        <FullContent onClose={() => setEditConfigId(null)}>
          <AlertLineConfigSettingsInner configId={editConfigId} />
        </FullContent>
      )}
    </>
  );
};
