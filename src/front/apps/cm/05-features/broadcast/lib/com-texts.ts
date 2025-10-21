import { useCmBroadcastBlock } from '$cm/entities/broadcast';
import { useCmBroadcastCurrentScreenConfig } from '$cm/widgets/broadcast';
import { useCmBroadcastCurrentComTexts } from './get-com-text';

export const useCmBroadcastScreenComTextNavigations = () => {
  const [currTexti, setCurrTexti] = useCmBroadcastBlock();
  const texts = useCmBroadcastCurrentComTexts(useCmBroadcastCurrentScreenConfig()?.pushKind);

  const state = {
    text: texts?.[currTexti],
    currTexti,
    nextText: () => {
      if (texts && currTexti < texts.length - 1) state.setTexti(currTexti + 1);
    },
    prevText: () => {
      if (currTexti > 0) state.setTexti(currTexti - 1);
    },
    setTexti: (texti: number) => {
      setCurrTexti(texti);
      const nextd = window.document.getElementById(`broadcast-window-line-${texti}`);

      if (nextd) {
        const nextParent = nextd.parentElement;
        if (nextParent) nextParent.scrollLeft = nextd.offsetLeft + nextd.clientWidth / 2 - nextParent.clientWidth / 2;
      }
    },
  };

  return state;
};
