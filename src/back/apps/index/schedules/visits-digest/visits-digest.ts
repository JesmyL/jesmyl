import { deleteOldDashMessages, flushVisits } from 'back/dash/visits';
import nodeSchedule from 'node-schedule';
import { emptyFunc } from 'shared/utils';

export const initVisitsDigest = () => {
  flushVisits(false).catch(emptyFunc);

  nodeSchedule.scheduleJob({ hour: 0, minute: 0, tz: 'Europe/Moscow' }, () => {
    Promise.all([flushVisits(true), deleteOldDashMessages()]).catch(error =>
      console.error('Visits digest error', error),
    );
  });
};
