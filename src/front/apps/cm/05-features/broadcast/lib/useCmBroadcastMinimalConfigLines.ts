import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { cmBroadcastCurrentSlideiAtom } from '$cm/entities/broadcast';
import { useCmComCurrent } from '$cm/entities/com';
import { cmConstantsConfigAtom } from '$cm/ext';
import { CmBroadcastShowChordedSlideMode } from '$cm/shared/model';
import { cmShowChordedSlideModeAtom } from '$cm/shared/state';
import { useCmBroadcastScreenConfigs } from '$cm/widgets/broadcast';
import { useAtomValue } from 'atomaric';
import { useMemo } from 'react';
import { CmComIntensityLevel } from 'shared/api';
import { CmBroadcastMonolineSlide } from 'shared/model/cm/broadcast';

export const useCmBroadcastMinimalConfigSlides = (selfConfigi: number) => {
  const currentSlidei = useAtomValue(cmBroadcastCurrentSlideiAtom);
  const com = useCmComCurrent();
  const configs = useCmBroadcastScreenConfigs();
  const showChordedSlideMode = useAtomValue(cmShowChordedSlideModeAtom);

  const { showFragmentSlidesBelow } = useAtomValue(cmConstantsConfigAtom);
  const isCantShowFragments = (com?.top.d ?? CmComIntensityLevel.Medium) >= showFragmentSlidesBelow;

  const { minimalSlides, minimalConfigi } = useMemo(() => {
    const result = {
      minimalSlides: [] as CmBroadcastMonolineSlide[],
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
      const minimalGroupedTexts = com.groupSlideLinesByKind(
        com.makeExpandedSolidSlides(),
        com.broadcastPushKind('k2', null!) ?? com.broadcastPushKind('k'),
      );
      result.minimalSlides = com.groupSlideListByKind(minimalGroupedTexts);
    }

    return result;
  }, [com, configs, isCantShowFragments]);

  const result = {
    currentSlidei,
    nextSlidei: currentSlidei + 1,
    minimalSlides,
    selfSlides: [] as CmBroadcastMonolineSlide[],
    selfConfig: configs[selfConfigi],
    isFragments: false,
  };

  if (com == null) return result;

  if (isCantShowFragments || selfConfigi !== minimalConfigi) {
    const currentGroupedTexts = com.groupSlideLinesByKind(
      com.makeExpandedSolidSlides(),
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

  const currentSlides = result.minimalSlides.length ? result.minimalSlides : result.selfSlides;

  if (
    (showChordedSlideMode === CmBroadcastShowChordedSlideMode.Hide ||
      showChordedSlideMode === CmBroadcastShowChordedSlideMode.Pass) &&
    currentSlides[result.nextSlidei] != null &&
    !currentSlides[result.nextSlidei].ord.isRealText()
  ) {
    result.nextSlidei = currentSlides.findIndex(
      (slide, slidei) => slidei > result.nextSlidei && slide.ord.isRealText(),
    );
  }

  return result;
};
