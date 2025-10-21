import { MyLib } from '#shared/lib/my-lib';
import { cmComTopToolsAtom } from '$cm/entities/index';
import { cmUserStoreTsjrpcClient } from '$cm/shared/tsjrpc';
import { useAuth } from '$index/shared/state';
import { useAtom, useAtomValue } from 'atomaric';
import React from 'react';
import { MigratableComToolName } from 'shared/api';
import { CmComToolIsComToolIconItemsContext, CmComToolItemAttrsContext, CmComToolNameContext } from '../state/contexts';
import { CmComToolBroadcast } from '../ui/BroadcastComTool';
import { CmComToolCatsBinds } from '../ui/CatsBindsComTool';
import { CmComToolChordHardLevel } from '../ui/ChordHardLevelComTool';
import { CmComToolChordImages } from '../ui/ChordImagesComTool';
import { CmComToolChordsVariant } from '../ui/ChordsVariantComTool';
import { CmComToolComComment } from '../ui/ComCommentComTool';
import { CmComToolCopyText } from '../ui/ComCopyTextTool';
import { CmComToolFavorite } from '../ui/FavoriteComTool';
import { CmComToolFullscreen } from '../ui/FullscreenComTool';
import { CmComToolHideMetronome } from '../ui/HideMetronomeComTool';
import { CmComToolMiniAnchorSwitch } from '../ui/MiniAnchorSwitchComTool';
import { CmComToolOpenPlayer } from '../ui/OpenPlayerComTool';
import { CmComToolQrComShare } from '../ui/QrComShareComTool';
import { CmComToolSelected } from '../ui/SelectedComTool';

const RedactComTool = React.lazy(() => import('../ui/RedactComTool'));

const mapToolsSelf = {} as { fun: (tool: MigratableComToolName) => void; comTopTools: MigratableComToolName[] };

function mapTools(this: und | typeof mapToolsSelf, key: MigratableComToolName) {
  if (this === undefined)
    return (
      <CmComToolNameContext
        key={key}
        value={`${key} tool-in-top`}
      >
        {toolsDict[key]}
      </CmComToolNameContext>
    );

  return (
    <div
      key={key}
      className={this.comTopTools.includes(key) ? '[&_.icon-box]:bg-x4 [&_.icon-box]:text-x2' : undefined}
    >
      <CmComToolNameContext value={key}>
        <CmComToolItemAttrsContext
          value={{
            onIconClick: event => {
              event.stopPropagation();
              event.preventDefault();
              this.fun(key);
            },
          }}
        >
          {toolsDict[key]}
        </CmComToolItemAttrsContext>
      </CmComToolNameContext>
    </div>
  );
}

const toolsDict: Record<MigratableComToolName, React.ReactNode> = {
  'mark-com': <CmComToolFavorite />,
  'fullscreen-mode': <CmComToolFullscreen />,
  'chords-variant': <CmComToolChordsVariant />,
  'show-translation': <CmComToolBroadcast />,
  'chord-images': <CmComToolChordImages />,
  'selected-toggle': <CmComToolSelected />,
  'open-player': <CmComToolOpenPlayer />,
  'hide-metronome': <CmComToolHideMetronome />,
  'is-mini-anchor': <CmComToolMiniAnchorSwitch />,
  'qr-share': <CmComToolQrComShare />,
  'cats-binds': <CmComToolCatsBinds />,
  'com-comment': <CmComToolComComment />,
  'copy-com': <CmComToolCopyText />,
  'chord-hard-level': <CmComToolChordHardLevel />,

  'edit-com': <RedactComTool />,
};
const toolKeys = MyLib.keys(toolsDict);

let saveTimeout: TimeOut;
export const useCmComToolMigratableList = () => {
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

export const useCmComToolMigratableTop = () => {
  const comTopTools = useAtomValue(cmComTopToolsAtom);

  return (
    <CmComToolIsComToolIconItemsContext value={true}>{comTopTools.map(mapTools)}</CmComToolIsComToolIconItemsContext>
  );
};
