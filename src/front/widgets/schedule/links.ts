import { LinkAppActionFabric } from '#shared/lib/link-app-actions';

type Props = {
  inviteSch?: number;
};

export const schLinkAction = new LinkAppActionFabric<Props>('*/schs', '/cm/!other/schs');
