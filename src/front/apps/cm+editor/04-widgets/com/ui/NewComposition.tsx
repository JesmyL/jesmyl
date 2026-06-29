import { constantsConfigAtom } from '#basis/state/constantsAtom';
import { propagationStopper } from '#shared/lib/event-funcs';
import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { SendButton } from '#shared/ui/sends/send-button/SendButton';
import { TextInput } from '#shared/ui/TextInput';
import { TheButton } from '#shared/ui/TheButton';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { useCmExtractHrefsFromHTML } from '$cm+editor/shared/lib/useCmExtractHrefsFromHTML';
import { cmEditorIDB } from '$cm+editor/shared/state/cmEditorIDB';
import { ObserveUrlResource } from '$cm+editor/shared/ui/ObserveUrlResource';
import { CmEditorComAudioControlledList } from '$cm+editor/widgets/com-audio';
import { CmComOrderList } from '$cm/ext';
import { useNavigate } from '@tanstack/react-router';
import { Atom, useAtomValue } from 'atomaric';
import { useEffect, useMemo, useState } from 'react';
import { makeRegExp } from 'regexpert';
import { CmComMod, CmComWid, CmMp3Rule, HttpNumLeadLink, IExportableCom } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { itIt } from 'shared/utils';
import { chordsBlockIncorrectMessage } from 'shared/utils/cm/com/chordsBlockIncorrectMessage';
import { takeTextBlockIncorrects } from 'shared/utils/cm/com/takeTextBlockIncorrects';
import { textLinesLengthIncorrects } from 'shared/utils/cm/com/textLinesLengthIncorrects';
import { mapObjectEntries, objectLength } from 'shared/utils/object.utils';
import { CmEditorComCreateNameChange } from './NameChangeWithCorrects';
import { CmEditorComCreateComTextableListRedactor } from './TextableListRedactor';

