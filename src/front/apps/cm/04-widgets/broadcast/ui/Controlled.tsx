import { translateBase } from '#basis/locale';
import { useScreenBroadcastFaceLineListeners } from '#features/broadcast/complect/config-line/hooks/listeners';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BroadcastResizableGrid } from '#widgets/broadcast';
import { BroadcastGridTabConfig } from '#widgets/broadcast/model/TabConfig';
import { useCmBroadcastScreenComNavigationComws } from '$cm/features/broadcast';
import { CmBroadcastTabId } from '$cm/shared/model/broadcast';
import {
  cmBroadcastGridActiveTabiAtom,
  cmBroadcastGridSizesAtom,
  cmBroadcastGridTabsAtom,
} from '$cm/shared/state/broadcast.atoms';
import { Link } from '@tanstack/react-router';
import { ReactNode } from 'react';
import { CmComWid } from 'shared/api';
import { cmBroadcastTabConfigDict } from '../const/tabs';
import { useCmBroadcastScreenKeyDownListen } from '../lib/keydown-listen';

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
};

export function CmBroadcastControlled(props: Props) {
  const { comPack, comws } = useCmBroadcastScreenComNavigationComws();

  useScreenBroadcastFaceLineListeners();

  useCmBroadcastScreenKeyDownListen();

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
            {translateBase(it => it.broadcast)}
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
