import { Langi } from 'shared/api';
import { takeLangSystemCode } from 'shared/const/+locale';
import { howMillisecondsInDay } from 'shared/const/ms';
import { textToCapitalizeCase } from './string.utils';

export const makeDateLabel = (inputDate: number | Date | string, langi = Langi.Ru, isWithTime = true) => {
  const langCode = takeLangSystemCode(langi);
  const date = new Date(inputDate);
  const now = new Date();

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfTarget = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

  const diffInDays = Math.round((startOfTarget - startOfToday) / howMillisecondsInDay);

  if (Math.abs(diffInDays) <= 3) {
    const rtf = new Intl.RelativeTimeFormat(langCode, { numeric: 'auto' });
    const relative = textToCapitalizeCase(rtf.format(diffInDays, 'day'));
    const dateText = date.toLocaleDateString(langCode, { day: 'numeric', month: 'long' });

    if (!isWithTime) return `${relative} ${dateText}`;

    const timeText = date.toLocaleTimeString(langCode, { hour: '2-digit', minute: '2-digit' });
    const dateWithTimeText = date.toLocaleString(langCode, {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });
    const separator = dateWithTimeText.slice(dateText.length, dateWithTimeText.lastIndexOf(timeText));

    return relative + separator + timeText;
  }

  return date.toLocaleDateString(langCode, {
    ...(isWithTime && { minute: '2-digit', hour: '2-digit' }),
    ...(diffInDays < -365 && { year: 'numeric' }),
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  });
};
