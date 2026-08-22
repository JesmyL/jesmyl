import { translateBase } from '#basis/locale';
import { cmBroadcastCurrentSlideiAtom } from '$cm/entities/broadcast';
import { useCmComCurrent } from '$cm/entities/com';
import { Link } from '@tanstack/react-router';
import { MenuComToolName } from 'shared/api';
import { CmComTool } from '../ComTool';

export const CmComToolBroadcast = () => {
  const ccom = useCmComCurrent();

  return (
    <Link
      to="."
      search={prev => ({ ...(prev as object), comw: ccom?.wid, tran: '-!-' })}
    >
      <CmComTool
        title={translateBase(it => it.cm.com.tool[MenuComToolName.ShowTranslation])}
        icon="Computer"
        onClick={cmBroadcastCurrentSlideiAtom.reset}
      />
    </Link>
  );
};
