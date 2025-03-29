import { TelegramWebAppInitData } from '#basis/ui/tg-app/model';
import { environment } from 'front/environment';

const url = environment.initialUrl;
const hashParamName = 'tgWebAppData';

export const extractTgRouteDataFromUrl = (): TelegramWebAppInitData | null => {
  if (url.hash.startsWith(`#${hashParamName}`)) {
    const data: Record<string, string> = {};

    url.search = url.hash.slice(1);
    url.search = url.searchParams.get(hashParamName) || '';

    Array.from(url.searchParams.entries()).forEach(([key, value]) => (data[key] = value));

    return { ...data, user: JSON.parse(data.user) } as TelegramWebAppInitData;
  }

  return null;
};
