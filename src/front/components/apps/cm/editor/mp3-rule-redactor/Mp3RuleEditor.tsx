import { ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import { CmMp3Rule } from '../../../../../models';
import EvaButton from '../../../../../complect/eva-icon/EvaButton';
import KeyboardInput from '../../../../../complect/keyboard/KeyboardInput';
import { RootState } from '../../../../../shared/store';

const mp3RulesSelector = (state: RootState) => state.cm.mp3Rules;

export default function Mp3RuleEditor(
  props: Partial<CmMp3Rule> & {
    redact?: boolean;
    button?: ReactNode;
    onComplete?: (rule: CmMp3Rule) => void;
    newRule?: boolean;
  },
) {
  const mp3Rules = useSelector(mp3RulesSelector);
  const [url, setUrl] = useState(props.url || '');
  const [attr, setAttr] = useState(props.attr || '');
  const [textQuery, setTextQuery] = useState(props.textQuery || '');
  const [isHTML, setIsHTML] = useState<1 | und>(props.isHTML);
  const [query, setQuery] = useState(props.query || '');
  const [isRedact, setIsRedact] = useState(props.redact);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <>
      <div className="flex column margin-big-gap">
        <div className="full-width">
          URL-адрес:{' '}
          {isRedact ? (
            <>
              <KeyboardInput
                value={url}
                onChange={(value) => {
                  try {
                    const url = new URL(value);
                    const unnecessary = value.replace(url.origin, '');
                    if (props.newRule && mp3Rules?.some((rule) => rule.url === url.origin))
                      setErrorMessage('Такой URL-адрес уже есть');
                    else if (url.protocol !== 'https:') setErrorMessage('Ссылка должна начинаться с https://');
                    else if (unnecessary) {
                      setErrorMessage(`Ссылка должна быть на корень сайта (без ${unnecessary})`);
                    } else setErrorMessage('');
                  } catch (e) {
                    setErrorMessage('Невалидный URL-адрес');
                  }
                  setUrl(value);
                }}
              />
              {errorMessage && <div className="error-message">{errorMessage}</div>}
            </>
          ) : (
            <span className="color--7">{url}</span>
          )}
        </div>
        <div className="full-width">
          Query (mp3):{' '}
          {isRedact ? <KeyboardInput value={query} onChange={setQuery} /> : <span className="color--7">{query}</span>}
        </div>
        <div className="full-width">
          Аттрибут с URL (mp3):{' '}
          {isRedact ? <KeyboardInput value={attr} onChange={setAttr} /> : <span className="color--7">{attr}</span>}
        </div>
        <div className="full-width">
          Аттрибут (текст):{' '}
          {isRedact ? (
            <KeyboardInput value={textQuery} onChange={setTextQuery} />
          ) : (
            <span className="color--7">{textQuery || '-'}</span>
          )}
        </div>
        {textQuery && (
          <div className="full-width">
            innerHTML (Не innerText):{' '}
            {isRedact ? (
              <input
                type="checkbox"
                checked={!!isHTML}
                onChange={(event) => setIsHTML(event.currentTarget.checked ? 1 : undefined)}
              />
            ) : (
              <span className="color--7">{isHTML ? 'innerHTML' : 'innerText'}</span>
            )}
          </div>
        )}
        {props.button ||
          (isRedact ? (
            <EvaButton
              name="checkmark-circle"
              className="color--ok margin-big-gap"
              disabled={!!errorMessage || !attr || !query}
              onClick={() => {
                setIsRedact(false);
                props.onComplete?.({
                  attr,
                  query,
                  isHTML,
                  textQuery,
                  url: new URL(url).origin,
                  w: props.w ?? Date.now() + Math.random(),
                });
              }}
            />
          ) : (
            <EvaButton name="edit-outline" onClick={() => setIsRedact(true)} />
          ))}
      </div>
    </>
  );
}
