import { SendButton } from '#shared/ui/sends/send-button/SendButton';
import { TextInput } from '#shared/ui/TextInput';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useEffect, useState } from 'react';
import { CmMp3ContainsPageResult } from 'shared/api';
import { itInvokeIt, itIt } from 'shared/utils';
import { cmEditorClientTsjrpcMethods } from '../lib/cm-editor.tsjrpc.methods';
import { useCmMp3Rules } from '../lib/useCmMp3Rules';

export const ObserveUrlResource = ({
  onSuccess,
  availableWithTextQuery,
  onGoogleSearch,
}: {
  onSuccess: (val: CmMp3ContainsPageResult) => void;
  availableWithTextQuery?: boolean;
  onGoogleSearch?: (() => string)[];
}) => {
  const [url, setUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [mp3Rules] = useCmMp3Rules();

  useEffect(() => {
    try {
      const theUrl = new URL(url);
      if (mp3Rules && !mp3Rules.some(u => new URL(u.url).origin === theUrl.origin)) {
        setErrorMessage('Неизвестный источник');
      } else setErrorMessage('');
    } catch (_e) {
      setErrorMessage('Невалидный URL-адрес');
    }
  }, [url, mp3Rules]);

  return (
    <div>
      <div className="flex flex-between gap-2">
        <TextInput
          className="url-observer-input-wrapper w-[50%]"
          st-mood="2"
          placeholder="URL-адрес"
          value={url}
          onInput={setUrl}
        />
        <SendButton
          className="url-observer-send-button"
          title="Обзор URL"
          disabled={!url || !!errorMessage}
          onSuccess={onSuccess}
          onSend={() => cmEditorClientTsjrpcMethods.getResourceHTMLString({ src: url })}
        />
      </div>
      {errorMessage && <div className="text-xKO">{errorMessage}</div>}

      <h2>Известные ресурсы:</h2>
      {mp3Rules?.map(rule => {
        return (
          (!availableWithTextQuery || rule.textQuery) && (
            <div
              key={rule.url}
              className={'flex gap-2 my-2 ' + (url.startsWith(rule.url) ? 'text-x7' : '')}
            >
              {Array.from(new Set(onGoogleSearch?.map(itInvokeIt).filter(itIt))).map(text => (
                <LazyIcon
                  key={text}
                  icon="Google"
                  onClick={() => {
                    const url = new URL('https://google.com/search');

                    url.searchParams.set('q', `site:${rule.url} ${text}`);
                    window.open(url.toString());
                  }}
                />
              ))}
              {rule.url}
            </div>
          )
        );
      })}
    </div>
  );
};
