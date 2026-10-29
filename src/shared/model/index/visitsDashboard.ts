export const enum DashMessageKind {
  Support,
  Log,
  Errors,
  Changes,
  VisitError,
}

export type DashMessageUser = {
  fio: string | null;
  nick: string | null;
  email: string | null;
};

export type DashMessage = {
  id: number;
  kind: DashMessageKind;
  m: string;
  visit: string;
  createdAt: number;
  user: DashMessageUser;
  isSystem: boolean;
};

export type VisitsDashboardMessagesArgs = {
  kind: DashMessageKind;
  beforeId: number | null;
};

export type VisitsDashboardVisitor = {
  fio: string | null;
  nick: string | null;
  email: string | null;
  count: number;
};

export type VisitsDashboardDayStat = {
  date: string;
  total: number;
  maxOnline: number;
};

export type VisitsDashboard = {
  online: number;
  onlineUsers: DashMessageUser[];
  onlineAnon: number;
  today: number;
  uniq: number;
  visitors: VisitsDashboardVisitor[];
  anonVisits: number;
  anonUniq: number;
  hours: number[];
  dayStats: VisitsDashboardDayStat[];
  messages: DashMessage[];
  messagesHasMore: boolean;
  messageReads: PRecord<DashMessageKind, number>;
  unreadCounts: PRecord<DashMessageKind, number>;
};
