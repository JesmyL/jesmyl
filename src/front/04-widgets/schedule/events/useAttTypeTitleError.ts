import { IScheduleWidget, ScheduleWidgetCleans } from 'shared/api';

export const useAttTypeTitleError = (value: string, schedule: IScheduleWidget, isRedact?: boolean, index?: number) => {
  if (!isRedact) return '';

  const lowerValue = ScheduleWidgetCleans.attachmentTypeTitleNormalize(value.toLowerCase());
  if (!lowerValue) {
    if (value) {
      return 'Нет существенных символов!';
    }

    return 'Не должно быть пустым!';
  } else {
    const prevTitle = schedule.types.find(({ title }, typei) => typei !== index && title.toLowerCase() === lowerValue);
    if (prevTitle) return `"${prevTitle.title}" уже есть!`;

    return '';
  }
};
