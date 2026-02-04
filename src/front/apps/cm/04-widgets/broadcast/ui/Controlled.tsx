import { currentBroadcastConfigiAtom, useScreenBroadcastConfigsValue } from '#features/broadcast/atoms';
import { useScreenBroadcastFaceLineListeners } from '#features/broadcast/complect/config-line/hooks/listeners';
import { BroadcastSlidePreview } from '#features/broadcast/controls/Preview';
import { useWatchScreenBroadcast } from '#features/broadcast/hooks/watch-broadcast';
import { useScreenBroadcastWindows } from '#features/broadcast/hooks/windows';
import { useUpdateScreenBroadcastConfig } from '#features/broadcast/hooks/with-config';
import { ScreenBroadcastConfig } from '#features/broadcast/model';
import { Button } from '#shared/components/ui/button';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useCmComCurrent, useCmComOpenComLinkRendererContext } from '$cm/entities/com';
import {
  CmComAudioPlayerPlayButton,
  cmComAudioPlayerSetSrc,
  CmComAudioPlayerTrack,
} from '$cm/entities/com-audio-player';
import { CmComFaceList } from '$cm/entities/com-face';
import { CmComToolHideMetronome } from '$cm/entities/com-tool';
import { CmComListPackKindSelector } from '$cm/entities/ComListPackKindSelector';
import { CmCom, CmComAudioPlayerMarksMovers } from '$cm/ext';
import { useCmBroadcastScreenComNavigations, useCmBroadcastScreenComTextNavigations } from '$cm/features/broadcast';
import { getCmComFreshAudioMarksPack } from '$cm/shared/lib/getFresh';
import { cmComTrackPreSwitchTimeAtom, cmIsTrackBroadcastAtom } from '$cm/shared/state';
import { cmPlayerBroadcastAudioSrcAtom, cmPlayerBroadcastComwAtom } from '$cm/shared/state/broadcast.atoms';
import { useNavigate } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { ReactNode } from 'react';
import { CmComWid, HttpLink } from 'shared/api';
import { toast } from 'sonner';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';
import { useCmBroadcastScreenKeyDownListen } from '../lib/keydown-listen';
import { CmBroadcastControlPanel } from './ControllPanel';
import { CmBroadcastScreenConfigurations } from './ScreenConfigurations';
import { CmBroadcastShowChordedSlideModeSelector } from './ShowChordedSlideModeSelector';
import { CmBroadcastSlideLine } from './SlideLine';

interface Props {
  head?: ReactNode;
  comList?: CmCom[];
  headTitle?: ReactNode;
  backButtonPath?: string;
}

