import { MyLib } from '#shared/lib/my-lib';
import { cmComTopToolsAtom } from '$cm/entities/index';
import { cmUserStoreTsjrpcClient } from '$cm/shared/tsjrpc';
import { useAuth } from '$index/shared/state';
import { useAtomValue } from 'atomaric';
import React from 'react';
import { MenuComToolName } from 'shared/api';
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

const mapToolsSelf = {} as { fun: (tool: MenuComToolName) => void; comTopTools: MenuComToolName[] };

function mapTools(this: und | typeof mapToolsSelf, key: MenuComToolName) {
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
      className={this.comTopTools.includes(key) ? '[&_.icon-box]:bg-x4 [&_.icon-box]:text-x2' : ''}
    >
      <CmComToolNameContext value={`${key}`}>
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

const toolsDict: Record<MenuComToolName, React.ReactNode> = {
  [MenuComToolName.MarkCom]: <CmComToolFavorite />,
  [MenuComToolName.FullscreenMode]: <CmComToolFullscreen />,
  [MenuComToolName.ChordsVariant]: <CmComToolChordsVariant />,
  [MenuComToolName.ShowTranslation]: <CmComToolBroadcast />,
  [MenuComToolName.ChordImages]: <CmComToolChordImages />,
  [MenuComToolName.SelectedToggle]: <CmComToolSelected />,
  [MenuComToolName.OpenPlayer]: <CmComToolOpenPlayer />,
  [MenuComToolName.HideMetronome]: <CmComToolHideMetronome />,
  [MenuComToolName.IsMiniAnchor]: <CmComToolMiniAnchorSwitch />,
  [MenuComToolName.QrShare]: <CmComToolQrComShare />,
  [MenuComToolName.CatsBinds]: <CmComToolCatsBinds />,
  [MenuComToolName.ComComment]: <CmComToolComComment />,
  [MenuComToolName.CopyCom]: <CmComToolCopyText />,
  [MenuComToolName.ChordHardLevel]: <CmComToolChordHardLevel />,
  [MenuComToolName.EditCom]: <RedactComTool />,
};
const toolKeys = MyLib.keys(toolsDict);

let saveTimeout: TimeOut;
export const useCmComToolMigratableList = () => {
  const comTopTools = useAtomValue(cmComTopToolsAtom);
  const auth = useAuth();

  mapToolsSelf.comTopTools = comTopTools;
  mapToolsSelf.fun = (tool: MenuComToolName) => {
    const tools =
      comTopTools.indexOf(tool) < 0 ? [...comTopTools, tool] : comTopTools.filter(currTool => tool !== currTool);
    cmComTopToolsAtom.set(tools);

    if (!auth.login) return;
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      cmUserStoreTsjrpcClient.favTools_v1({ tools });
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
