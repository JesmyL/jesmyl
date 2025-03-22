import { useEditableCcom } from '$cm+editor/basis/lib/hooks/useEditableCom';
import { CmChordsBlockRedactor } from '$cm+editor/entities/ChordsBlockRedactor';

export const CmEditorTabComChordsBlocks = () => {
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
