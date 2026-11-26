/** Тип сообщения дашборда; число сохраняется в БД, поэтому значения фиксированы. */
export const enum DashMessageKind {
  Support = 0,
  Log = 1,
  Errors = 2,
  Changes = 3,
  VisitError = 4,
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

export type DashVisit = {
  id: number;
  createdAt: number;
  v: number;
  url: string;
  user: DashMessageUser;
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
  date: number;
  total: number;
  maxOnline: number;
  versions: PRecord<number, number>;
  minVersion: number | null;
};

export const noOnlineSample = -1;

/** Separates the human message text from the appended auth/visit info sections. */
export const dashMessageSectionSeparator = '\n---\n';

export type VisitsDashboardOnlineHours = { min: number[]; max: number[] };

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
  onlineHours: VisitsDashboardOnlineHours;
  versions: PRecord<number, number>;
  todayMinVersion: number | null;
  dayStats: VisitsDashboardDayStat[];
};

export type DashMessagesPage = {
  messages: DashMessage[];
  visits: DashVisit[];
  hasMore: boolean;
};

export type DashCounters = {
  messageReads: PRecord<DashMessageKind, number>;
  unreadCounts: PRecord<DashMessageKind, number>;
};
