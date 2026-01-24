import { isShowBroadcastTextAtom } from '#features/broadcast/initial-slide-context';
import { useScheduleCurrentSchwContext } from '#widgets/schedule/complect/lib/contexts';
import { useBibleBroadcastScreenConfigs } from '$bible/entities/broadcast';
import { useBibleAddressTextContext, useBibleTextContentContext } from '$bible/shared/contexts/texts';
import { BibleCurrentTextsContext } from '$bible/shared/state/CurrentTextsContext';
import { useAtomValue } from 'atomaric';
import { JSX, useEffect } from 'react';
import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';

interface Props {
  fio: string;
  onSend: (liveData: IndexSchWBroadcastLiveDataValue) => void;
}

export function BibleBroadcastLive(props: Props): JSX.Element {
  return (
    <BibleCurrentTextsContext isPreview={false}>
      <Live {...props} />
    </BibleCurrentTextsContext>
  );
}

const Live = ({ fio, onSend }: Props) => {
  const schw = useScheduleCurrentSchwContext();
  const addressText = useBibleAddressTextContext();
  const text = useBibleTextContentContext();
  const isHide = !useAtomValue(isShowBroadcastTextAtom);

  const [config] = useBibleBroadcastScreenConfigs();

  useEffect(() => {
    return setTimeoutEffect(() => {
      if (isNaN(schw)) return;

      const liveData: IndexSchWBroadcastLiveDataValue = { fio, isHide, bible: { text, addressText, config } };

      onSend(liveData);
    }, 100);
  }, [addressText, config, fio, isHide, onSend, schw, text]);

  return <></>;
};
