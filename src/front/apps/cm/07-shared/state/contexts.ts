import { contextCreator } from '#shared/lib/contextCreator';
import { ScheduleWidgetWid } from 'shared/api';

export const [CmComInScheduleWid, useCmComInScheduleWid] = contextCreator<ScheduleWidgetWid | nil>(null);
