import { propagationStopper } from '#shared/lib/event-funcs';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { TextInput } from '#shared/ui/TextInput';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { atom, useAtom } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import React from 'react';
import { complectIDB } from '../../../_idb/complectIDB';
import { translationShowAlertLineConfigIdAtom } from '../../initial-slide-context';
import { AlertLineSettingsModalInner } from './AlertLineSettings';

const LazyAlertLineConfigIcon = React.lazy(() => import('./AlertLineConfigIcon'));
const isOpenSettingsModalAtom = atom(false);

export const AlertLineInput = () => {
  const configs = useLiveQuery(() => complectIDB.tb.alertLineConfigs.toArray());
  const [alertLine, setAlertLine] = complectIDB.use.translationAlertLine();
  const [showAlertConfigId, setShowAlertConfigId] = useAtom(translationShowAlertLineConfigIdAtom);

  return (
    <>
      <div className="margin-big-gap-t margin-gap-b flex flex-gap center full-width">
        <LazyIcon
          className="pointer"
          icon="Settings01"
          onClick={isOpenSettingsModalAtom.do.toggle}
        />

        <TextInput
          className="bgcolor--2 full-width"
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
