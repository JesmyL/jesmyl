import { translateBase } from '#basis/locale';
import { Button } from '#shared/components/ui/button';
import { isMobileDevice } from '#shared/lib/device-differences';
import { useDebounceValue } from '#shared/lib/hooks/useDebounceValue';
import { renderComponentInNewWindow } from '#shared/lib/renders';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { DocTitle } from '#shared/ui/tags/DocTitle';
import {
  cmComFavoriteComwsAtom,
  CmComNumber,
  cmComSelectedComwsAtom,
  useCmCom,
  useCmComAllIComList,
  useCmComIComList,
} from '$cm/entities/com';
import {
  cmComAudioPlayerEndedTickAtom,
  cmComAudioPlayerErrorTickAtom,
  CmComAudioPlayerPlayButton,
  cmComAudioPlayerSetSrc,
  cmComAudioPlayerSwitchIsPlay,
  CmComAudioPlayerTrack,
} from '$cm/entities/com-audio-player';
import { CmComFaceList } from '$cm/entities/com-face';
import { CmComListPackKindSelector } from '$cm/entities/ComListPackKindSelector';
import { cmComLastOpenComwAtom } from '$cm/entities/index';
import { CmComAudioPlayerMarksMovers } from '$cm/ext';
import { getCmComFreshAudioMarksPack } from '$cm/shared/lib/getFresh';
import { cmComTrackPreSwitchTimeAtom, cmOpenComListModeAtom } from '$cm/shared/state';
import { cmPlayerBroadcastAudioSrcAtom, cmPlayerBroadcastComwAtom } from '$cm/shared/state/broadcast.atoms';
import styled from '@emotion/styled';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Atom, atom, useAtomValue } from 'atomaric';
import { useEffect, useMemo } from 'react';
import { CmComWid, IExportableCom } from 'shared/api';
import { toast } from 'sonner';
import { CmPlayerBroadcast } from './Broadcast';

let isCanPlay = false;

const resetIsCanPlayEffect = () => {
  return () => {
    isCanPlay = false;
  };
};
let comsWithErrorAtom: Atom<Set<CmComWid>>;

