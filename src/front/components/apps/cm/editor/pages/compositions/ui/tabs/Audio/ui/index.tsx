import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmComClientInvocatorMethods } from '$cm/editor/lib/cm-editor-invocator.methods';
import { EditableCom } from '$cm/editor/lib/EditableCom';
import { useEditableCcom } from '$cm/editor/pages/compositions/lib/useEditableCom';
import { useState } from 'react';
import { CmMp3Rule } from 'shared/api';
import { itIt, makeRegExp } from 'shared/utils';
import { ComAudioControlledList } from '../../../AudioControlledList';
import { ObserveUrlResource } from '../../../ObserveUrlResource';
import { useCmExtractHrefsFromHTML } from '../lib/useCmExtractHrefsFromHTML';

type Props = { topHTML?: string; topCom?: EditableCom; topMp3Rule?: CmMp3Rule };

export const CmComAudioRedactorTab = ({ topHTML, topCom, topMp3Rule }: Props) => {
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
};
