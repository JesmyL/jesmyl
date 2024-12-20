import { LinkAppActionFabric } from 'front/complect/link-app-actions';
import { CmComWid } from 'shared/api';

type CmAppActionProps = {
  comws?: CmComWid[];
  comw?: CmComWid;
};

export const cmAppActions = new LinkAppActionFabric<CmAppActionProps>('cm');
