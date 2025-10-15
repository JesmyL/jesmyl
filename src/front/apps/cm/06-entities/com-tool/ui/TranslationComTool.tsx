import { useCmComCurrent, useCmComOpenComLinkRendererContext } from '$cm/entities/com';
import { cmTranslationBlockAtom } from '$cm/entities/translation';
import { useAtomSet } from 'atomaric';
import { CmComTool } from '../ComTool';

export const CmComToolTranslation = () => {
  const ccom = useCmComCurrent();
  const setCurrTexti = useAtomSet(cmTranslationBlockAtom);
  const linkToCom = useCmComOpenComLinkRendererContext();

  return (
    ccom &&
    linkToCom({
      children: (
        <CmComTool
          title="Слайды"
          icon="Computer"
          onClick={() => setCurrTexti(0)}
        />
      ),
      search: {
        comw: ccom.wid,
        tran: '-!-',
      },
    })
  );
};
