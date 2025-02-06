import { useLiveQuery } from 'dexie-react-hooks';
import { useAtom } from 'front/complect/atoms';
import KeyboardInput from 'front/complect/keyboard/KeyboardInput';
import Modal from 'front/complect/modal/Modal/Modal';
import IconButton from 'front/complect/the-icon/IconButton';
import { IconSettings01StrokeRounded } from 'front/complect/the-icon/icons/settings-01';
import { propagationStopper } from 'front/complect/utils/utils';
import React, { useState } from 'react';
import { complectIDB } from '../../../_idb/complectIDB';
import { translationShowAlertLineConfigIdAtom } from '../../initial-slide-context';
import { AlertLineSettingsModalInner } from './AlertLineSettings';

const LazyAlertLineConfigIcon = React.lazy(() => import('./AlertLineConfigIcon'));

export const AlertLineInput = () => {
  const configs = useLiveQuery(() => complectIDB.tb.alertLineConfigs.toArray());
  const [alertLine, setAlertLine] = complectIDB.use.translationAlertLine();
  const [showAlertConfigId, setShowAlertConfigId] = useAtom(translationShowAlertLineConfigIdAtom);
  const [isOpenSettingsModal, setIsOpenSettingsModal] = useState<unknown>(false);

  return (
    <>
      <div className="margin-big-gap-t margin-gap-b flex flex-gap center full-width">
        <IconButton
          Icon={IconSettings01StrokeRounded}
          onClick={setIsOpenSettingsModal}
        />

        <KeyboardInput
          className="bgcolor--2 full-width"
          value={alertLine ?? ''}
          onChange={value => setAlertLine(value)}
          onKeyDown={propagationStopper}
        />

        {configs?.map(config => (
          <LazyAlertLineConfigIcon
            key={config.id}
            config={config}
            isSelected={showAlertConfigId === config.id}
            onClick={() => setShowAlertConfigId(showAlertConfigId === config.id ? null : config.id)}
          />
        ))}
      </div>

      {isOpenSettingsModal && (
        <Modal onClose={setIsOpenSettingsModal}>
          <AlertLineSettingsModalInner />
        </Modal>
      )}
    </>
  );
};
