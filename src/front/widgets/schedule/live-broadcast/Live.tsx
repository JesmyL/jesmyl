import { useConnectionState } from '#basis/lib/useConnectionState';
import { ScreenBroadcastControlPanelShowMdButton } from '#features/broadcast/controls/ShowMdButton';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { BibleBroadcastSlide } from '$bible/entities/broadcast';
import { CmBroadcastLiveScreen } from '$cm/features/broadcast/ui/Screen';
import { liveDataAtom, liveDataStreamersAtom } from '$index/shared/state';
import { schLiveTsjrpcBaseClient, schLiveTsjrpcClient } from '$index/shared/tsjrpc/live.tsjrpc';
import { Atom, atom, useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { IScheduleWidgetWid, SokiAuthLogin } from 'shared/api';
import { ScheduleWidgetMarkdownLiveBroadcast } from './MarkdownLive';

interface Props {
  schw: IScheduleWidgetWid;
  isShowMarkdownOnly?: boolean;
}

let isSelectStreamerModalAtom: Atom<boolean>;

export const ScheduleWidgetLiveBroadcast = ({ schw, isShowMarkdownOnly }: Props) => {
  isSelectStreamerModalAtom ??= atom(false);

  const liveData = useAtomValue(liveDataAtom);
  const [streamerLogin, setStreamerLogin] = useState<SokiAuthLogin | null>(null);
  const streamers = useAtomValue(liveDataStreamersAtom);
  const [isLoading, setIsLoading] = useState(true);
  const isNetworkConnected = useConnectionState();

  useEffect(() => {
    if (isNetworkConnected !== true) return;

    if (streamerLogin != null) {
      schLiveTsjrpcClient.watch({ schw, streamerLogin });

      return () => {
        schLiveTsjrpcClient.unwatch({ schw, streamerLogin });
      };
    }

    (async () => {
      setIsLoading(true);
      await schLiveTsjrpcClient.requestStreamers({ schw });
      setTimeout(setIsLoading, 1000, false);
    })();
  }, [isNetworkConnected, schw, streamerLogin]);

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
            <ScheduleWidgetMarkdownLiveBroadcast md={liveData.markdown} />
          ) : isShowMarkdownOnly ? (
            <div className="full-size flex center">
              <ScreenBroadcastControlPanelShowMdButton />
            </div>
          ) : liveData.cm !== undefined ? (
            <CmBroadcastLiveScreen {...liveData.cm} />
          ) : liveData.bible !== undefined ? (
            <BibleBroadcastSlide {...liveData.bible} />
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

schLiveTsjrpcBaseClient.$$register();
