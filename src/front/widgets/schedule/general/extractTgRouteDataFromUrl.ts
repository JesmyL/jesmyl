import { TelegramWebAppInitData } from '#basis/ui/tg-app/model';

export const extractTgRouteDataFromUrl = (): TelegramWebAppInitData | null => {
  const hashParamName = 'tgWebAppData';
  const url = new URL(window.location.href);

  if (url.hash.startsWith(`#${hashParamName}`)) {
    const data: Record<string, string> = {};

    url.search = url.hash.slice(1);
    url.search = url.searchParams.get(hashParamName) || '';

    Array.from(url.searchParams.entries()).forEach(([key, value]) => (data[key] = value));

    return { ...data, user: JSON.parse(data.user) } as TelegramWebAppInitData;
  }

  return null;
};
