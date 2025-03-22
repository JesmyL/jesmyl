import { useEditableCcom } from '$cm+editor/basis/lib/hooks/useEditableCom';
import { CmTextBlockRedactor } from '$cm+editor/entities/TextBlockRedactor';

export const CmEditorTabTextBlocks = () => {
  const ccom = useEditableCcom();

  if (!ccom) return null;

  return (
    <>
      {(ccom.texts?.length ? ccom.texts : ['']).map((text, texti) => {
        return (
          <CmTextBlockRedactor
            key={texti}
            ccom={ccom}
            text={text}
            texti={texti}
          />
        );
      })}
    </>
  );
};
