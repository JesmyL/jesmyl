import { cmBroadcastCurrentSlideiAtom } from '$cm/entities/broadcast';
import { useCmComCurrent, useCmComOpenComLinkRendererContext } from '$cm/entities/com';
import { CmComTool } from '../ComTool';

export const CmComToolBroadcast = () => {
  const ccom = useCmComCurrent();
  const linkToCom = useCmComOpenComLinkRendererContext();

  return (
    ccom &&
    linkToCom({
      children: (
        <CmComTool
          title="Слайды"
          icon="Computer"
          onClick={cmBroadcastCurrentSlideiAtom.reset}
        />
      ),
      search: {
        comw: ccom.wid,
        tran: '-!-',
      },
    })
  );
};
