import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import { cmComClientInvocatorMethods } from 'front/components/apps/cm/editor/cm-editor-invocator.methods';
import { useState } from 'react';
import { CmMp3Rule } from 'shared/api';
import { itIt, makeRegExp } from 'shared/utils';
import { EditableCom } from '../../com/EditableCom';
import { useEditableCcom } from '../../useEditableCcom';
import { ComAudioControlledList } from './ControlledList';
import ObserveUrlResource from './ObserveUrlResource';
import { useCmExtractHrefsFromHTML } from './useCmExtractHrefsFromHTML';

export default function ComAudioTab({
  topHTML,
  topCom,
  topMp3Rule,
}: {
  topHTML?: string;
  topCom?: EditableCom;
  topMp3Rule?: CmMp3Rule;
}) {
  const cEditableCom = useEditableCcom();
  const ccom = topCom ?? cEditableCom;

  const [innerHTML, setInnerHTML] = useState(topHTML);
  const [mp3Rule, setMp3Rule] = useState<CmMp3Rule | und>(topMp3Rule);
  const [hrefs, setHrefs] = useState<string[]>([]);
  const [removedHrefs, setRemovedHrefs] = useState<string[]>([]);
  const [openAddBlock, setOpenAddBlock] = useState(false);

  useCmExtractHrefsFromHTML(innerHTML, mp3Rule, setHrefs, ccom?.audio);

  if (!ccom) return null;

  const removeSrc = (src: string) =>
    cmComClientInvocatorMethods.setAudioLinks(
      null,
      ccom.wid,
      Array.from(new Set(ccom.audio.split(/\n/).filter(s => s && s !== src))).join('\n'),
    );

  const addSrc = (src: string) =>
    cmComClientInvocatorMethods.setAudioLinks(
      null,
      ccom.wid,
      Array.from(new Set(ccom.audio.split(/\n/).concat(src).filter(itIt))).join('\n'),
    );

  return (
    <>
      <h2>Прикреплённые аудио</h2>
      {ccom.audio ? (
        <ComAudioControlledList
          srcs={ccom.audio.split('\n').filter(itIt)}
          icon="CancelCircle"
          onToggle={async src => {
            await removeSrc(src);
            setRemovedHrefs(removedHrefs.concat(src));
          }}
        />
      ) : (
        <div>Нет треков</div>
      )}
      {!removedHrefs.length || (
        <>
          <h2>Удалённые аудио</h2>
          <ComAudioControlledList
            srcs={removedHrefs}
            icon="PlusSignCircle"
            onToggle={async src => {
              await addSrc(src);
              setRemovedHrefs(removedHrefs.filter(href => href !== src));
            }}
          />
        </>
      )}
      {openAddBlock ? (
        <>
          <h2>Добавить аудио</h2>
          {!topHTML && (
            <>
              <div>
                <span
                  className="children-middle pointer"
                  onClick={() => {
                    let max = 0;
                    ccom.texts?.forEach(text => (text.length > max ? (max = text.length) : 0));
                    const text = ccom.texts?.find(text => text.length === max);
                    if (text) {
                      const url = new URL('https://google.com/search');
                      url.searchParams.set('q', `${ccom.name} ${text.replace(makeRegExp('/\\n+/g'), ' ')}`);
                      window.open(url.toString());
                    }
                  }}
                >
                  Найти песню в гугл <LazyIcon icon="Google" />
                </span>
              </div>
              <ObserveUrlResource
                onSuccess={({ html, rule }) => {
                  setInnerHTML(html);
                  setMp3Rule(rule);
                }}
              />
            </>
          )}
          <ComAudioControlledList
            srcs={hrefs}
            icon="PlusSignCircle"
            onToggle={async src => {
              await addSrc(src);
              setHrefs(hrefs.filter(href => href !== src));
            }}
          />
        </>
      ) : (
        <LazyIcon
          icon="PlusSignCircle"
          className="color--ok margin-big-gap"
          onClick={() => setOpenAddBlock(true)}
        />
      )}
    </>
  );
}
