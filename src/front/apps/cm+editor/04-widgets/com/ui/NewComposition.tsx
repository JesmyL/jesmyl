import { translateEditorBase } from '#basis/locale';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';
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
import { CmAudioSrc, CmMp3Rule, HttpNumLeadLink } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { cmDefaultCom } from 'shared/const/cm/def.com';
import { Bool } from 'shared/enums';
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
  const [externalText, setExternalText] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [parseVersion, setParseVersion] = useState(0);
  const [isTakeName, setIsTakeName] = useState(true);
  const [innerHTML, setInnerHTML] = useState('');
  const [mp3Rule, setMp3Rule] = useState<CmMp3Rule | und>();
  const [newICom, setNewICom] = useState(cmDefaultCom);
  const [parseErrors, setParseErrors] = useState<string[]>([]);
  const eeStore = cmEditorIDB.useValue.eeStore();
  const { maxAvailableComLineLength } = useAtomValue(constantsConfigAtom);

  const newCom = useMemo(() => new CmCom(newICom, null, null, Bool.False), [newICom]);
  const nameIncorrects = takeTextBlockIncorrects(newICom.n, eeStore);

  const [hrefs, setHrefs] = useState<HttpNumLeadLink[]>([]);
  const [bindedLinks, setBindedLinks] = useState<CmAudioSrc[]>([]);
  const [removedAudioHrefs, setRemovedAudioHrefs] = useState<string[]>([]);

  useCmExtractHrefsFromHTML(innerHTML, mp3Rule, setHrefs, bindedLinks);

  useEffect(() => {
    if (newICom.n) return;
    setIsTakeName(true);
  }, [newICom.n]);

  const setTextAsValue = (nextValue: string) => {
    setValue(nextValue);
    if (!isTakeName) return;

    if (nextValue.includes('\n')) setIsTakeName(false);

    const name = EditableCom.takeCorrectName(nextValue);
    setDisplayName(name);
    setNewICom(prev => ({ ...prev, n: name }));
  };

  const setExternalTextAsValue = (text: string) => {
    setExternalText(text);
    setTextAsValue(text);
  };

  const noTitlePrefix = (x: 't' | 'c' | 'o') => translateEditorBase(EditorLocaleKey.CmEditorNewNoParsed, { x });
  const errorNodes = mapObjectEntries(
    {
      [translateEditorBase(EditorLocaleKey.IncorrectName)]: newICom.n && !nameIncorrects.errors?.at(0)?.message,
      [translateEditorBase(EditorLocaleKey.CmEditorNewNoAudio)]: !innerHTML || objectLength(bindedLinks),
      [noTitlePrefix('t')]: objectLength(newICom.t?.filter(itIt)),
      [noTitlePrefix('c')]: objectLength(newICom.c?.filter(itIt)),
      [noTitlePrefix('o')]: objectLength(newICom.o),
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
  const chordsErrors = newICom.c?.map(text => chordsBlockIncorrectMessage(text, Bool.False)) ?? [];

  return (
    <>
      <div
        className="new-composition p-2"
        onClick={propagationStopper}
      >
        <h2 className="title">{translateEditorBase(EditorLocaleKey.CmEditorNewCom)}</h2>

        <CmEditorComCreateNameChange
          defaultName={displayName}
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
                if (rule.isHTML)
                  setExternalTextAsValue(pre.innerHTML.replace(makeRegExp('/<(\\/ ?)?br( ?\\/)?>/g'), '\n'));
                else setExternalTextAsValue(pre.innerText);
              }
            }
          }}
        />

        <TextInput
          strongDefaultValue
          defaultValue={externalText}
          className="my-2 w-full h-full text-(--text-color) border-(--text-color) border-2 border-dashed resize-none"
          multiline
          placeholder={translateEditorBase(EditorLocaleKey.CmEditorNewStartWrite)}
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
            setParseVersion(prev => prev + 1);
          }}
        >
          {translateEditorBase(EditorLocaleKey.CmEditorNewParseTextHeap)}
        </TheButton>

        {innerHTML && (
          <>
            <h2>{translateEditorBase(EditorLocaleKey.CmEditorNewBoundAudio)}</h2>
            {bindedLinks.length ? (
              <CmEditorComAudioControlledList
                srcs={bindedLinks}
                icon="CancelCircle"
                onToggle={async src => {
                  setBindedLinks(bindedLinks.filter(link => link !== src));

                  setRemovedAudioHrefs(removedAudioHrefs.concat(src));
                }}
              />
            ) : (
              <div>{translateEditorBase(EditorLocaleKey.CmEditorNewNoTracks)}</div>
            )}

            <h2 id="header-new-audio">{translateEditorBase(EditorLocaleKey.CmEditorNewNewAudios)}</h2>
            <CmEditorComAudioControlledList
              srcs={hrefs}
              icon="PlusSignCircle"
              onToggle={async src => {
                setBindedLinks(Array.from(new Set(bindedLinks.concat(src))));

                setHrefs(hrefs.filter(href => href !== src));
              }}
            />
          </>
        )}

        {newICom.t && (
          <CmEditorComCreateComTextableListRedactor
            key={parseVersion}
            title={translateEditorBase(EditorLocaleKey.Texts)}
            corrects={textsErrors}
            list={newICom.t}
            onInput={(value, texti) => setNewICom(prev => ({ ...prev, t: newICom.t?.with(texti, value) }))}
          />
        )}

        {newICom.c && (
          <CmEditorComCreateComTextableListRedactor
            key={parseVersion}
            title={translateEditorBase(EditorLocaleKey.CmChords)}
            corrects={chordsErrors}
            list={newICom.c}
            onInput={(value, texti) => setNewICom(prev => ({ ...prev, c: newICom.c?.with(texti, value) }))}
          />
        )}

        {newICom.o && (
          <>
            <h2>{translateEditorBase(EditorLocaleKey.CmOrderBlocks)}</h2>
            <CmComOrderList
              chordVisibleVariant={ChordVisibleVariant.None}
              com={newCom}
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
          title={translateEditorBase(EditorLocaleKey.CmEditorNewPublishCom)}
          disabled={
            !!errorNodes.length ||
            !!parseErrors.length ||
            chordsErrors.some(corrects => corrects.errors?.length) ||
            textsErrors.some(corrects => corrects.errors?.length)
          }
          onSend={() => cmEditComClientTsjrpcMethods.newCom({ value: { ...newICom, al: bindedLinks } })}
          onSuccess={comw => {
            openAtom.set(false);
            navigate({ to: '/cm/edit/coms/$comw/$tab', params: { comw: `${comw}`, tab: 'watch' } });
          }}
        />
      </div>
    </>
  );
};
