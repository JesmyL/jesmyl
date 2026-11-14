import { Langi } from 'shared/api/complect/enums';
import { UserId } from 'shared/api/complect/soki.model';
import { DashMessageKind, VisitsDashboard, VisitsDashboardMessagesArgs } from 'shared/model/index/visitsDashboard';

/**
 * Отдельная модель админского потока дашборда посещений.
 * Вынесена из общего `IndexTsjrpcModel`, чтобы обычные пользователи не могли даже сослаться
 * на эти методы в своём клиенте: доступ к потоку импортируют только админские экраны.
 */
export type IndexDashTsjrpcModel = {
  getVisitsDashboard_v1: (args?: { messages?: VisitsDashboardMessagesArgs }) => VisitsDashboard;
  markDashMessagesRead_v1: (args: { kind: DashMessageKind }) => PRecord<DashMessageKind, number>;
  sendDashEmailReport_v2: () => { sent: string[]; failed: string[] };
  getDashReportRecipients: () => PRecord<string, Langi>;
  setDashReportRecipients: (args: { recipients: PRecord<string, Langi> }) => PRecord<string, Langi>;
  getDashPushTestUsers: () => {
    id: UserId;
    name: string;
    subscriptionsCount: number;
    isMuted: boolean;
    subscriptionsTitle: string;
  }[];
  sendTestPushToUser: (args: { userId: UserId }) => { sentMessage: string; mutedMessage: string | nil };
};
