import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { useCmExtractHrefsFromHTML } from '$cm+editor/shared/lib/useCmExtractHrefsFromHTML';
import { ObserveUrlResource } from '$cm+editor/shared/ui/ObserveUrlResource';
import { CmEditorComAudioControlledList } from '$cm+editor/widgets/com-audio';
import { useState } from 'react';
import { makeRegExp } from 'regexpert';
import { CmMp3Rule, HttpLink } from 'shared/api';

export const CmEditorComTabAudio = ({ ccom }: { ccom: EditableCom }) => {
  const [innerHTML, setInnerHTML] = useState('');
  const [mp3Rule, setMp3Rule] = useState<CmMp3Rule | und>(undefined);
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
        <CmEditorComAudioControlledList
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
          <CmEditorComAudioControlledList
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
            {
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
            }
            <CmEditorComAudioControlledList
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
