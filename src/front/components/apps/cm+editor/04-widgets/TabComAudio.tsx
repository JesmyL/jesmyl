import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { useCmExtractHrefsFromHTML } from '$cm+editor/basis/lib/hooks/useCmExtractHrefsFromHTML';
import { useEditableCcom } from '$cm+editor/basis/lib/hooks/useEditableCom';
import { ObserveUrlResource } from '$cm+editor/basis/ui/ObserveUrlResource';
import { ComAudioControlledList } from '$cm+editor/widgets/AudioControlledList';
import { useCheckUserAccessRightsInScope } from '$index/checkers';
import { useState } from 'react';
import { makeRegExp } from 'regexpert';
import { CmMp3Rule, HttpLink } from 'shared/api';

type Props = { topHTML?: string; topCom?: EditableCom; topMp3Rule?: CmMp3Rule };

export const CmEditorTabComAudio = ({ topHTML, topCom, topMp3Rule }: Props) => {
  const cEditableCom = useEditableCcom();
  const ccom = topCom ?? cEditableCom;

  const [innerHTML, setInnerHTML] = useState(topHTML);
  const [mp3Rule, setMp3Rule] = useState<CmMp3Rule | und>(topMp3Rule);
  const [hrefs, setHrefs] = useState<HttpLink[]>([]);
  const [removedHrefs, setRemovedHrefs] = useState<HttpLink[]>([]);
  const [openAddBlock, setOpenAddBlock] = useState(false);
  const checkAccess = useCheckUserAccessRightsInScope();

  useCmExtractHrefsFromHTML(innerHTML, mp3Rule, setHrefs, ccom?.audio);

  if (!ccom) return null;

  const toggleLinkExistance = (link: HttpLink) =>
    cmEditComClientTsjrpcMethods.toggleAudioLink({ comw: ccom.wid, link });

  return (
    <>
      <h2>Прикреплённые аудио</h2>
      {ccom.audio.length ? (
        <ComAudioControlledList
          srcs={ccom.audio}
          icon="CancelCircle"
          isCanDelete={checkAccess('cm', 'COM_AUDIO', 'D')}
          onToggle={async src => {
            await toggleLinkExistance(src);
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
              await toggleLinkExistance(src);
              setRemovedHrefs(removedHrefs.filter(href => href !== src));
            }}
          />
        </>
      )}
      {checkAccess('cm', 'COM_AUDIO', 'C') &&
        (openAddBlock ? (
          <>
            <h2>Добавить аудио</h2>
            {!topHTML && (
              <ObserveUrlResource
                onSuccess={({ html, rule }) => {
                  setInnerHTML(html);
                  setMp3Rule(rule);
                }}
                onGoogleSearch={[
                  () => {
                    const ord = ccom.orders?.find(ord => ord.type === 'two');
                    return `"${ccom.name}" ${ord?.text.replace(makeRegExp('/\\n+/g'), ' ') ?? ''}`;
                  },
                  () => {
                    const ord = ccom.orders?.find(ord => ord.type === 'one');
                    return `"${ccom.name}" ${ord?.text.replace(makeRegExp('/\\n+/g'), ' ') ?? ''}`;
                  },
                  () => `"${ccom.name}"`,
                ]}
              />
            )}
            <ComAudioControlledList
              srcs={hrefs}
              icon="PlusSignCircle"
              onToggle={async src => {
                await toggleLinkExistance(src);
                setHrefs(hrefs.filter(href => href !== src));
              }}
            />
          </>
        ) : (
          <LazyIcon
            icon="PlusSignCircle"
            className="text-xOK m-5"
            onClick={() => setOpenAddBlock(true)}
          />
        ))}
    </>
  );
};
