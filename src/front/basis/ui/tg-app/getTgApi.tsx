import { Script } from '#shared/ui/tags/Script';
import { useEffect, useState } from 'react';
import { getTgApi } from './lib/getTgApi';
import { TelegramWebApp } from './model';

interface Props {
  children: (api: TelegramWebApp | nil, isLoading: boolean) => React.ReactNode;
}

export const TelegramWebAppApiOr = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [api, setApi] = useState<TelegramWebApp | null>(null);
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
