import { useAtom } from '#shared/lib/atom';
import { propagationStopper } from '#shared/lib/event-funcs';
import { KeyboardInput } from '#shared/ui/keyboard/KeyboardInput';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useLiveQuery } from 'dexie-react-hooks';
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
        <LazyIcon
          className="pointer"
          icon="Settings01"
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
