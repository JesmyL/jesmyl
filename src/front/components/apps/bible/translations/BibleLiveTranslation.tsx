import { useScheduleCurrentSchwContext } from '#widgets/schedule/complect/lib/contexts';
import { BibleTranslationScreenTextsContext } from '$bible/texts/AddressContentContext';
import { useBibleAddressTextContext, useBibleTextContentContext } from '$bible/texts/lib/contexts';
import { IndexSchWTranslationLiveDataValue } from '$index/Index.model';
import { JSX, useEffect } from 'react';
import { useBibleScreenTranslationConfigs } from './hooks/configs';

interface Props {
  fio: string;
  onSend: (liveData: IndexSchWTranslationLiveDataValue) => void;
}

export function BibleLiveTranslation(props: Props): JSX.Element {
  return (
    <BibleTranslationScreenTextsContext isPreview={false}>
      <Live {...props} />
    </BibleTranslationScreenTextsContext>
  );
}

const Live = ({ fio, onSend }: Props) => {
  const schw = useScheduleCurrentSchwContext();
  const addressText = useBibleAddressTextContext();
  const text = useBibleTextContentContext();

  const [config] = useBibleScreenTranslationConfigs();

  useEffect(() => {
    return setTimeoutEffect(() => {
      if (isNaN(schw)) return;

      const liveData: IndexSchWTranslationLiveDataValue = { fio, bible: { text, addressText, config } };

      onSend(liveData);
    }, 100);
  }, [addressText, config, fio, onSend, schw, text]);

  return <></>;
};
