import { LinkAppActionFabric } from '#shared/lib/link-app-actions';
import { ScheduleWidgetWid } from 'shared/api';

type Props = {
  inviteSch?: ScheduleWidgetWid;
  inviteHash?: string;
};

export const schLinkAction = new LinkAppActionFabric<Props>('*/schs', '/!other/cm/schs');
