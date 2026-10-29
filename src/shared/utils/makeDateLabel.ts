import { howMillisecondsInDay } from 'shared/const/ms';
import { textToCapitalizeCase } from './string.utils';

export const makeDateLabel = (inputDate: number | Date | string, langCode = 'ru', isWithTime = true) => {
  const date = new Date(inputDate);
  const now = new Date();

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfTarget = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

  const diffInDays = Math.round((startOfTarget - startOfToday) / howMillisecondsInDay);

  if (Math.abs(diffInDays) <= 3) {
    const rtf = new Intl.RelativeTimeFormat(langCode, { numeric: 'auto' });
    const relative = rtf.format(diffInDays, 'day');
    const dateText = date.toLocaleDateString(langCode, {
      ...(isWithTime ? { minute: '2-digit', hour: '2-digit' } : null),
      day: 'numeric',
      month: 'long',
    });

    return textToCapitalizeCase(relative) + (isWithTime ? dateText.slice(-8) : ` ${dateText}`);
  }

  return date.toLocaleDateString(langCode, {
    ...(isWithTime ? { minute: '2-digit', hour: '2-digit' } : null),
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: diffInDays < -365 ? 'numeric' : undefined,
  });
};
