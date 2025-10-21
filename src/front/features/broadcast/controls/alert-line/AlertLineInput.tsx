import { translationShowAlertLineConfigIdAtom } from '#features/broadcast/initial-slide-context';
import { propagationStopper } from '#shared/lib/event-funcs';
import { Modal } from '#shared/ui/modal';
import { TextInput } from '#shared/ui/TextInput';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { complectIDB } from '$index/state/complectIDB';
import { atom, useAtom } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import React from 'react';
import { AlertLineSettingsModalInner } from './AlertLineSettings';

const LazyAlertLineConfigIcon = React.lazy(() => import('./AlertLineConfigIcon'));
const isOpenSettingsModalAtom = atom(false);

export const AlertLineInput = () => {
  const configs = useLiveQuery(() => complectIDB.tb.alertLineConfigs.toArray());
  const [alertLine, setAlertLine] = complectIDB.use.translationAlertLine();
  const [showAlertConfigId, setShowAlertConfigId] = useAtom(translationShowAlertLineConfigIdAtom);

  return (
    <>
      <div className="mt-5 mb-2 flex gap-2 center w-full">
        <LazyIcon
          className="pointer"
          icon="Settings01"
          onClick={isOpenSettingsModalAtom.do.toggle}
        />

        <TextInput
          className="bg-x2 w-full"
          value={alertLine ?? ''}
          onInput={value => setAlertLine(value)}
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

      <Modal openAtom={isOpenSettingsModalAtom}>
        <AlertLineSettingsModalInner />
      </Modal>
    </>
  );
};
