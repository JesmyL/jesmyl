import { useLiveQuery } from 'dexie-react-hooks';
import { FullContent } from 'front/complect/fullscreen-content/FullContent';
import { ModalBody } from 'front/complect/modal/Modal/ModalBody';
import { ModalHeader } from 'front/complect/modal/Modal/ModalHeader';
import IconButton from 'front/complect/the-icon/IconButton';
import { IconEdit02StrokeRounded } from 'front/complect/the-icon/icons/edit-02';
import { IconPlusSignStrokeRounded } from 'front/complect/the-icon/icons/plus-sign';
import { useState } from 'react';
import { complectIDB } from '../../../_idb/complectIDB';
import { defaultAlertLineConfig } from '../../atoms';
import { AlertLineConfigIcon } from './AlertLineConfigIcon';
import { AlertLineConfigSettingsInner } from './AlertLineConfigSettings';

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
              Icon={IconEdit02StrokeRounded}
              className="margin-gap-v pointer"
              prefix={
                <span className="flex flex-gap center">
                  <AlertLineConfigIcon config={config} />
                  {config.title}
                </span>
              }
              onClick={() => setEditConfigId(config.id)}
            />
          );
        })}
        <IconButton
          Icon={IconPlusSignStrokeRounded}
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
