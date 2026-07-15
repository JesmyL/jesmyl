import { checkIsNotNil } from 'shared/utils/checkIs';

/** 1000 */
export const howMillisecondsInSec = 1000;
/** 60000 */
export const howMillisecondsInMin = howMillisecondsInSec * 60;
/** 3600000 */
export const howMillisecondsInHour = howMillisecondsInMin * 60;
/** 86400000 */
export const howMillisecondsInDay = howMillisecondsInHour * 24;

export const checkIsNowInDay = <It extends number | nil>(dateTs: It): dateTs is Exclude<It, null | undefined> =>
  checkIsNotNil(dateTs) && dateTs < Date.now() - howMillisecondsInDay;
