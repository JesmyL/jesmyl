import { isShowBroadcastTextAtom } from '#features/broadcast/initial-slide-context';
import { useBibleBroadcastScreenConfigs } from '$bible/entities/broadcast';
import { useBibleAddressTextContext, useBibleTextMapBlocksContentContext } from '$bible/shared/contexts/texts';
import { BibleCurrentTextsContext } from '$bible/shared/state/CurrentTextsContext';
import { useAtomValue } from 'atomaric';
import { JSX, useEffect } from 'react';
import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';

interface Props {
  fio: string | nil;
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
  const addressText = useBibleAddressTextContext();
  const texts = useBibleTextMapBlocksContentContext();
  const isHide = !useAtomValue(isShowBroadcastTextAtom);

  const [config] = useBibleBroadcastScreenConfigs();

  useEffect(() => {
    return setTimeoutEffect(() => {
      const liveData: IndexSchWBroadcastLiveDataValue = {
        fio: fio ?? '',
        isHide,
        bible: { texts, addressText, config },
      };

      onSend(liveData);
    }, 100);
  }, [addressText, config, fio, isHide, onSend, texts]);

  return <></>;
};
