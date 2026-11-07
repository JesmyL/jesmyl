import { SokiVisit } from 'shared/api';

/** Новые share-события получают только клиенты, знающие текущую версию. */
export const checkIsFreshClientVersion = (visit: SokiVisit | nil) => !!visit && visit.version > 1342;
