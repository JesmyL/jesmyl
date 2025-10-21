import { useScheduleCurrentSchwContext } from '#widgets/schedule/complect/lib/contexts';
import { useBibleBroadcastScreenConfigs } from '$bible/entities/broadcast';
import { useBibleAddressTextContext, useBibleTextContentContext } from '$bible/shared/contexts/texts';
import { BibleCurrentTextsContext } from '$bible/shared/state/CurrentTextsContext';
import { IndexSchWBroadcastLiveDataValue } from '$index/shared/model/Index.model';
import { JSX, useEffect } from 'react';

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

  const [config] = useBibleBroadcastScreenConfigs();

  useEffect(() => {
    return setTimeoutEffect(() => {
      if (isNaN(schw)) return;

      const liveData: IndexSchWBroadcastLiveDataValue = { fio, bible: { text, addressText, config } };

      onSend(liveData);
    }, 100);
  }, [addressText, config, fio, onSend, schw, text]);

  return <></>;
};
