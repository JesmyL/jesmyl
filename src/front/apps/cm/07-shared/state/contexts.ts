import { contextCreator } from '#shared/lib/contextCreator';
import { IScheduleWidgetWid } from 'shared/api';

export const [CmComInScheduleWid, useCmComInScheduleWid] = contextCreator<IScheduleWidgetWid | nil>(null);
