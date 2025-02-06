import { useAtomValue } from 'front/complect/atoms';
import Modal from 'front/complect/modal/Modal/Modal';
import { ModalBody } from 'front/complect/modal/Modal/ModalBody';
import { ModalHeader } from 'front/complect/modal/Modal/ModalHeader';
import IconButton from 'front/complect/the-icon/IconButton';
import { TheIconLoading } from 'front/complect/the-icon/IconLoading';
import {
  schLiveSokiInvocatorBaseClient,
  schLiveSokiInvocatorClient,
} from 'front/components/index/complect/translations/live-invocator';
import { soki } from 'front/soki';
import { useEffect, useState } from 'react';
import { IScheduleWidgetWid, SokiAuthLogin } from 'shared/api';
import { IconComputerStrokeRounded } from '../../../complect/the-icon/icons/computer';
import { ScreenTranslationControlPanelShowMdButton } from '../../../components/apps/+complect/translations/controls/ShowMdButton';
import BibleTranslationSlide from '../../../components/apps/bible/translations/BibleTranslationSlide';
import { CmLiveTranslationScreen } from '../../../components/apps/cm/translation/complect/live/Screen';
import { liveDataAtom, liveDataStreamersAtom } from '../../../components/index/atoms';
import { ScheduleWidgetMarkdownLiveTranslation } from './MarkdownLive';

interface Props {
  onClose: (isOpen: boolean) => void;
  schw: IScheduleWidgetWid;
  isShowMarkdownOnly?: boolean;
}

export const ScheduleWidgetLiveTranslation = ({ onClose, schw, isShowMarkdownOnly }: Props) => {
  const liveData = useAtomValue(liveDataAtom);
  const [streamerLogin, setStreamerLogin] = useState<SokiAuthLogin | null>(null);
  const streamers = useAtomValue(liveDataStreamersAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (streamerLogin != null) {
      schLiveSokiInvocatorClient.watch(null, schw, streamerLogin);

      const unsubscribe = soki.onConnectionState(isConnected => {
        if (!isConnected) return;

        schLiveSokiInvocatorClient.watch(null, schw, streamerLogin);
      });

      return () => {
        unsubscribe();
        schLiveSokiInvocatorClient.unwatch(null, schw, streamerLogin);
      };
    }

    (async () => {
      setIsLoading(true);
      await schLiveSokiInvocatorClient.requestStreamers(null, schw);
      setTimeout(setIsLoading, 1000, false);
    })();
  }, [schw, streamerLogin]);

  useEffect(() => {
    if (streamerLogin != null || streamers == null) return;
    if (streamers.length === 1) setStreamerLogin(streamers[0].login);
  }, [streamerLogin, streamers]);

  if (streamers && !streamerLogin) {
    return (
      <Modal onClose={() => onClose(false)}>
        <ModalHeader>Выбери стримера</ModalHeader>
        <ModalBody>
          {streamers.map(({ fio, login }) => {
            return (
              <div key={login}>
                <IconButton
                  Icon={IconComputerStrokeRounded}
                  postfix={fio}
                  onClick={() => setStreamerLogin(login)}
                />
              </div>
            );
          })}
        </ModalBody>
      </Modal>
    );
  }

  if (isLoading)
    return (
      <div className="flex center full-size">
        <TheIconLoading />
      </div>
    );

  if (liveData == null) {
    if (streamerLogin == null) return <div className="flex center full-size">Трансляция не началась</div>;
    return <div className="flex center full-size">Трансляция завершена</div>;
  }

  return (
    <>
      {liveData.markdown ? (
        <ScheduleWidgetMarkdownLiveTranslation md={liveData.markdown} />
      ) : isShowMarkdownOnly ? (
        <div className="full-size flex center">
          <ScreenTranslationControlPanelShowMdButton />
        </div>
      ) : liveData.cm !== undefined ? (
        <CmLiveTranslationScreen {...liveData.cm} />
      ) : liveData.bible !== undefined ? (
        <BibleTranslationSlide {...liveData.bible} />
      ) : null}
    </>
  );
};

schLiveSokiInvocatorBaseClient.$$register();
