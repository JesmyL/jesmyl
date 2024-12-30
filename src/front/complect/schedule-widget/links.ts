import { LinkAppActionFabric } from '../link-app-actions';

type Props = {
  inviteSch?: number;
};

export const schLinkAction = new LinkAppActionFabric<Props>('*/schs', '/cm/!other/schs');
