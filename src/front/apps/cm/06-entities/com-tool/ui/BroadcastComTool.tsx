import { cmBroadcastBlockAtom } from '$cm/entities/broadcast';
import { useCmComCurrent, useCmComOpenComLinkRendererContext } from '$cm/entities/com';
import { useAtomSet } from 'atomaric';
import { CmComTool } from '../ComTool';

export const CmComToolBroadcast = () => {
  const ccom = useCmComCurrent();
  const setCurrTexti = useAtomSet(cmBroadcastBlockAtom);
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
