import { useIsOnline } from '#basis/lib/useConnectionState';
import { translateBase } from '#basis/locale';
import { ScreenBroadcastControlPanelShowMdButton } from '#features/broadcast/controls/ShowMdButton';
import { soki } from '#shared/soki';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { BibleBroadcastSlide } from '$bible/entities/broadcast';
import { CmBroadcastLiveScreen } from '$cm/features/broadcast/ui/Screen';
import { liveDataAtom, liveDataStreamersAtom } from '$index/shared/state';
import { schLiveTsjrpcClient } from '$index/shared/tsjrpc/live.tsjrpc';
import { Atom, atom, useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { ScheduleWidgetWid, SokiAuthLogin } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { emptyFunc } from 'shared/utils';
import { ScheduleWidgetMarkdownLiveBroadcast } from './MarkdownLive';

interface Props {
  schw: ScheduleWidgetWid;
  isShowMarkdownOnly?: boolean;
}

let isSelectStreamerModalAtom: Atom<boolean>;

export const ScheduleWidgetLiveBroadcast = ({ schw, isShowMarkdownOnly }: Props) => {
  isSelectStreamerModalAtom ??= atom(false);

  const liveData = useAtomValue(liveDataAtom);
  const [streamerLogin, setStreamerLogin] = useState<SokiAuthLogin | null>(null);
  const streamers = useAtomValue(liveDataStreamersAtom);
  const [isLoading, setIsLoading] = useState(true);
  const isOnline = useIsOnline();

  useEffect(() => {
    if (!isOnline) return;

    if (streamerLogin) {
      const unlisten = soki.listenOnConnectionOpenEvent(() => {
        schLiveTsjrpcClient.watch({ schw, streamerLogin }).catch(emptyFunc);
      });

      return () => {
        unlisten();
        schLiveTsjrpcClient.unwatch({ schw, streamerLogin }).catch(emptyFunc);
      };
    }

    const unlisten = soki.listenOnConnectionOpenEvent(() => {
      setIsLoading(true);
      schLiveTsjrpcClient
        .requestStreamers({ schw })
        .catch(emptyFunc)
        .finally(() => setTimeout(setIsLoading, 1000, false));
    });

    return unlisten;
  }, [isOnline, schw, streamerLogin]);

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
          {streamerLogin == null
            ? translateBase(BaseLocaleKey.ScheduleBroadcastNotStarted)
            : translateBase(BaseLocaleKey.ScheduleBroadcastFinished)}
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
        <ModalHeader>{translateBase(BaseLocaleKey.ScheduleChooseStreamer)}</ModalHeader>
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
          }) ?? translateBase(BaseLocaleKey.EmptyList)}
        </ModalBody>
      </Modal>
    </>
  );
};
