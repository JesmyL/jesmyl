import { translateBase } from '#basis/locale';
import { cmBroadcastCurrentSlideiAtom } from '$cm/entities/broadcast';
import { useCmComCurrent, useCmComOpenComLinkRendererContext } from '$cm/entities/com';
import { MenuComToolName } from 'shared/api';
import { CmComTool } from '../ComTool';

export const CmComToolBroadcast = () => {
  const ccom = useCmComCurrent();
  const linkToCom = useCmComOpenComLinkRendererContext();

  return linkToCom({
    children: (
      <CmComTool
        title={translateBase(it => it.cm.com.tool[MenuComToolName.ShowTranslation])}
        icon="Computer"
        onClick={cmBroadcastCurrentSlideiAtom.reset}
      />
    ),
    search: {
      comw: ccom?.wid,
      tran: '-!-',
    },
  });
};
