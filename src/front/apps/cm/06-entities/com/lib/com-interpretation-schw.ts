import { contextCreator } from '#shared/lib/contextCreator';
import { ScheduleWidgetWid } from 'shared/api';

export const [CmComInterpretationSchwContext, useCmComInterpretationSchw] =
  contextCreator<ScheduleWidgetWid | nil>(null);
