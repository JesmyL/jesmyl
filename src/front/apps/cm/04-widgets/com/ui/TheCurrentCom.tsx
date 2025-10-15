import { CmCom, useCmComChordVisibleVariant } from '$cm/entities/com';
import { CmComOrderList } from '$cm/entities/com-order';
import { cmComFontSizeAtom, cmComIsComMiniAnchorAtom } from '$cm/entities/index';
import { ChordVisibleVariant } from '$cm/shared/model';
import { useAtomValue } from 'atomaric';

export const TheCmComCurrent = ({ com }: { com: CmCom }) => {
  const fontSize = useAtomValue(cmComFontSizeAtom);
  const [chordVisibleVariant] = useCmComChordVisibleVariant();
  const isMiniAnchor = useAtomValue(cmComIsComMiniAnchorAtom);

  return (
    <CmComOrderList
      com={com}
      fontSize={fontSize}
      chordVisibleVariant={chordVisibleVariant ?? ChordVisibleVariant.Minimal}
      isMiniAnchor={isMiniAnchor}
    />
  );
};
