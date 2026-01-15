import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { cmBroadcastBlockAtom } from '$cm/entities/broadcast';
import { useCmComCurrent } from '$cm/entities/com';
import { useCmBroadcastScreenConfigs } from '$cm/widgets/broadcast';
import { useAtomValue } from 'atomaric';
import { useMemo } from 'react';
import { CmBroadcastGroupedSlide } from 'shared/model/cm/broadcast';

export const useCmBroadcastMinimalConfigSlides = (selfConfigi: number) => {
  const currentBlocki = useAtomValue(cmBroadcastBlockAtom);
  const com = useCmComCurrent();
  const configs = useCmBroadcastScreenConfigs();

  const { isBeats, minimalSlides, minimalConfigi } = useMemo(() => {
    const result = {
      minimalSlides: [] as CmBroadcastGroupedSlide[],
      isBeats: false,
      minimalConfigi: 0,
    };

    if (com == null) return result;

    result.minimalConfigi =
      (configs.findIndex(config => config.pushKind === '1') + 1 ||
        configs.findIndex(config => config.pushKind === '2') + 1 ||
        currentBroadcastConfigiAtom.get() + 1) - 1;

    if (configs[result.minimalConfigi].pushKind === '1') {
      if (configs[selfConfigi].pushKind === '2') result.isBeats = true;

      result.minimalSlides = com.makeExpandedSolidFragmentedSlides(com.makeExpandedSolidTextLines());
    } else {
      const minimalGroupedTexts = com.groupTextLinesByKind(
        com.takeSolidTextLines(true),
        configs[result.minimalConfigi]?.pushKind,
      );
      result.minimalSlides = com.groupSlideListByKind(minimalGroupedTexts);
    }

    return result;
  }, [com, configs, selfConfigi]);

  const result = {
    currentBlocki: 0,
    minimalSlides,
    selfSlides: [] as CmBroadcastGroupedSlide[],
    selfConfig: configs[selfConfigi],
    isBeats,
  };

  if (com == null) return result;

  if (selfConfigi === minimalConfigi) {
    result.currentBlocki = currentBlocki;
    result.selfSlides = minimalSlides;
  } else {
    const currentGroupedTexts = com.groupTextLinesByKind(com.takeSolidTextLines(true), configs[selfConfigi]?.pushKind);
    const currentGroupedLines = (result.selfSlides = com.groupSlideListByKind(currentGroupedTexts));
    const minimalFromLinei = minimalSlides[currentBlocki]?.fromLinei;

    result.currentBlocki = currentGroupedLines.findIndex(
      ({ fromLinei, toLinei }) => minimalFromLinei >= fromLinei && minimalFromLinei < toLinei,
    );
  }

  return result;
};
