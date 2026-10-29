import { DashMessage } from 'shared/model/index/visitsDashboard';
import { Eventer } from 'shared/utils';

export const onDashMessageStoredEvent = Eventer.createValue<DashMessage>();
