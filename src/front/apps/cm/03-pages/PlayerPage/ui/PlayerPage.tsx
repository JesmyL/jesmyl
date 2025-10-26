import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { Button } from '#shared/components/ui/button';
import { ButtonGroup } from '#shared/components/ui/button-group';
import { useDebounceValue } from '#shared/lib/hooks/useDebounceValue';
import { renderComponentInNewWindow } from '#shared/lib/renders';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { DocTitle } from '#shared/ui/tags/DocTitle';
import { CmCom, useCmCom, useCmComList, useCmComSelectedList } from '$cm/entities/com';
import {
  cmComAudioPlayerEndedTickAtom,
  cmComAudioPlayerErrorTickAtom,
  cmComAudioPlayerIsPlayAtom,
  CmComAudioPlayerPlayButton,
  cmComAudioPlayerPlaySrcAtom,
  CmComAudioPlayerTrack,
} from '$cm/entities/com-audio-player';
import { CmComFaceList } from '$cm/entities/com-face';
import { useCmComFavouriteList } from '$cm/entities/com-favourite';
import { cmComLastOpenComwAtom } from '$cm/entities/index';
import { CmComAudioPlayerMarksMovers } from '$cm/ext';
import { getCmComFreshAudioMarksPack } from '$cm/shared/lib/getFresh';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { atom, useAtomValue } from 'atomaric';
import { useEffect, useMemo } from 'react';
import { CmComWid } from 'shared/api';
import { toast } from 'sonner';
import styled from 'styled-components';
import { cmPlayerBroadcastAudioSrcAtom, cmPlayerBroadcastComwAtom } from '../state/atoms';
import { CmPlayerBroadcast } from './Broadcast';

let isCanPlay = false;
const openComListModeAtom = atom<'all' | 'fav' | 'sel'>('all', 'com-player:openComListMode');
const comsWithErrorAtom = atom<Set<CmComWid>>(new Set());
const preSwitchTimeAtom = atom(2);

const resetIsCanPlayEffect = () => {
  return () => {
    isCanPlay = false;
  };
};

export const CmPlayerPage = () => {
  const favouriteComs = useCmComFavouriteList().favouriteComs;
  const selectedComs = useCmComSelectedList().selectedComs;
  const allComs = useCmComList();
  const openComListMode = useAtomValue(openComListModeAtom);
  const debouncedOpenComListMode = useDebounceValue(openComListMode);
  const search = useSearch({ from: '/cm/player/' });
  const lastOpenComw = useAtomValue(cmComLastOpenComwAtom);
  const navigate = useNavigate();
  const endedTick = useAtomValue(cmComAudioPlayerEndedTickAtom);
  const errorTick = useAtomValue(cmComAudioPlayerErrorTickAtom);
  const broadcastSrc = useAtomValue(cmPlayerBroadcastAudioSrcAtom);
  const checkAccess = useCheckUserAccessRightsInScope();

  const coms = useMemo(
    () =>
      (debouncedOpenComListMode === 'fav'
        ? favouriteComs
        : debouncedOpenComListMode === 'sel'
          ? selectedComs
          : allComs
      ).filter(com => com.audio.length),
    [allComs, favouriteComs, debouncedOpenComListMode, selectedComs],
  );

  const com = useCmCom(search.comw ?? lastOpenComw) ?? (coms[0] as CmCom | und);
  const [src] = com?.audio ?? [''];

  useEffect(resetIsCanPlayEffect, []);

  useEffect(() => {
    if (!com) return;

    if (src) {
      cmComLastOpenComwAtom.set(com.wid);
      cmComAudioPlayerPlaySrcAtom.set(src);
      if (isCanPlay) cmComAudioPlayerIsPlayAtom.set(true);
      return;
    }

    navigate({
      to: '/cm/player',
      search: search => {
        if (search.comw == null) return search as never;

        const nextCom = findNextCom(search.comw, coms);
        if (nextCom == null) return search as never;

        return { ...(search as object), comw: nextCom.wid };
      },
    });
  }, [coms, navigate, src, com]);

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

        const nextCom = findNextCom(search.comw, coms);
        if (nextCom == null) return search as never;

        cmComAudioPlayerPlaySrcAtom.set(nextCom.audio[0]);

        return { ...(search as object), comw: nextCom.wid };
      },
    });

    if (isCanPlay) return setTimeoutEffect(cmComAudioPlayerIsPlayAtom.set, 1000, true);
  }, [coms, navigate, endedTick, errorTick]);

  return (
    <PageContainerConfigurer
      className="com-player"
      withoutBackButton
      withoutBackSwipe
      headTitle={com?.name}
      headClass="mr-3"
      contentClass="p-0"
      head={
        <ButtonGroup.Root>
          <Button
            icon="LeftToRightListBullet"
            iconKind="TwotoneRounded"
            className={openComListMode === 'all' ? 'text-x7' : undefined}
            onClick={() => openComListModeAtom.set('all')}
          />

          <Button
            icon="Star"
            iconKind="DuotoneRounded"
            className={openComListMode === 'fav' ? 'text-x7' : undefined}
            onClick={() => openComListModeAtom.set('fav')}
          />

          <Button
            icon="CheckmarkBadge01"
            iconKind="DuotoneRounded"
            className={openComListMode === 'sel' ? 'text-x7' : undefined}
            onClick={() => openComListModeAtom.set('sel')}
          />
        </ButtonGroup.Root>
      }
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
                preSwitchTimeAtom={preSwitchTimeAtom}
                src={broadcastSrc}
                win={openWin}
              />
            </div>
          )}

          <CmComFaceList
            key={openComListMode}
            list={coms}
            importantOnClick={({ defaultClick }) => {
              isCanPlay = true;
              defaultClick();
              cmComAudioPlayerIsPlayAtom.do.toggle();
            }}
            comDescription={
              checkAccess('general', 'ALL')
                ? com => {
                    return com.audio.map(src => (
                      <Button
                        key={src}
                        icon="Computer"
                        withoutAnimation
                        className={broadcastSrc === src ? 'text-x7' : undefined}
                        onClick={async () => {
                          const pack = await getCmComFreshAudioMarksPack(src);

                          if (pack == null) {
                            toast('Для этого трека маркеры не установлены', makeToastKOMoodConfig());
                            return;
                          }

                          cmPlayerBroadcastComwAtom.set(com.wid);
                          cmComAudioPlayerPlaySrcAtom.set(src);
                          cmPlayerBroadcastAudioSrcAtom.set(src);

                          navigate({ to: '.', search: { comw: com.wid } });

                          if (openWin != null) {
                            openWin.focus();
                            return;
                          }

                          renderComponentInNewWindow(win => {
                            openWin = win;

                            window.addEventListener('unload', () => win.close());
                            win.addEventListener('unload', () => {
                              openWin = null;
                              cmPlayerBroadcastAudioSrcAtom.set(null);
                            });

                            return <CmPlayerBroadcast />;
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

const findNextCom = (currentComw: CmComWid, coms: CmCom[]) => {
  let isFoundCurrentCom = false;
  const comsWithError = comsWithErrorAtom.get();

  const nextCom = coms.find(com => {
    if (currentComw === com.wid) {
      isFoundCurrentCom = true;
      return false;
    }
    return isFoundCurrentCom && !!com.audio && !comsWithError.has(com.wid);
  });

  if (nextCom == null && coms[0]?.audio && !comsWithError.has(coms[0].wid)) return coms[0];

  return nextCom;
};

const StyledPlayer = styled.div``;
