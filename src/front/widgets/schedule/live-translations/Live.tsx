import { atom, useAtomValue } from '#shared/lib/atom';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { BibleTranslationSlide } from '$bible/translations/BibleTranslationSlide';
import { CmLiveTranslationScreen } from '$cm/translation/complect/live/Screen';
import { liveDataAtom, liveDataStreamersAtom } from '$index/atoms';
import {
  schLiveSokiInvocatorBaseClient,
  schLiveSokiInvocatorClient,
} from '$index/complect/translations/live-invocator';
import { ScreenTranslationControlPanelShowMdButton } from 'front/components/apps/+complect/translations/controls/ShowMdButton';
import { soki } from 'front/soki';
import { useEffect, useState } from 'react';
import { IScheduleWidgetWid, SokiAuthLogin } from 'shared/api';
import { ScheduleWidgetMarkdownLiveTranslation } from './MarkdownLive';

interface Props {
  schw: IScheduleWidgetWid;
  isShowMarkdownOnly?: boolean;
}

const isSelectStreamerModalAtom = atom(false);

export const ScheduleWidgetLiveTranslation = ({ schw, isShowMarkdownOnly }: Props) => {
  const liveData = useAtomValue(liveDataAtom);
  const [streamerLogin, setStreamerLogin] = useState<SokiAuthLogin | null>(null);
  const streamers = useAtomValue(liveDataStreamersAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (streamerLogin != null) {
      schLiveSokiInvocatorClient.watch({ schw, streamerLogin });

      const unsubscribe = soki.onConnectionState(isConnected => {
        if (!isConnected) return;

        schLiveSokiInvocatorClient.watch({ schw, streamerLogin });
      });

      return () => {
        unsubscribe();
        schLiveSokiInvocatorClient.unwatch({ schw, streamerLogin });
      };
    }

    (async () => {
      setIsLoading(true);
      await schLiveSokiInvocatorClient.requestStreamers({ schw });
      setTimeout(setIsLoading, 1000, false);
    })();
  }, [schw, streamerLogin]);

  useEffect(() => {
    isSelectStreamerModalAtom.set(!!streamers?.length && !streamerLogin);

    if (streamerLogin != null || streamers == null || streamers.length !== 1) return;

    setStreamerLogin(streamers[0].login);
  }, [setStreamerLogin, streamerLogin, streamers]);

  if (isLoading)
    return (
      <div className="flex center full-size">
        <TheIconLoading />
      </div>
    );

  return (
    <>
      {liveData == null ? (
        <div className="flex center full-size">
          {streamerLogin == null ? 'Трансляция не началась' : 'Трансляция завершена'}
        </div>
      ) : (
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
      )}

      <Modal openAtom={isSelectStreamerModalAtom}>
        <ModalHeader>Выбери стримера</ModalHeader>
        <ModalBody>
          {streamers?.map(({ fio, login }) => {
            return (
              <div key={login}>
                <TheIconButton
                  icon="Computer"
                  postfix={fio}
                  onClick={() => setStreamerLogin(login)}
                />
              </div>
            );
          }) ?? 'Список пуст'}
        </ModalBody>
      </Modal>
    </>
  );
};

schLiveSokiInvocatorBaseClient.$$register();
