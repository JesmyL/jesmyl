import { useEditableCcom } from '../../../../lib/useEditableCom';
import { CmChordsBlockRedactor } from './ChordsBlockRedactor';

export const CmChordsBlocksRedactorTab = () => {
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
};
