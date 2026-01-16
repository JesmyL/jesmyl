import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { cmBroadcastCurrentSlideiAtom } from '$cm/entities/broadcast';
import { useCmComCurrent } from '$cm/entities/com';
import { cmConstantsConfigAtom } from '$cm/ext';
import { useCmBroadcastScreenConfigs } from '$cm/widgets/broadcast';
import { useAtomValue } from 'atomaric';
import { useMemo } from 'react';
import { CmComIntensityLevel } from 'shared/api';
import { CmBroadcastGroupedSlide } from 'shared/model/cm/broadcast';

export const useCmBroadcastMinimalConfigSlides = (selfConfigi: number) => {
  const currentSlidei = useAtomValue(cmBroadcastCurrentSlideiAtom);
  const com = useCmComCurrent();
  const configs = useCmBroadcastScreenConfigs();

  const { showFragmentSlidesBelow } = useAtomValue(cmConstantsConfigAtom);
  const isCantShowFragments = (com?.top.d ?? CmComIntensityLevel.Medium) >= showFragmentSlidesBelow;

  const { minimalSlides, minimalConfigi } = useMemo(() => {
    const result = {
      minimalSlides: [] as CmBroadcastGroupedSlide[],
      minimalConfigi: 0,
    };

    if (isCantShowFragments || com == null) return result;

    result.minimalConfigi ||= configs.findIndex(config => config.pushKind === '1') + 1;
    result.minimalConfigi ||= currentBroadcastConfigiAtom.get() + 1;

    result.minimalConfigi--;

    const minimalConfig = configs[result.minimalConfigi];

    if (minimalConfig == null) return result;

    if (minimalConfig.pushKind === '1') {
      result.minimalSlides = com.makeExpandedSolidFragmentedSlides(com.makeExpandedSolidTextLines());
    } else {
      const minimalGroupedTexts = com.groupTextLinesByKind(com.takeSolidTextLines(true), '3'); // minimalConfig.pushKind);
      result.minimalSlides = com.groupSlideListByKind(minimalGroupedTexts);
    }

    return result;
  }, [com, configs, isCantShowFragments]);

  const result = {
    currentSlidei,
    minimalSlides,
    selfSlides: [] as CmBroadcastGroupedSlide[],
    selfConfig: configs[selfConfigi],
    isFragments: false,
  };

  if (com == null) return result;

  if (isCantShowFragments || selfConfigi !== minimalConfigi) {
    const currentGroupedTexts = com.groupTextLinesByKind(
      com.takeSolidTextLines(true),
      configs[selfConfigi]?.pushKind === '2'
        ? (com.broadcastPushKind('k2', null!) ?? com.broadcastPushKind('k'))
        : com.broadcastPushKind('k'),
    );
    const currentGroupedLines = (result.selfSlides = com.groupSlideListByKind(currentGroupedTexts));
    const minimalFromLinei = minimalSlides[currentSlidei]?.fromLinei;

    if (isCantShowFragments) {
      result.minimalSlides = result.selfSlides;
    } else
      result.currentSlidei = currentGroupedLines.findIndex(
        ({ fromLinei, toLinei }) => minimalFromLinei >= fromLinei && minimalFromLinei < toLinei,
      );
  } else {
    result.currentSlidei = currentSlidei;
    result.selfSlides = minimalSlides;
  }

  if (!isCantShowFragments) result.isFragments = configs[selfConfigi]?.pushKind === '1';

  return result;
};
