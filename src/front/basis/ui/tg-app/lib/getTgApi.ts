import { TelegramWebApp } from '../model';

let tgApi: TelegramWebApp | nil = null;

export const getTgApi = async () => {
  if (tgApi != null) return tgApi;

  return new Promise<TelegramWebApp>((resolve, reject) => {
    const get = (tries: number) => {
      tgApi = (window as never as { Telegram?: { WebApp?: TelegramWebApp } })?.Telegram?.WebApp;

      if (tgApi != null) {
        resolve(tgApi);
        return;
      }

      if (tries > 0) setTimeout(get, 100, tries - 1);
      else reject();
    };

    get(10);
  });
};
