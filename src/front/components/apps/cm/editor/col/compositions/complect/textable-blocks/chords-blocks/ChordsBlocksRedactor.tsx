import { useEditableCcom } from '../../../useEditableCcom';
import CmChordsBlockRedactor from './ChordsBlockRedactor';

export default function CmChordsBlocksRedactor() {
  const ccom = useEditableCcom();

  if (!ccom) return null;

  const textList = ccom.transposedBlocks();

  return (
    <>
      {(textList?.length ? textList : ['']).map((text, texti) => {
        return (
          <CmChordsBlockRedactor
            key={texti}
            text={text}
            texti={texti}
            ccom={ccom}
          />
        );
      })}
    </>
  );
}
