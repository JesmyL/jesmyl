import { SokiVisit } from 'shared/api';

/** @deprecated */
export const cmShareServerTsjrpcMethodsRefreshComWidRefDictClientSelector = (visit: SokiVisit | nil) =>
  (visit?.version ?? 0) > 1160;
