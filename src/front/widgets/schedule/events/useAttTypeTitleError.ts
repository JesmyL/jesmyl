import { translateBase } from '#basis/locale';
import { IScheduleWidget, ScheduleWidgetCleans } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const useAttTypeTitleError = (value: string, schedule: IScheduleWidget, isRedact?: boolean, index?: number) => {
  if (!isRedact) return '';

  const lowerValue = ScheduleWidgetCleans.attachmentTypeTitleNormalize(value.toLowerCase());
  if (!lowerValue) {
    if (value) {
      return translateBase(BaseLocaleKey.ScheduleNoSignificantChars);
    }

    return translateBase(BaseLocaleKey.ScheduleMustNotBeEmpty);
  } else {
    const prevTitle = schedule.types.find(({ title }, typei) => typei !== index && title.toLowerCase() === lowerValue);
    if (prevTitle) return translateBase(BaseLocaleKey.ScheduleAlreadyExists, { t: prevTitle.title });

    return '';
  }
};
