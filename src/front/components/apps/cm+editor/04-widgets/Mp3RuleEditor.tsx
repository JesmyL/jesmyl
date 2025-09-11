import { TextInput } from '#shared/ui/TextInput';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useCmMp3Rules } from '$cm+editor/basis/lib/hooks/useCmMp3Rules';
import { ReactNode, useState } from 'react';
import { StrRegExp, makeRegExp } from 'regexpert';
import { CmMp3Rule } from 'shared/api';

export const Mp3RuleEditor = (
  props: Partial<CmMp3Rule> & {
    redact?: boolean;
    button?: ReactNode;
    onComplete?: (rule: CmMp3Rule) => void;
    newRule?: boolean;
    isCanRedact?: boolean;
  },
) => {
  const [mp3Rules] = useCmMp3Rules();
  const [url, setUrl] = useState(props.url || '');
  const [attr, setAttr] = useState(props.attr || '');
  const [repReg, setRepReg] = useState<StrRegExp | ''>(props.repReg || '');
  const [repRegError, setRepRegError] = useState('');
  const [repText, setRepText] = useState<string>(props.repText || '');
  const [textQuery, setTextQuery] = useState(props.textQuery || '');
  const [isHTML, setIsHTML] = useState<1 | und>(props.isHTML);
  const [query, setQuery] = useState(props.query || '');
  const [isRedactState, setIsRedact] = useState(props.redact);
  const [errorMessage, setErrorMessage] = useState('');

  const isRedact = props.isCanRedact !== false && isRedactState;

  return (
    <>
      <div className="flex column margin-big-gap">
        <div className="w-full">
          URL-адрес:
          {isRedact ? (
            <>
              <TextInput
                value={url}
                onInput={value => {
                  try {
                    const url = new URL(value);
                    const unnecessary = value.replace(url.origin, '');
                    if (props.newRule && mp3Rules?.some(rule => rule.url === url.origin))
                      setErrorMessage('Такой URL-адрес уже есть');
                    else if (url.protocol !== 'https:') setErrorMessage('Ссылка должна начинаться с https://');
                    else if (unnecessary) {
                      setErrorMessage(`Ссылка должна быть на корень сайта (без ${unnecessary})`);
                    } else setErrorMessage('');
                  } catch (_e) {
                    setErrorMessage('Невалидный URL-адрес');
                  }
                  setUrl(value);
                }}
              />
              {errorMessage && <div className="error-message">{errorMessage}</div>}
            </>
          ) : (
            <span className="text-x7 ml-2">{url}</span>
          )}
        </div>
        <div className="w-full">
          Query (mp3):
          {isRedact ? (
            <TextInput
              value={query}
              onInput={setQuery}
            />
          ) : (
            <span className="text-x7 ml-2">{query}</span>
          )}
        </div>
        <div className="w-full">
          Аттрибут с URL (mp3):
          {isRedact ? (
            <TextInput
              value={attr}
              onInput={setAttr}
            />
          ) : (
            <span className="text-x7 ml-2">{attr}</span>
          )}
        </div>
        <div className="w-full">
          Аттрибут (текст):
          {isRedact ? (
            <TextInput
              value={textQuery}
              onInput={setTextQuery}
            />
          ) : (
            <span className="text-x7 ml-2">{textQuery || '-'}</span>
          )}
        </div>
        {textQuery && (
          <div className="w-full">
            innerHTML (Не innerText):
            {isRedact ? (
              <input
                type="checkbox"
                checked={!!isHTML}
                onChange={event => setIsHTML(event.currentTarget.checked ? 1 : undefined)}
              />
            ) : (
              <span className="text-x7 ml-2">{isHTML ? 'innerHTML' : 'innerText'}</span>
            )}
          </div>
        )}
        <div className="w-full">
          Замена в строке URL (RegExp):
          {isRedact ? (
            <TextInput
              value={repReg}
              onInput={text => {
                setRepRegError('');

                if (text === '') {
                  setRepReg('');
                  return;
                }

                try {
                  makeRegExp(text as never);
                  setRepReg(text as never);
                } catch (error) {
                  setRepRegError('' + error);
                }
              }}
            />
          ) : (
            <span className="text-x7 ml-2">{repReg}</span>
          )}
        </div>
        {repRegError && <div className="text-xKO">{repRegError}</div>}
        <div className="w-full">
          Заменить в строке URL (на текст):
          {isRedact ? (
            <TextInput
              value={repText}
              onInput={setRepText}
            />
          ) : (
            <span className="text-x7 ml-2">{repText}</span>
          )}
        </div>
        {props.button ||
          (isRedact ? (
            <TheIconButton
              icon="CheckmarkCircle02"
              className="color--ok margin-big-gap"
              disabled={!!errorMessage || !attr || !query}
              onClick={() => {
                setIsRedact(false);
                props.onComplete?.({
                  attr,
                  query,
                  isHTML,
                  textQuery,
                  repReg,
                  repText,
                  url: new URL(url).origin,
                  w: props.w ?? Date.now() + Math.random(),
                });
              }}
            />
          ) : (
            props.isCanRedact !== false && (
              <TheIconButton
                icon="Edit02"
                onClick={() => setIsRedact(true)}
              />
            )
          ))}
      </div>
    </>
  );
};
