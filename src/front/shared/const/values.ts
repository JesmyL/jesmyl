import { environment } from '#shared/environment';

export const cmSecureAtomLevel = environment.isTest ? 0 : 1;
