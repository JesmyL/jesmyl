import { propagationStopper } from '#shared/lib/event-funcs';
import { MyLib } from '#shared/lib/my-lib';
import { SendButton } from '#shared/ui/sends/send-button/SendButton';
import { TextInput } from '#shared/ui/TextInput';
import { TheButton } from '#shared/ui/TheButton';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { cmEditorIDB } from '$cm+editor/basis/lib/cmEditorIDB';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { useCmExtractHrefsFromHTML } from '$cm+editor/basis/lib/hooks/useCmExtractHrefsFromHTML';
import { ObserveUrlResource } from '$cm+editor/basis/ui/ObserveUrlResource';
import { NewComNameChange } from '$cm+editor/entities/NameChangeWithCorrects';
import { CmNewComTextableListRedactor } from '$cm+editor/entities/TextableListRedactor';
import { ComAudioControlledList } from '$cm+editor/widgets/AudioControlledList';
import { cmConstantsConfigAtom } from '$cm/basis/lib/store/atoms';
import { ChordVisibleVariant } from '$cm/Cm.model';
import { Com } from '$cm/col/com/Com';
import { ComOrders } from '$cm/col/com/orders/ComOrders';
import { useNavigate } from '@tanstack/react-router';
import { Atom, useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { makeRegExp } from 'regexpert';
import { CmComMod, CmComWid, CmMp3Rule, IExportableCom } from 'shared/api';
import { itIt, itNNil } from 'shared/utils';
import { CmComUtils } from 'shared/utils/cm/ComUtils';
import styled from 'styled-components';

export const NewComposition = ({ openAtom }: { openAtom: Atom<boolean> }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [isTakeName, setIsTakeName] = useState(true);
  const [innerHTML, setInnerHTML] = useState('');
  const [mp3Rule, setMp3Rule] = useState<CmMp3Rule | und>();
  const [newCom, setNewCom] = useState<IExportableCom>({ m: CmComMod.def, n: '', w: CmComWid.def });
  const [parseErrors, setParseErrors] = useState<string[]>([]);
  const eeStore = cmEditorIDB.useValue.eeStore();
  const { maxAvailableComLineLength } = useAtomValue(cmConstantsConfigAtom);

  const [hrefs, setHrefs] = useState<string[]>([]);
  const [removedAudioHrefs, setRemovedAudioHrefs] = useState<string[]>([]);

  useCmExtractHrefsFromHTML(innerHTML, mp3Rule, setHrefs, newCom.a);

  useEffect(() => {
    if (newCom.n) return;
    setIsTakeName(true);
  }, [newCom.n]);

  const setTextAsValue = (value: string) => {
    setValue(value);
    if (isTakeName) {
      if (value.includes('\n')) setIsTakeName(false);
      const name = EditableCom.takeCorrectName(value);
      setNewCom(prev => ({ ...prev, n: name }));
    }
  };

  const errorNodes = MyLib.entries({
    'Нет прикреплённых аудио': !innerHTML || newCom.a?.length,
    'Нет разобранных текстов': newCom.t?.filter(itIt).length,
    'Нет разобранных аккордов': newCom.c?.filter(itIt).length,
    'Нет разобранных порядковых блоков': newCom.o?.length,
  })
    .map(([errorText, value]) => {
      if (value) return null;

      return (
        <div
          key={errorText}
          className="text-xKO flex center my-2"
        >
          {errorText}
        </div>
      );
    })
    .filter(itNNil);

  const textsErrors =
    newCom.t?.map(
      text =>
        CmComUtils.textLinesLengthIncorrects(text, maxAvailableComLineLength) ??
        CmComUtils.takeTextBlockIncorrects(text, eeStore),
    ) ?? [];
  const chordsErrors = newCom.c?.map(text => CmComUtils.chordsBlockIncorrectMessage(text)) ?? [];

  return (
    <>
      <div
        className="new-composition p-2"
        onClick={propagationStopper}
      >
        <h2 className="title">Новая песня</h2>

        <NewComNameChange
          name={newCom.n}
          setNewCom={setNewCom}
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

        <StyledTextInput
          value={value}
          className="my-2"
          multiline
          placeholder="Начни писать или вставь текст для создания песни"
          onInput={setTextAsValue}
        />

        <TheButton
          id="new-com-parse-text-button"
          className="mx-5"
          disabled={!value}
          onClick={() => {
            const { com, errors } = EditableCom.parseBlocks(value);

            if (errors.length) {
              setParseErrors(errors);
              return;
            }

            setNewCom(prev => ({ ...prev, ...com }));
          }}
        >
          Разобрать текст
        </TheButton>

        {innerHTML && (
          <>
            <h2>Прикреплённые аудио</h2>
            {newCom.a ? (
              <ComAudioControlledList
                srcs={newCom.a.split('\n').filter(itIt)}
                icon="CancelCircle"
                onToggle={async src => {
                  const audio = Array.from(new Set(newCom.a?.split(/\n/).filter(s => s && s !== src))).join('\n');
                  setNewCom(prev => ({ ...prev, a: audio }));

                  setRemovedAudioHrefs(removedAudioHrefs.concat(src));
                }}
              />
            ) : (
              <div>Нет треков</div>
            )}

            <h2 id="header-new-audio">Новые аудио</h2>
            <ComAudioControlledList
              srcs={hrefs}
              icon="PlusSignCircle"
              onToggle={async src => {
                const audio = Array.from(new Set((newCom.a?.split(/\n/) ?? []).concat(src).filter(itIt))).join('\n');
                setNewCom(prev => ({ ...prev, a: audio }));

                setHrefs(hrefs.filter(href => href !== src));
              }}
            />
          </>
        )}

        {newCom.t && (
          <CmNewComTextableListRedactor
            title="Тексты"
            corrects={textsErrors}
            list={newCom.t}
            onInput={(value, texti) => setNewCom(prev => ({ ...prev, t: newCom.t?.with(texti, value) }))}
          />
        )}

        {newCom.c && (
          <CmNewComTextableListRedactor
            title="Аккорды"
            corrects={chordsErrors}
            list={newCom.c}
            onInput={(value, texti) => setNewCom(prev => ({ ...prev, c: newCom.c?.with(texti, value) }))}
          />
        )}

        {newCom.o && (
          <>
            <h2>Порядковые блоки</h2>
            <ComOrders
              chordVisibleVariant={ChordVisibleVariant.None}
              com={new Com(newCom)}
            />
          </>
        )}

        {!parseErrors.length && errorNodes}
        {parseErrors.map(errorText => {
          return <div className="text-xKO my-2">{errorText}</div>;
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
          onSend={() => cmEditComClientTsjrpcMethods.newCom({ value: newCom })}
          onSuccess={com => {
            openAtom.set(false);
            navigate({ to: '/cm/edit/coms/$comw/$tab', params: { comw: `${com.w}`, tab: 'watch' } });
          }}
        />
      </div>
    </>
  );
};

const StyledTextInput = styled(TextInput)`
  outline: 0;
  border: 2px dashed var(--text-color);
  width: 100%;
  height: 100%;
  resize: none;
  color: var(--text-color);
`;