export function CmBroadcastControlled(props: Props) {
  const isTrackBroadcast = useAtomValue(cmIsTrackBroadcastAtom);
  const broadcastSrc = useAtomValue(cmPlayerBroadcastAudioSrcAtom);
  const navigate = useNavigate();

  const { comPack, coms } = useCmBroadcastScreenComNavigations();
  const setSlidei = useCmBroadcastScreenComTextNavigations().setSlidei;
  const linkToCom = useCmComOpenComLinkRendererContext();
  let comList = props.comList ?? coms;
  if (isTrackBroadcast) comList = comList.filter(com => com.audio.length);
  const com = useCmComCurrent();
  const updateConfig = useUpdateScreenBroadcastConfig();
  const configs: ScreenBroadcastConfig[] = useScreenBroadcastConfigsValue();
  const windows = useScreenBroadcastWindows();
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);

  useScreenBroadcastFaceLineListeners(configs, currentConfigi, updateConfig, windows);

  const watchBroadcast = useWatchScreenBroadcast();

  const onStartBroadcast = async (comw: CmComWid, src: HttpLink) => {
    getCmComFreshAudioMarksPack(src).then(pack => {
      if (pack != null) return;

      cmPlayerBroadcastComwAtom.reset();
      cmComAudioPlayerSetSrc(null);
      cmPlayerBroadcastAudioSrcAtom.reset();
      toast('Для этого трека маркеры не установлены', makeToastKOMoodConfig());
    });

    navigate({
      to: '.',
      search: prev => ({ ...(prev as object), comw }) as object,
    });

    cmPlayerBroadcastComwAtom.set(comw);
    cmComAudioPlayerSetSrc(src);
    cmPlayerBroadcastAudioSrcAtom.set(src);

    watchBroadcast();
  };

  useCmBroadcastScreenKeyDownListen();

  return (
    <PageContainerConfigurer
      className=""
      backButtonRender={(linkRef, backButtonNode) =>
        linkToCom({
          linkRef,
          children: backButtonNode,
          search: {
            comw: comList[0]?.wid,
            tran: undefined,
          },
        })
      }
      headTitle={
        props.headTitle ? (
          <>
            {props.headTitle}
            {comPack.pageTitlePostfix}
          </>
        ) : (
          <>Трансляция{comPack.pageTitlePostfix}</>
        )
      }
      head={
        <div className="flex gap-2">
          <LazyIcon
            icon="MusicNote01"
            className={twMerge('pointer mr-2', isTrackBroadcast && 'text-x7')}
            onClick={cmIsTrackBroadcastAtom.do.toggle}
          />
          {props.head}
        </div>
      }
      content={
        <Container>
          <div className="flex">
            <BroadcastSlidePreview />

            <div className="broadcast-com-list">
              <div className="m-5">
                <CmComListPackKindSelector />
              </div>

              <StyledComFaceList
                list={comList}
                titles={comPack.titles}
                importantOnClick={({ defaultClick, com }) => {
                  if (!isTrackBroadcast) {
                    setSlidei(0);
                    defaultClick();
                    return;
                  }

                  onStartBroadcast(com.wid, com.audio[0] ?? '');
                }}
                comDescription={
                  isTrackBroadcast
                    ? com => {
                        return com.audio.map(src => (
                          <Button
                            key={src}
                            icon="ComputerVideo"
                            withoutAnimation
                            className={broadcastSrc === src ? 'text-x7' : undefined}
                            onClick={() => onStartBroadcast(com.wid, src)}
                          />
                        ));
                      }
                    : undefined
                }
              />
            </div>
          </div>
          {isTrackBroadcast ? (
            <>
              {broadcastSrc && (
                <div className="mt-5 bg-x2 flex min-h-20 gap-3 px-3 mb-3">
                  <CmComAudioPlayerPlayButton
                    src={broadcastSrc}
                    className="mx-5 scale-300!"
                  />

                  <CmComAudioPlayerTrack src={broadcastSrc} />
                </div>
              )}
              {com && broadcastSrc && (
                <div className="mb-10">
                  <CmComAudioPlayerMarksMovers
                    com={com}
                    preSwitchTimeAtom={cmComTrackPreSwitchTimeAtom}
                    src={broadcastSrc}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <CmBroadcastSlideLine />
              <CmBroadcastControlPanel />
              <div className="flex w-full justify-between mt-5">
                <CmBroadcastShowChordedSlideModeSelector />
                <div className="w-53">
                  <CmComToolHideMetronome />
                </div>
              </div>
            </>
          )}
          <CmBroadcastScreenConfigurations />
        </Container>
      }
    />
  );
}

const StyledComFaceList = styled(CmComFaceList)`
  min-height: calc(var(--max-size) + 1px);
`;

const Container = styled.div`
  --size: 50vmin;
  --max-size: 300px;
  --min-size: 200px;

  .broadcast-com-list {
    width: calc(100vw - var(--max-size));
    height: 50vmin;
    min-height: 200px;
    max-height: var(--max-size);
    overflow-x: hidden;
    overflow-y: auto;

    .face-item.current {
      font-weight: bold;
    }
  }
`;
