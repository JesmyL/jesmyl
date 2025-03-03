import { useEditableCcom } from '../../../../lib/useEditableCom';
import { CmTextBlockRedactor } from './TextBlockRedactor';

export const CmTextBlocksRedactorTab = () => {
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
