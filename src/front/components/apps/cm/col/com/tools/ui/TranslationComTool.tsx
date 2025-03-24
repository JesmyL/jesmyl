import { useAtomSet } from '#shared/lib/atom';
import { translationBlockAtom } from '$cm/atoms';
import { useCcom } from '$cm/basis/lib/com-selections';
import { useCmOpenComLinkRendererContext } from '$cm/basis/lib/contexts/current-com-list';
import { ComTool } from '../ComTool';

export const TranslationComTool = () => {
  const ccom = useCcom();
  const setCurrTexti = useAtomSet(translationBlockAtom);
  const linkToCom = useCmOpenComLinkRendererContext();

  return (
    ccom &&
    linkToCom({
      children: (
        <ComTool
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
