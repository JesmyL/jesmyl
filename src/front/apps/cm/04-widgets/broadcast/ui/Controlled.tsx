import { translateBase } from '#basis/locale';
import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { useCmRemoteBroadcast } from '#features/broadcast/remote/hooks';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BroadcastResizableGrid } from '#widgets/broadcast';
import { BroadcastGridTabConfig } from '#widgets/broadcast/model/TabConfig';
import { cmComLastOpenComwAtom, useCmCom, useCmComIComList } from '$cm/entities/com';
import { useCmBroadcastScreenComNavigationComws, useCmBroadcastSlidesContext } from '$cm/features/broadcast';
import { CmBroadcastTabId } from '$cm/shared/model/broadcast';
import {
  cmBroadcastGridActiveTabiAtom,
  cmBroadcastGridSizesAtom,
  cmBroadcastGridTabsAtom,
} from '$cm/shared/state/broadcast.atoms';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { ReactNode, useEffect, useMemo } from 'react';
import { CmComWid, IExportableCom } from 'shared/api';
import { RemoteBroadcastComItem } from 'shared/api/tsjrpc.electtron/remote-broadcast';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { cmBroadcastTabConfigDict } from '../const/tabs';
import { useCmBroadcastScreenKeyDownListen } from '../lib/useCmBroadcastScreenKeyDownListen';

interface Props {
  head?: ReactNode;
  comws?: CmComWid[];
  headTitle?: ReactNode;
  backButtonPath?: string;
}

const config: BroadcastGridTabConfig<CmBroadcastTabId> = {
  gridSizesAtom: cmBroadcastGridSizesAtom,
  tabNetAtom: cmBroadcastGridTabsAtom,
  activeTabiAtom: cmBroadcastGridActiveTabiAtom,
  tabs: cmBroadcastTabConfigDict,
  forceShownTabIdSet: new Set(),
};

const toRemoteComItems = (icoms?: IExportableCom[] | nil): RemoteBroadcastComItem[] =>
  icoms?.map(com => ({ comw: com.w, name: com.n })) ?? [];

export function CmBroadcastControlled(props: Props) {
  const navigate = useNavigate();
  const { comPack, comws, allIComs, favComws, selComws, cachedComws } = useCmBroadcastScreenComNavigationComws();
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
  const ccomw = useAtomValue(cmComLastOpenComwAtom);

  useEffect(() => {
    navigate({
      to: '.',
      search: prev => ({ ...(prev as object), comw: ccomw }) as object,
    });
  }, [ccomw, navigate]);

  useCmBroadcastScreenKeyDownListen(window, currentConfigi);

  const slidesContext = useCmBroadcastSlidesContext();
  const com = useCmCom(ccomw);
  const eventIComs = useCmComIComList(comPack.comws);
  const favIComs = useCmComIComList(favComws);
  const selIComs = useCmComIComList(selComws);
  const cachedIComs = useCmComIComList(cachedComws);
  const remoteLists = useMemo(
    () => ({
      all: toRemoteComItems(eventIComs),
      fav: toRemoteComItems(favIComs),
      sel: toRemoteComItems(selIComs),
      cached: toRemoteComItems(cachedIComs),
    }),
    [eventIComs, favIComs, selIComs, cachedIComs],
  );
  const remoteSlides = useMemo(() => slidesContext.slides.map(slide => slide?.text ?? ''), [slidesContext.slides]);

  useCmRemoteBroadcast(
    {
      comw: ccomw ?? 0,
      comTitle: com?.name ?? '',
      lists: remoteLists,
      slidei: slidesContext.slidei,
      slides: remoteSlides,
    },
    {
      toSlide: slidesContext.toSlide,
      setSlidei: slidesContext.setSlidei,
      selectCom: comw => {
        const targetCom = allIComs?.find(icom => icom.w === comw);
        if (!targetCom) return;

        cmComLastOpenComwAtom.set(targetCom.w);
        slidesContext.setSlidei(0);
      },
    },
  );

  return (
    <PageContainerConfigurer
      className=""
      backButtonRender={(linkRef, backButtonNode) => (
        <Link
          to="."
          ref={linkRef}
          search={prev => ({
            ...(prev as object),
            comw: prev.comw ?? comws[0],
            tran: undefined,
          })}
        >
          {backButtonNode}
        </Link>
      )}
      headTitle={
        props.headTitle ? (
          <>
            {props.headTitle}
            {comPack.pageTitlePostfix}
          </>
        ) : (
          <>
            {translateBase(BaseLocaleKey.Broadcast)}
            {comPack.pageTitlePostfix}
          </>
        )
      }
      head={props.head}
      content={
        <div
          className="w-full h-full"
          st-hide-footer-menu=""
        >
          <BroadcastResizableGrid config={config} />
        </div>
      }
    />
  );
}