export const CmEditorComCreate = ({ openAtom }: { openAtom: Atom<boolean> }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [isTakeName, setIsTakeName] = useState(true);
  const [innerHTML, setInnerHTML] = useState('');
  const [mp3Rule, setMp3Rule] = useState<CmMp3Rule | und>();
  const [newICom, setNewICom] = useState<IExportableCom>({ m: CmComMod.def, n: '', w: CmComWid.def });
  const [parseErrors, setParseErrors] = useState<string[]>([]);
  const eeStore = cmEditorIDB.useValue.eeStore();
  const { maxAvailableComLineLength } = useAtomValue(constantsConfigAtom);

  const newCom = useMemo(() => new CmCom(newICom, null, null), [newICom]);
  const nameIncorrects = takeTextBlockIncorrects(newICom.n, eeStore);

  const [hrefs, setHrefs] = useState<HttpNumLeadLink[]>([]);
  const [removedAudioHrefs, setRemovedAudioHrefs] = useState<string[]>([]);

  useCmExtractHrefsFromHTML(innerHTML, mp3Rule, setHrefs, newICom.al);

  useEffect(() => {
    if (newICom.n) return;
    setIsTakeName(true);
  }, [newICom.n]);

  const setTextAsValue = (value: string) => {
    setValue(value);
    if (isTakeName) {
      if (value.includes('\n')) setIsTakeName(false);
      const name = EditableCom.takeCorrectName(value);
      setNewICom(prev => ({ ...prev, n: name }));
    }
  };

  const noTitleprefix = 'Нет разобранных ';
  const errorNodes = mapObjectEntries(
    {
      'Некореектное название': newICom.n && !nameIncorrects.errors?.at(0)?.message,
      'Нет прикреплённых аудио': !innerHTML || objectLength(newICom.al),
      [`${noTitleprefix}текстов`]: objectLength(newICom.t?.filter(itIt)),
      [`${noTitleprefix}аккордов`]: objectLength(newICom.c?.filter(itIt)),
      [`${noTitleprefix}порядковых блоков`]: objectLength(newICom.o),
    },
    (errorText, value) =>
      !value && (
        <div
          key={errorText}
          className="text-xKO flex center my-2"
        >
          {errorText}
        </div>
      ),
  ).filter(itIt);

  const textsErrors =
    newICom.t?.map(
      text => textLinesLengthIncorrects(text, maxAvailableComLineLength) ?? takeTextBlockIncorrects(text, eeStore),
    ) ?? [];
  const chordsErrors = newICom.c?.map(text => chordsBlockIncorrectMessage(text)) ?? [];

  return (
    <>
      <div
        className="new-composition p-2"
        onClick={propagationStopper}
      >
        <h2 className="title">Новая песня</h2>

        <CmEditorComCreateNameChange
          name={newICom.n}
          setNewCom={setNewICom}
          incorrcets={nameIncorrects}
        />

        <ObserveUrlResource
          availableWithTextQuery
          onSuccess={({ html, rule }) => {
            const div = document.createElement('div');
            div.innerHTML = html;
            setInnerHTML(html);
            setMp3Rule(rule);

            if (rule.textQuery) {
              const pre: HTMLPreElement | null = div.querySelector(rule.textQuery);
              if (pre) {
                if (rule.isHTML) setTextAsValue(pre.innerHTML.replace(makeRegExp('/<(\\/ ?)?br( ?\\/)?>/g'), '\n'));
                else setTextAsValue(pre.innerText);
              }
            }
          }}
        />

        <TextInput
          value={value}
          className="my-2 w-full h-full text-(--text-color) border-(--text-color) border-2 border-dashed resize-none"
          multiline
          placeholder="Начни писать или вставь текст для создания песни"
          onInput={setTextAsValue}
        />

        <TheButton
          id="new-com-parse-text-button"
          className="my-5"
          disabled={!value}
          onClick={() => {
            const { com, errors } = EditableCom.parseBlocks(value);

            if (errors.length) {
              setParseErrors(errors);
              return;
            }

            setNewICom(prev => ({ ...prev, ...com }));
          }}
        >
          Разобрать текст
        </TheButton>

        {innerHTML && (
          <>
            <h2>Прикреплённые аудио</h2>
            {newICom.al?.length ? (
              <CmEditorComAudioControlledList
                srcs={newICom.al?.filter(itIt)}
                icon="CancelCircle"
                onToggle={async src => {
                  const audio = Array.from(new Set(newICom.al?.filter(s => s && s !== src)));
                  setNewICom(prev => ({ ...prev, al: audio }));

                  setRemovedAudioHrefs(removedAudioHrefs.concat(src));
                }}
              />
            ) : (
              <div>Нет треков</div>
            )}

            <h2 id="header-new-audio">Новые аудио</h2>
            <CmEditorComAudioControlledList
              srcs={hrefs}
              icon="PlusSignCircle"
              onToggle={async src => {
                const audio = Array.from(new Set((newICom.al ?? []).concat(src).filter(itIt)));
                setNewICom(prev => ({ ...prev, al: audio }));

                setHrefs(hrefs.filter(href => href !== src));
              }}
            />
          </>
        )}

        {newICom.t && (
          <CmEditorComCreateComTextableListRedactor
            title="Тексты"
            corrects={textsErrors}
            list={newICom.t}
            onInput={(value, texti) => setNewICom(prev => ({ ...prev, t: newICom.t?.with(texti, value) }))}
          />
        )}

        {newICom.c && (
          <CmEditorComCreateComTextableListRedactor
            title="Аккорды"
            corrects={chordsErrors}
            list={newICom.c}
            onInput={(value, texti) => setNewICom(prev => ({ ...prev, c: newICom.c?.with(texti, value) }))}
          />
        )}

        {newICom.o && (
          <>
            <h2>Порядковые блоки</h2>
            <CmComOrderList
              chordVisibleVariant={ChordVisibleVariant.None}
              com={newCom}
              chordHardLevel={3}
              showInvisibles
            />
          </>
        )}

        {!parseErrors.length && errorNodes}
        {parseErrors.map((errorText, errorTexti) => {
          return (
            <div
              key={errorTexti}
              className="text-xKO my-2"
            >
              {errorText}
            </div>
          );
        })}

        <SendButton
          id="public-new-com-button"
          className="mb-10"
          title="Опубликовать песню"
          disabled={
            !!errorNodes.length ||
            !!parseErrors.length ||
            chordsErrors.some(corrects => corrects.errors?.length) ||
            textsErrors.some(corrects => corrects.errors?.length)
          }
          onSend={() => cmEditComClientTsjrpcMethods.newCom({ value: newICom })}
          onSuccess={comw => {
            openAtom.set(false);
            navigate({ to: '/cm/edit/coms/$comw/$tab', params: { comw: `${comw}`, tab: 'watch' } });
          }}
        />
      </div>
    </>
  );
};
