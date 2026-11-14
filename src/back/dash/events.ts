import { DashMessage, DashVisit } from 'shared/model/index/visitsDashboard';
import { Eventer } from 'shared/utils';

export const onDashMessageStoredEvent = Eventer.createValue<DashMessage>();

/** Срабатывает после успешной записи визита в visitDB и несёт полностью готовый ряд дашборда (id, createdAt, v, url, user) для мгновенной live-рассылки. */
export const onVisitStoredEvent = Eventer.createValue<DashVisit>();
