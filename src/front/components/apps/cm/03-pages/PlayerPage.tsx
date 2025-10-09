import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { DocTitle } from '#shared/ui/tags/DocTitle';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useCom } from '$cm/basis/lib/com-selections';
import { useComs } from '$cm/basis/lib/coms-selections';
import {
  comPlayerEndedTickAtom,
  comPlayerErrorTickAtom,
  comPlayerIsPlayAtom,
  comPlayerPlaySrcAtom,
} from '$cm/basis/lib/control/current-play-com';
import { cmLastOpenComwAtom } from '$cm/basis/lib/store/atoms';
import { Com } from '$cm/col/com/Com';
import { ComFaceList } from '$cm/col/com/face/list/ComFaceList';
import { ComPlayerPlayButton } from '$cm/col/com/player/ComPlayerPlayButton';
import { ComPlayerTrack } from '$cm/col/com/player/ComPlayerTrack';
import { useFavouriteComs } from '$cm/lists/favourites/useFavouriteComs';
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
  const { favouriteComsSet, toggleFavourite, favouriteComs } = useFavouriteComs();
  const allComs = useComs();
  const isOpenAllComs = useAtomValue(isOpenAllComsAtom);
  const coms = useMemo(
    () => (isOpenAllComs ? allComs : favouriteComs).filter(com => com.audio),
    [allComs, favouriteComs, isOpenAllComs],
  );
  const search = useSearch({ from: '/cm/player/' });
  const lastOpenComw = useAtomValue(cmLastOpenComwAtom);
  const com = useCom(search.comw ?? lastOpenComw) ?? (coms[0] as Com | und);
  const navigate = useNavigate();
  const endedTick = useAtomValue(comPlayerEndedTickAtom);
  const errorTick = useAtomValue(comPlayerErrorTickAtom);
  const [src] = com?.audio ?? [''];

  useEffect(resetIsCanPlayEffect, []);

  useEffect(() => {
    if (!com) return;

    if (src) {
      cmLastOpenComwAtom.set(com.wid);
      comPlayerPlaySrcAtom.set(src);
      if (isCanPlay) comPlayerIsPlayAtom.set(true);
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

        comPlayerPlaySrcAtom.set(nextCom.audio[0]);

        return { ...(search as object), comw: nextCom.wid };
      },
    });

    if (isCanPlay) return setTimeoutEffect(comPlayerIsPlayAtom.set, 1000, true);
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
          <StyledPlayer className="sticky top-0 bg-x2 flex min-h-20 gap-3 px-3 mb-3">
            {src && (
              <ComPlayerPlayButton
                src={src}
                className="mx-5 scale-300!"
              />
            )}

            <ComPlayerTrack src={src} />
          </StyledPlayer>

          <ComFaceList
            key={+isOpenAllComs}
            list={coms}
            importantOnClick={({ defaultClick }) => {
              isCanPlay = true;
              defaultClick();
              comPlayerIsPlayAtom.do.toggle();
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

const findNextCom = (currentComw: CmComWid, coms: Com[]) => {
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
