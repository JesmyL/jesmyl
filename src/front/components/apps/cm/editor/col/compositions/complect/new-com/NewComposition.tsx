import { propagationStopper } from '#shared/lib/event-stubs';
import { MyLib } from '#shared/lib/my-lib';
import { TheButton } from '#shared/ui/Button';
import { KeyboardInput } from '#shared/ui/keyboard/KeyboardInput';
import { SendButton } from '#shared/ui/sendable/SendButton';
import { ChordVisibleVariant } from '@cm/basis/model/Cm.model';
import { Com } from 'front/components/apps/cm/col/com/Com';
import { ComOrders } from 'front/components/apps/cm/col/com/orders/ComOrders';
import { cmComClientInvocatorMethods } from 'front/components/apps/cm/editor/cm-editor-invocator.methods';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CmComMod, CmComWid, CmMp3Rule, IExportableCom } from 'shared/api';
import { itIt, itNNil, makeRegExp } from 'shared/utils';
import styled from 'styled-components';
import { EditableCom } from '../../com/EditableCom';
import { ComAudioControlledList } from '../audio/ControlledList';
import { ObserveUrlResource } from '../audio/ObserveUrlResource';
import { useCmExtractHrefsFromHTML } from '../audio/useCmExtractHrefsFromHTML';
import { NewComNameChange } from './complect/NameChange';
import { CmNewComTextableListRedactor } from './complect/TextableListRedactor';

export function NewComposition({ onClose }: { onClose: (is: false) => void }) {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [isTakeName, setIsTakeName] = useState(true);
  const [innerHTML, setInnerHTML] = useState('');
  const [mp3Rule, setMp3Rule] = useState<CmMp3Rule | und>();
  const [newCom, setNewCom] = useState<IExportableCom>({ m: CmComMod.def, n: '', w: CmComWid.def });
  const [parseErrors, setParseErrors] = useState<string[]>([]);

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
          className="color--ko flex center margin-gap-v"
        >
          {errorText}
        </div>
      );
    })
    .filter(itNNil);

  const textsErrors = newCom.t?.map(text => EditableCom.textBlockIncorrectMessages(text)) ?? [];
  const chordsErrors = newCom.c?.map(text => EditableCom.chordsBlockIncorrectMessage(text)) ?? [];

  return (
    <>
      <div
        className="new-composition padding-gap"
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
          className="margin-gap-v"
          multiline
          withoutCloseButton
          placeholder="Начни писать или вставь текст для создания песни"
          onChange={setTextAsValue}
        />

        <TheButton
          id="new-com-parse-text-button"
          className="margin-big-gap-v"
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
          return <div className="color--ko margin-gap-v">{errorText}</div>;
        })}

        <SendButton
          id="public-new-com-button"
          className="margin-giant-gap-b"
          title="Опубликовать песню"
          disabled={
            !!errorNodes.length ||
            !!parseErrors.length ||
            chordsErrors.some(corrects => corrects.errors?.length) ||
            textsErrors.some(corrects => corrects.errors?.length)
          }
          onSend={() => cmComClientInvocatorMethods.newCom(null, newCom)}
          onSuccess={com => {
            onClose(false);
            navigate('' + com.w);
          }}
        />
      </div>
    </>
  );
}

const StyledTextInput = styled(KeyboardInput)`
  outline: 0;
  border: 2px dashed var(--text-color);
  width: 100%;
  height: 100%;
  resize: none;
  color: var(--text-color);
`;
