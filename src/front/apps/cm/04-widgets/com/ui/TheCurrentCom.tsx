import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { CmComOrderList } from '$cm/entities/com-order';
import {
  cmComChordHardLevelAtom,
  cmComChordVisibleVariantAtom,
  cmComFontSizeAtom,
  cmComIsComMiniAnchorAtom,
} from '$cm/entities/index';
import { useAtomValue } from 'atomaric';
import { CmCom } from 'shared/const/cm/Com';

export const TheCmComCurrent = ({ com }: { com: CmCom }) => {
  const fontSize = useAtomValue(cmComFontSizeAtom);
  const chordVisibleVariant = useAtomValue(cmComChordVisibleVariantAtom);
  const isMiniAnchor = useAtomValue(cmComIsComMiniAnchorAtom);
  const chordHardLevel = useAtomValue(cmComChordHardLevelAtom);

  return (
    <CmComOrderList
      com={com}
      fontSize={fontSize}
      chordVisibleVariant={chordVisibleVariant ?? ChordVisibleVariant.Minimal}
      isMiniAnchor={isMiniAnchor}
      chordHardLevel={chordHardLevel}
    />
  );
};
