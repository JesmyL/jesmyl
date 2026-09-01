import { translateBase } from '#basis/locale';
import { useScreenBroadcastFaceLineListeners } from '#features/broadcast/complect/config-line/hooks/listeners';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BroadcastResizableGrid } from '#widgets/broadcast';
import { BroadcastGridTabConfig } from '#widgets/broadcast/model/TabConfig';
import { bibleBroadcastTabConfigDict } from '$bible/shared/const';
import { useBiblePrintShowSlideAddressCode } from '$bible/shared/hooks/slide-sync';
import { BibleBroadcastTabId } from '$bible/shared/model/broadcast';
import {
  bibleBroadcastGridActiveTabiAtom,
  bibleBroadcastGridSizesAtom,
  bibleBroadcastGridTabsAtom,
} from '$bible/shared/state';
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

  useScreenBroadcastFaceLineListeners();

  useEffect(() => {
    printShowAddress();
  }, [printShowAddress]);

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(window, 'keydown', event => {
          switch (event.code) {
            case 'F2':
            case 'F3':
            case 'F4':
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight':
              event.preventDefault();
              return;
          }
        }),
      )
      .effect();
  }, []);

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
