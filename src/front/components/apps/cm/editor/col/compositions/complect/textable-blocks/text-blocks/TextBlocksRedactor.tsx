import { useEditableCcom } from '../../../useEditableCcom';
import { CmTextBlockRedactor } from './TextBlockRedactor';

export const CmTextBlocksRedactor = () => {
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
