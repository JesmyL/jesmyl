import { translateBase } from '#basis/locale';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BroadcastResizableGrid } from '#widgets/broadcast';
import { BroadcastGridTabConfig } from '#widgets/broadcast/model/TabConfig';
import { PresentationsBroadcastTabId } from '$presentations/shared/model/broadcast';
import {
  presentationsBroadcastGridActiveTabiAtom,
  presentationsBroadcastGridSizesAtom,
  presentationsBroadcastGridTabsAtom,
} from '$presentations/shared/state/broadcast.atoms';
import { ReactNode } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { presentationsBroadcastTabConfigDict } from '../const/tabs';
import { usePresentationsBroadcastKeyListener } from '../lib/usePresentationsBroadcastKeyListener';

const config: BroadcastGridTabConfig<PresentationsBroadcastTabId> = {
  gridSizesAtom: presentationsBroadcastGridSizesAtom,
  tabNetAtom: presentationsBroadcastGridTabsAtom,
  activeTabiAtom: presentationsBroadcastGridActiveTabiAtom,
  tabs: presentationsBroadcastTabConfigDict,
  forceShownTabIdSet: new Set<PresentationsBroadcastTabId>([
    PresentationsBroadcastTabId.WorkDir,
    PresentationsBroadcastTabId.Slides,
  ]),
};

export const PresentationsBroadcastControlled = ({ head }: { head?: ReactNode }) => {
  usePresentationsBroadcastKeyListener(window);

  return (
    <PageContainerConfigurer
      className=""
      withoutBackButton
      headTitle={translateBase(BaseLocaleKey.Presentations)}
      head={head}
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
};
