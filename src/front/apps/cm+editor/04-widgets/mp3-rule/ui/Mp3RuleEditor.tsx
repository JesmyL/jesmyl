import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useCmMp3Rules } from '$cm+editor/shared/lib/useCmMp3Rules';
import { ReactNode, useState } from 'react';
import { StrRegExp, makeRegExp } from 'regexpert';
import { CmMp3Rule } from 'shared/api';
import { CmEditorMp3RuleTextLine } from './TextLine';

export const CmEditorMp3RuleEditor = (
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
  const [redirect, setRedirect] = useState(props.rdir || '');
  const [redirectError, setRedirectError] = useState('');
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
      <div className="flex flex-col m-5">
        <CmEditorMp3RuleTextLine
          label="URL-адрес:"
          isRedact={isRedact}
          text={url}
          error={errorMessage}
          setText={value => {
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

        <CmEditorMp3RuleTextLine
          label="Redirect"
          isRedact={isRedact}
          text={redirect}
          error={redirectError}
          setText={value => {
            setRedirectError(
              mp3Rules.some(rule => rule.url === value) ? '' : 'Редирект должен быть на известный ресурс',
            );

            setRedirect(value);
          }}
        />

        <CmEditorMp3RuleTextLine
          label="Query (mp3):"
          isRedact={isRedact}
          text={query}
          setText={setQuery}
        />

        <CmEditorMp3RuleTextLine
          label="Аттрибут с URL (mp3):"
          isRedact={isRedact}
          text={attr}
          setText={setAttr}
        />

        <CmEditorMp3RuleTextLine
          label="Аттрибут (текст):"
          isRedact={isRedact}
          text={textQuery}
          setText={setTextQuery}
        />

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

        <CmEditorMp3RuleTextLine
          label="Замена в строке URL (RegExp):"
          isRedact={isRedact}
          text={repReg}
          error={repRegError}
          setText={text => {
            setRepReg(text as never);
            setRepRegError('');

            if (text === '') return;

            try {
              makeRegExp(text as never);
            } catch (error) {
              setRepRegError('' + error);
            }
          }}
        />

        <CmEditorMp3RuleTextLine
          label="Заменить в строке URL (на текст):"
          isRedact={isRedact}
          text={repText}
          setText={setRepText}
        />

        {props.button ||
          (isRedact ? (
            <TheIconButton
              icon="CheckmarkCircle02"
              className="text-xOK m-5"
              disabled={!!redirectError || !!repRegError || !!errorMessage || !attr || !query}
              onClick={() => {
                setIsRedact(false);
                props.onComplete?.({
                  attr,
                  query,
                  isHTML,
                  textQuery,
                  repReg,
                  repText,
                  rdir: redirect,
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
