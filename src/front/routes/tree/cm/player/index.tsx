import { CmPlayerPage } from '$cm/pages/PlayerPage';
import { createFileRoute } from '@tanstack/react-router';
import { CmAudioTail, CmComWid, parseCmAudioTail } from 'shared/api';
import { checkIsString } from 'shared/utils/checkIs';

export const Route = createFileRoute('/cm/player/')({
  component: RouteComponent,
  validateSearch: (search): { comw?: CmComWid; coml?: CmAudioTail } => {
    return {
      comw: (+search.comw! as CmComWid) || undefined,
      coml: (checkIsString(search.coml) && parseCmAudioTail(search.coml)) || undefined,
    };
  },
});

function RouteComponent() {
  return <CmPlayerPage />;
}
