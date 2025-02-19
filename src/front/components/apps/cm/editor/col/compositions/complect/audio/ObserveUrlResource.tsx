import { cmEditorClientInvocatorMethods } from 'front/components/apps/cm/editor/cm-editor-invocator.methods';
import { useEffect, useState } from 'react';
import { CmMp3ContainsPageResult } from 'shared/api';
import KeyboardInput from '../../../../../../../../complect/keyboard/KeyboardInput';
import SendButton from '../../../../../../../../complect/sends/send-button/SendButton';
import { useCmMp3Rules } from '../../../../mp3-rule-redactor/useCmMp3Rules';

export default function ObserveUrlResource({
  onSuccess,
  availableWithTextQuery,
}: {
  onSuccess: (val: CmMp3ContainsPageResult) => void;
  availableWithTextQuery?: boolean;
}) {
  const [url, setUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const mp3Rules = useCmMp3Rules();

  useEffect(() => {
    try {
      const theUrl = new URL(url);
      if (mp3Rules && !mp3Rules.some(u => new URL(u.url).origin === theUrl.origin)) {
        setErrorMessage('Неизвестный источник');
      } else setErrorMessage('');
    } catch (e) {
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
          onSend={() => cmEditorClientInvocatorMethods.getResourceHTMLString(null, url)}
        />
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <h2>Известные ресурсы:</h2>
      {mp3Rules?.map(rule => {
        return (
          (!availableWithTextQuery || rule.textQuery) && (
            <div
              key={rule.url}
              className={!url || url.startsWith(rule.url) ? 'color--7' : ''}
            >
              {rule.url}
            </div>
          )
        );
      })}
    </div>
  );
}
