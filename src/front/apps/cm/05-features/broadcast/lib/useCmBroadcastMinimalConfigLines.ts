import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { cmBroadcastBlockAtom } from '$cm/entities/broadcast';
import { useCmComCurrent } from '$cm/entities/com';
import { useCmBroadcastScreenConfigs } from '$cm/widgets/broadcast';
import { useAtomValue } from 'atomaric';
import { CmBroadcastSlideGrouperLinesDiapason } from 'shared/model/cm/broadcast';

export const useCmBroadcastMinimalConfigLines = (selfConfigi: number) => {
  const currentBlocki = useAtomValue(cmBroadcastBlockAtom);
  const com = useCmComCurrent();
  const configs = useCmBroadcastScreenConfigs();

  const result = {
    blocki: 0,
    minimalLines: [] as CmBroadcastSlideGrouperLinesDiapason[],
    selfLines: [] as CmBroadcastSlideGrouperLinesDiapason[],
    config: configs[selfConfigi],
  };

  if (com == null) return result;

  const minimalConfigi =
    (configs.findIndex(config => config.pushKind === '2') + 1 || currentBroadcastConfigiAtom.get() + 1) - 1;

  const minimalGroupedTexts = com.groupTextLinesByKind(com.takeSolidTextLines(true), configs[minimalConfigi]?.pushKind);
  const minimalGroupedLines = (result.minimalLines = result.selfLines = com.groupSlideListByKind(minimalGroupedTexts));

  if (selfConfigi === minimalConfigi) {
    result.blocki = currentBlocki;
  } else {
    const currentGroupedTexts = com.groupTextLinesByKind(com.takeSolidTextLines(true), configs[selfConfigi]?.pushKind);
    const currentGroupedLines = (result.selfLines = com.groupSlideListByKind(currentGroupedTexts));
    const minimalFromLinei = minimalGroupedLines[currentBlocki].fromLinei;

    result.blocki = currentGroupedLines.findIndex(
      ({ fromLinei, toLinei }) => minimalFromLinei >= fromLinei && minimalFromLinei < toLinei,
    );
  }

  return result;
};
