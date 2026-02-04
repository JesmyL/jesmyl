import { broadcastShowAlertLineConfigIdAtom } from '#features/broadcast/initial-slide-context';
import { propagationStopper } from '#shared/lib/event-funcs';
import { Modal } from '#shared/ui/modal';
import { TextInput } from '#shared/ui/TextInput';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { complectIDB } from '$index/shared/state';
import { Atom, atom, useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import React from 'react';
import { AlertLineSettingsModalInner } from './AlertLineSettings';

const LazyAlertLineConfigIcon = React.lazy(() => import('./AlertLineConfigIcon'));
let isOpenSettingsModalAtom: Atom<boolean>;

export const AlertLineInput = () => {
  isOpenSettingsModalAtom ??= atom(false);

  const configs = useLiveQuery(() => complectIDB.tb.alertLineConfigs.toArray());
  const [alertLine, setAlertLine] = complectIDB.use.broadcastAlertLine();
  const showAlertConfigId = useAtomValue(broadcastShowAlertLineConfigIdAtom);

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
            onClick={() => broadcastShowAlertLineConfigIdAtom.set(showAlertConfigId === config.id ? null : config.id)}
          />
        ))}
      </div>

      <Modal openAtom={isOpenSettingsModalAtom}>
        <AlertLineSettingsModalInner />
      </Modal>
    </>
  );
};
