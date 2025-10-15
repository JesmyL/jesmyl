import { LinkAppActionFabric } from '#shared/lib/link-app-actions';
import { CmComWid, SokiAuthLogin } from 'shared/api';

type CmAppActionProps =
  | {
      comws?: CmComWid[];
      comw?: CmComWid;
    }
  | {
      shareCommentComw: CmComWid;
      login: SokiAuthLogin;
    };

export const cmAppActions = new LinkAppActionFabric<CmAppActionProps>('cm');
