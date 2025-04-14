import { KeyboardInput } from '#shared/ui/keyboard/KeyboardInput';
import { SendButton } from '#shared/ui/sends/send-button/SendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmEditorClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { useCmMp3Rules } from '$cm+editor/basis/lib/hooks/useCmMp3Rules';
import { useEffect, useState } from 'react';
import { CmMp3ContainsPageResult } from 'shared/api';
import { itInvokeIt, itIt } from 'shared/utils';

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
      <div className="flex flex-between flex-gap">
        <KeyboardInput
          className="url-observer-input-wrapper half-width"
          placeholder="URL-адрес"
          value={url}
          onInput={setUrl}
        />
        <SendButton
          className="url-observer-send-button"
          title="Обзор URL"
          disabled={!url || !!errorMessage}
          onSuccess={onSuccess}
          onSend={() => cmEditorClientInvocatorMethods.getResourceHTMLString({ src: url })}
        />
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}

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
