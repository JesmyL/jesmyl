import { Script } from '#shared/ui/tags/Script';
import { useEffect, useState } from 'react';
import { TelegramWebApp } from './model';

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

interface Props {
  children: (api: TelegramWebApp | nil, isLoading: boolean) => React.ReactNode;
}

export const TelegramWebAppApiOr = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [api, setApi] = useState(tgApi);
  const [isScriptLoaded, setIsScriptLoaded] = useState<unknown>(false);

  useEffect(() => {
    if (!isScriptLoaded) return;

    (async () => {
      try {
        const api = await getTgApi();
        setApi(api);
      } catch (_error) {
        //
      }

      setIsLoading(false);
    })();
  }, [isScriptLoaded]);

  return (
    <>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        onLoad={setIsScriptLoaded}
      />
      {children(api, isLoading)}
    </>
  );
};
