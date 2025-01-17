import { IScheduleWidget } from 'shared/api';
import { FilerAppRequirement } from '../../../complect/filer/Filer.model';
import { indexScheduleSetMessageInform } from './tg-bot-inform/tg-inform';

export const indexSchedulesConfigOnInit: FilerAppRequirement<IScheduleWidget[]> = {
  onInit: schedules => {
    schedules.forEach(sch => indexScheduleSetMessageInform(sch));
  },
};
