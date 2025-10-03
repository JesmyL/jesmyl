import { MyLib } from '#shared/lib/my-lib';
import { cmComTopToolsAtom } from '$cm/basis/lib/store/atoms';
import { cmUserStoreTsjrpcClient } from '$cm/tsjrpc/user-store.tsjrpc.methods';
import { useAuth } from '$index/atoms';
import { useAtom, useAtomValue } from 'atomaric';
import React from 'react';
import { MigratableComToolName } from 'shared/api';
import { CmCatsBindsComTool } from '../ui/CatsBindsComTool';
import { ChordHardLevelComTool } from '../ui/ChordHardLevelComTool';
import { ChordImagesComTool } from '../ui/ChordImagesComTool';
import { ChordsVariantComTool } from '../ui/ChordsVariantComTool';
import { ComCommentComTool } from '../ui/ComCommentComTool';
import { ComCopyTextTool } from '../ui/ComCopyTextTool';
import { FavoriteComTool } from '../ui/FavoriteComTool';
import { FullscreenComTool } from '../ui/FullscreenComTool';
import { HideMetronomeComTool } from '../ui/HideMetronomeComTool';
import { MiniAnchorSwitchComTool } from '../ui/MiniAnchorSwitchComTool';
import { OpenPlayerComTool } from '../ui/OpenPlayerComTool';
import { QrComShareComTool } from '../ui/QrComShareComTool';
import { SelectedComTool } from '../ui/SelectedComTool';
import { TranslationComTool } from '../ui/TranslationComTool';
import { ComToolItemAttrsContext, ComToolNameContext, IsComToolIconItemsContext } from './contexts';

const RedactComTool = React.lazy(() => import('../ui/RedactComTool'));

const mapToolsSelf = {} as { fun: (tool: MigratableComToolName) => void; comTopTools: MigratableComToolName[] };

function mapTools(this: und | typeof mapToolsSelf, key: MigratableComToolName) {
  if (this === undefined)
    return (
      <ComToolNameContext
        key={key}
        value={`${key} tool-in-top`}
      >
        {toolsDict[key]}
      </ComToolNameContext>
    );

  return (
    <div
      key={key}
      className={this.comTopTools.includes(key) ? '[&_.icon-box]:bg-x4 [&_.icon-box]:text-x2' : undefined}
    >
      <ComToolNameContext value={key}>
        <ComToolItemAttrsContext
          value={{
            onIconClick: event => {
              event.stopPropagation();
              event.preventDefault();
              this.fun(key);
            },
          }}
        >
          {toolsDict[key]}
        </ComToolItemAttrsContext>
      </ComToolNameContext>
    </div>
  );
}

const toolsDict: Record<MigratableComToolName, React.ReactNode> = {
  'mark-com': <FavoriteComTool />,
  'fullscreen-mode': <FullscreenComTool />,
  'chords-variant': <ChordsVariantComTool />,
  'show-translation': <TranslationComTool />,
  'chord-images': <ChordImagesComTool />,
  'selected-toggle': <SelectedComTool />,
  'open-player': <OpenPlayerComTool />,
  'hide-metronome': <HideMetronomeComTool />,
  'is-mini-anchor': <MiniAnchorSwitchComTool />,
  'qr-share': <QrComShareComTool />,
  'cats-binds': <CmCatsBindsComTool />,
  'com-comment': <ComCommentComTool />,
  'copy-com': <ComCopyTextTool />,
  'chord-hard-level': <ChordHardLevelComTool />,

  'edit-com': <RedactComTool />,
};
const toolKeys = MyLib.keys(toolsDict);

let saveTimeout: TimeOut;
export const useMigratableListComTools = () => {
  const [comTopTools, setComTopTools] = useAtom(cmComTopToolsAtom);
  const auth = useAuth();

  mapToolsSelf.comTopTools = comTopTools;
  mapToolsSelf.fun = (tool: MigratableComToolName) => {
    const tools =
      comTopTools.indexOf(tool) < 0 ? [...comTopTools, tool] : comTopTools.filter(currTool => tool !== currTool);
    setComTopTools(tools);

    if (auth.login == null) return;
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      cmUserStoreTsjrpcClient.setAboutComFavorites({ tools });
    }, 1000);
  };

  return toolKeys.map(mapTools, mapToolsSelf);
};

export const useMigratableTopComTools = () => {
  const comTopTools = useAtomValue(cmComTopToolsAtom);

  return <IsComToolIconItemsContext value={true}>{comTopTools.map(mapTools)}</IsComToolIconItemsContext>;
};
