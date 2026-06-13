import { howMillisecondsInDay } from 'shared/const/ms';

export const makeDateLabel = (inputDate: number | Date | string) => {
  const date = new Date(inputDate);
  const now = new Date();

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfTarget = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

  const diffInDays = Math.round((startOfTarget - startOfToday) / howMillisecondsInDay);

  if (Math.abs(diffInDays) <= 3) {
    const rtf = new Intl.RelativeTimeFormat('ru', { numeric: 'auto' });
    const relative = rtf.format(diffInDays, 'day');

    return (
      relative[0].toUpperCase() +
      relative.slice(1) +
      date
        .toLocaleDateString('ru', {
          minute: '2-digit',
          hour: '2-digit',
          day: 'numeric',
          month: 'long',
        })
        .slice(-8)
    );
  }

  return date.toLocaleDateString('ru', {
    minute: '2-digit',
    hour: '2-digit',
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: diffInDays < -365 ? 'numeric' : undefined,
  });
};