export const CmPlayerPage = () => {
  comsWithErrorAtom ??= atom(new Set());

  const favComws = useCmComIComList(useAtomValue(cmComFavoriteComwsAtom));
  const selComws = useCmComIComList(useAtomValue(cmComSelectedComwsAtom));

  const allIComs = useCmComAllIComList();

  const openComListMode = useAtomValue(cmOpenComListModeAtom);
  const debouncedOpenComListMode = useDebounceValue(openComListMode);
  const search = useSearch({ from: '/cm/player/' });
  const lastOpenComw = useAtomValue(cmComLastOpenComwAtom);
  const navigate = useNavigate();
  const endedTick = useAtomValue(cmComAudioPlayerEndedTickAtom);
  const errorTick = useAtomValue(cmComAudioPlayerErrorTickAtom);
  const broadcastSrc = useAtomValue(cmPlayerBroadcastAudioSrcAtom);

  const icoms = useMemo(
    () =>
      (debouncedOpenComListMode === 'fav'
        ? favComws
        : debouncedOpenComListMode === 'sel'
          ? selComws
          : (allIComs ?? [])
      ).filter(com => com.al?.length),
    [allIComs, favComws, debouncedOpenComListMode, selComws],
  );
  const comws = useMemo(() => icoms.map(com => com.w), [icoms]);

  const com = useCmCom(search.comw ?? lastOpenComw ?? icoms[0].w);
  const [src] = com?.audio ?? [''];

  useEffect(resetIsCanPlayEffect, []);

  useEffect(() => {
    if (!com) return;

    if (src) {
      cmComLastOpenComwAtom.set(com.wid);
      cmComAudioPlayerSetSrc(src);
      if (isCanPlay) cmComAudioPlayerSwitchIsPlay(true);
      return;
    }

    navigate({
      to: '/cm/player',
      search: search => {
        if (search.comw == null) return search as never;

        const nextCom = findNextCom(search.comw, icoms);
        if (nextCom == null) return search as never;

        return { ...(search as object), comw: nextCom.w };
      },
    });
  }, [icoms, navigate, src, com]);

  useEffect(() => {
    if (!endedTick && !errorTick) return;

    navigate({
      to: '/cm/player',
      search: search => {
        if (!search.comw) return search as never;

        if (errorTick) {
          const comsWithError = new Set(comsWithErrorAtom.get());
          comsWithError.add(search.comw);
          comsWithErrorAtom.set(comsWithError);
        }

        const nextCom = findNextCom(search.comw, icoms);
        if (!nextCom?.al) return search as never;

        cmComAudioPlayerSetSrc(nextCom.al[0]);

        return { ...(search as object), comw: nextCom.w };
      },
    });

    if (isCanPlay) return setTimeoutEffect(cmComAudioPlayerSwitchIsPlay, 1000, true);
  }, [icoms, navigate, endedTick, errorTick]);

  return (
    <PageContainerConfigurer
      className="com-player"
      withoutBackButton
      withoutBackSwipe
      headTitle={
        com && (
          <>
            #<CmComNumber comw={com.wid} /> {com.name}
          </>
        )
      }
      headClass="mr-3"
      contentClass="p-0"
      head={<CmComListPackKindSelector />}
      content={
        <>
          <DocTitle title={com?.name} />
          {src && (
            <StyledPlayer className="sticky top-0 bg-x2 flex min-h-20 gap-3 px-3 mb-3">
              <CmComAudioPlayerPlayButton
                src={src}
                className="mx-5 scale-300!"
              />

              <CmComAudioPlayerTrack src={src} />
            </StyledPlayer>
          )}
          {com && broadcastSrc && (
            <div className="mb-10">
              <CmComAudioPlayerMarksMovers
                com={com}
                preSwitchTimeAtom={cmComTrackPreSwitchTimeAtom}
                src={broadcastSrc}
                win={openWin}
              />
            </div>
          )}

          <CmComFaceList
            key={openComListMode}
            list={comws}
            importantOnClick={({ defaultClick }) => {
              isCanPlay = true;
              defaultClick();
              cmComAudioPlayerSwitchIsPlay();
            }}
            comDescription={
              !isMobileDevice
                ? com => {
                    return com.al?.map(src => (
                      <Button
                        key={src}
                        icon="Computer"
                        withoutAnimation
                        className={broadcastSrc === src ? 'text-x7' : ''}
                        onClick={async () => {
                          const pack = await getCmComFreshAudioMarksPack(com.w);

                          if (pack == null) {
                            toast(
                              translateBase(it => it.cm.trackMarksNotSetted),
                              makeToastKOMoodConfig(),
                            );
                            return;
                          }

                          cmPlayerBroadcastComwAtom.set(com.w);
                          cmPlayerBroadcastAudioSrcAtom.set(src);
                          cmComAudioPlayerSetSrc(src);

                          navigate({ to: '.', search: { comw: com.w } });

                          if (openWin != null) {
                            openWin.focus();
                            return;
                          }

                          renderComponentInNewWindow({
                            target: 'player-page',
                            reactNode: win => {
                              openWin = win;

                              window.addEventListener('unload', () => win.close());
                              win.addEventListener('unload', () => {
                                openWin = null;
                                cmPlayerBroadcastAudioSrcAtom.set(null);
                              });

                              return <CmPlayerBroadcast />;
                            },
                          });
                        }}
                      />
                    ));
                  }
                : undefined
            }
          />
        </>
      }
    />
  );
};

let openWin: Window | null = null;

const findNextCom = (currentComw: CmComWid, coms: IExportableCom[]) => {
  let isFoundCurrentCom = false;
  const comsWithError = comsWithErrorAtom.get();

  const nextCom = coms.find(com => {
    if (currentComw === com.w) {
      isFoundCurrentCom = true;
      return false;
    }
    return isFoundCurrentCom && !!com.al && !comsWithError.has(com.w);
  });

  if (nextCom == null && coms[0]?.al && !comsWithError.has(coms[0].w)) return coms[0];

  return nextCom;
};

const StyledPlayer = styled.div``;
