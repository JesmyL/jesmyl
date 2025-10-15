import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { DocTitle } from '#shared/ui/tags/DocTitle';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { CmCom, useCmCom, useCmComList } from '$cm/entities/com';
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
import { useNavigate, useSearch } from '@tanstack/react-router';
import { atom, useAtomValue } from 'atomaric';
import { useEffect, useMemo } from 'react';
import { CmComWid } from 'shared/api';
import styled from 'styled-components';

let isCanPlay = false;
const isOpenAllComsAtom = atom(true, 'com-player:isOpenAllComs');
const comsWithErrorAtom = atom<Set<CmComWid>>(new Set());

const resetIsCanPlayEffect = () => {
  return () => {
    isCanPlay = false;
  };
};

export const CmPlayerPage = () => {
  const { favouriteComsSet, toggleFavourite, favouriteComs } = useCmComFavouriteList();
  const allComs = useCmComList();
  const isOpenAllComs = useAtomValue(isOpenAllComsAtom);
  const coms = useMemo(
    () => (isOpenAllComs ? allComs : favouriteComs).filter(com => com.audio),
    [allComs, favouriteComs, isOpenAllComs],
  );
  const search = useSearch({ from: '/cm/player/' });
  const lastOpenComw = useAtomValue(cmComLastOpenComwAtom);
  const com = useCmCom(search.comw ?? lastOpenComw) ?? (coms[0] as CmCom | und);
  const navigate = useNavigate();
  const endedTick = useAtomValue(cmComAudioPlayerEndedTickAtom);
  const errorTick = useAtomValue(cmComAudioPlayerErrorTickAtom);
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
        <span
          className="flex gap-2"
          onClick={isOpenAllComsAtom.do.toggle}
        >
          <span className={isOpenAllComs ? 'text-x7' : ''}>
            <LazyIcon
              icon="LeftToRightListBullet"
              kind="TwotoneRounded"
            />
          </span>
          {' / '}
          <span className={isOpenAllComs ? '' : 'text-x7'}>
            <LazyIcon
              icon="Star"
              kind="DuotoneRounded"
            />
          </span>
        </span>
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

          <CmComFaceList
            key={+isOpenAllComs}
            list={coms}
            importantOnClick={({ defaultClick }) => {
              isCanPlay = true;
              defaultClick();
              cmComAudioPlayerIsPlayAtom.do.toggle();
            }}
            comDescription={com => {
              return (
                <LazyIcon
                  icon="Star"
                  kind={favouriteComsSet.has(com.wid) ? 'DuotoneRounded' : 'StrokeRounded'}
                  onClick={() => toggleFavourite(com.wid)}
                  withoutAnimation
                />
              );
            }}
          />
        </>
      }
    />
  );
};

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
