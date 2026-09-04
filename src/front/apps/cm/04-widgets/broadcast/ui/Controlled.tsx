import { translateBase } from '#basis/locale';
import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BroadcastResizableGrid } from '#widgets/broadcast';
import { BroadcastGridTabConfig } from '#widgets/broadcast/model/TabConfig';
import { cmComLastOpenComwAtom } from '$cm/entities/index';
import { useCmBroadcastScreenComNavigationComws } from '$cm/features/broadcast';
import { CmBroadcastTabId } from '$cm/shared/model/broadcast';
import {
  cmBroadcastGridActiveTabiAtom,
  cmBroadcastGridSizesAtom,
  cmBroadcastGridTabsAtom,
} from '$cm/shared/state/broadcast.atoms';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { ReactNode, useEffect } from 'react';
import { CmComWid } from 'shared/api';
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
};

export function CmBroadcastControlled(props: Props) {
  const navigate = useNavigate();
  const { comPack, comws } = useCmBroadcastScreenComNavigationComws();
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
  const ccomw = useAtomValue(cmComLastOpenComwAtom);

  useEffect(() => {
    navigate({
      to: '.',
      search: prev => ({ ...(prev as object), comw: ccomw }) as object,
    });
  }, [ccomw, navigate]);

  useCmBroadcastScreenKeyDownListen(window, currentConfigi);

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
