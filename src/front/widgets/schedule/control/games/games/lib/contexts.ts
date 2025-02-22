import { contextCreator } from '#shared/lib/contextCreator';
import { IScheduleWidgetTeamGame } from 'shared/api';

export const [ScheduleGameContext, useScheduleGameContext] = contextCreator<IScheduleWidgetTeamGame>(null!);
