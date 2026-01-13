import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { HorizontalDirection } from '#shared/model/Direction';
import { cmBroadcastBlockAtom, cmBroadcastSwitchBlockDirectionAtom } from '$cm/entities/broadcast';
import { useAtomValue } from 'atomaric';
import { useCmBroadcastMinimalConfigLines } from './useCmBroadcastMinimalConfigLines';

export const useCmBroadcastScreenComTextNavigations = () => {
  const currTexti = useAtomValue(cmBroadcastBlockAtom);
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
  const { minimalLines } = useCmBroadcastMinimalConfigLines(currentConfigi);

  const state = {
    text: minimalLines[currTexti]?.lines.join('\n'),
    currTexti,
    nextText: () => {
      if (currTexti < minimalLines.length - 1) state.setTexti(currTexti + 1);
    },
    prevText: () => {
      if (currTexti > 0) state.setTexti(currTexti - 1);
    },
    setTexti: (texti: number) => {
      cmBroadcastSwitchBlockDirectionAtom.set(
        cmBroadcastBlockAtom.get() > texti ? HorizontalDirection.RightToLeft : HorizontalDirection.LeftToRight,
      );

      cmBroadcastBlockAtom.set(texti);
      const nextd = window.document.getElementById(`broadcast-window-line-${texti}`);

      if (nextd) {
        const nextParent = nextd.parentElement;
        if (nextParent) nextParent.scrollLeft = nextd.offsetLeft + nextd.clientWidth / 2 - nextParent.clientWidth / 2;
      }
    },
  };

  return state;
};
