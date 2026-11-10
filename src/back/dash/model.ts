import { DashMessageKind } from 'shared/model/index/visitsDashboard';

/** Области (scope) сообщений дашборда, по которым определяется вид уведомления. */
export const enum PostJRPCMessageScope {
  Changes,
  Credit,
  Control,
  Error,
  Gul94i,
  Gul94iAdmin,
  Log,
  Prod,
  Support,
  Visit,
}

/** Сопоставление каждой области сообщения с видом записи в дашборде посещений. */
export const dashKindByScope: Record<PostJRPCMessageScope, DashMessageKind> = {
  [PostJRPCMessageScope.Changes]: DashMessageKind.Changes,
  [PostJRPCMessageScope.Credit]: DashMessageKind.Log,
  [PostJRPCMessageScope.Control]: DashMessageKind.Log,
  [PostJRPCMessageScope.Error]: DashMessageKind.Errors,
  [PostJRPCMessageScope.Gul94i]: DashMessageKind.Log,
  [PostJRPCMessageScope.Gul94iAdmin]: DashMessageKind.Log,
  [PostJRPCMessageScope.Log]: DashMessageKind.Log,
  [PostJRPCMessageScope.Prod]: DashMessageKind.Log,
  [PostJRPCMessageScope.Support]: DashMessageKind.Support,
  [PostJRPCMessageScope.Visit]: DashMessageKind.VisitError,
};
