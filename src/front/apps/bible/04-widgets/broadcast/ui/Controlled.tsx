import { translateBase } from '#basis/locale';
import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BroadcastResizableGrid } from '#widgets/broadcast';
import { BroadcastGridTabConfig } from '#widgets/broadcast/model/TabConfig';
import { bibleBroadcastTabConfigDict } from '$bible/shared/const';
import { useBiblePrintShowSlideAddressCode } from '$bible/shared/hooks/slide-sync';
import { useBibleBroadcastKeyListener } from '$bible/shared/lib/useBibleBroadcastKeyListener';
import { BibleBroadcastTabId } from '$bible/shared/model/broadcast';
import {
  bibleBroadcastGridActiveTabiAtom,
  bibleBroadcastGridSizesAtom,
  bibleBroadcastGridTabsAtom,
} from '$bible/shared/state';
import { useAtomValue } from 'atomaric';
import { ReactNode, useEffect } from 'react';

interface Props {
  head: ReactNode;
  headTitle: ReactNode;
}

const config: BroadcastGridTabConfig<BibleBroadcastTabId> = {
  gridSizesAtom: bibleBroadcastGridSizesAtom,
  tabNetAtom: bibleBroadcastGridTabsAtom,
  activeTabiAtom: bibleBroadcastGridActiveTabiAtom,
  tabs: bibleBroadcastTabConfigDict,
};

export const BibleBroadcastControlled = ({ head, headTitle }: Props) => {
  const printShowAddress = useBiblePrintShowSlideAddressCode();
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);

  useBibleBroadcastKeyListener(window, currentConfigi);

  useEffect(() => {
    printShowAddress();
  }, [printShowAddress]);

  return (
    <PageContainerConfigurer
      className=""
      headTitle={headTitle ?? translateBase(it => it.bible.t)}
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
