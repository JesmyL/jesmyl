import { contextCreator } from '#shared/lib/contextCreator';
import { MyLib } from '#shared/lib/my-lib';
import { cmIDB } from '@cm/_db/cm-idb';
import { cmUserStoreSokiInvocatorClient } from '@cm/invocators/user-store-invocator.methods';
import React from 'react';
import { MigratableComToolName } from 'shared/api';
import styled, { css } from 'styled-components';
import { Com } from '../../Com';
import { useCcom } from '../../useCcom';
import { CmCatsBindsComTool } from '../ui/CatsBinds';
import { ChordImagesTool } from '../ui/ChordImagesTool';
import { ChordsVariantTool } from '../ui/ChordsVariantTool';
import { FullscreenTool } from '../ui/FullscreenTool';
import { HideMetronomeTool } from '../ui/HideMetronomeTool';
import { MarkedComTool } from '../ui/MarkedComTool';
import { MiniAnchorSwitchTool } from '../ui/MiniAnchorSwitchTool';
import { OpenPlayerTool } from '../ui/OpenPlayerTool';
import { QrComShare } from '../ui/QrComShare';
import { SelectedToggleTool } from '../ui/SelectedToggleTool';
import { TranslationTool } from '../ui/TranslationTool';
import { ComToolItemAttrsContext, ComToolNameContext, IsComToolIconItemsContext } from './contexts';

const RedactComTool = React.lazy(() => import('../ui/RedactComTool'));

const [ComToolsCcomContext, useComToolsCcomContext] = contextCreator<Com | und>(undefined);

export { useComToolsCcomContext };

const mapToolsSelf = {} as {
  fun: (tool: MigratableComToolName) => void;
  comTopTools: MigratableComToolName[];
};

function mapTools(this: und | typeof mapToolsSelf, key: MigratableComToolName) {
  if (this === undefined)
    return (
      <ComToolNameContext.Provider
        key={key}
        value={`${key} tool-in-top`}
      >
        {toolsDict[key]}
      </ComToolNameContext.Provider>
    );

  return (
    <StyledItem
      key={key}
      $active={this.comTopTools.includes(key)}
    >
      <ComToolNameContext.Provider value={key}>
        <ComToolItemAttrsContext.Provider
          value={{
            onIconClick: event => {
              event.stopPropagation();
              event.preventDefault();
              this.fun(key);
            },
          }}
        >
          {toolsDict[key]}
        </ComToolItemAttrsContext.Provider>
      </ComToolNameContext.Provider>
    </StyledItem>
  );
}

const toolsDict: Record<MigratableComToolName, React.ReactNode> = {
  'mark-com': <MarkedComTool />,
  'fullscreen-mode': <FullscreenTool />,
  'chords-variant': <ChordsVariantTool />,
  'show-translation': <TranslationTool />,
  'chord-images': <ChordImagesTool />,
  'selected-toggle': <SelectedToggleTool />,
  'open-player': <OpenPlayerTool />,
  'hide-metronome': <HideMetronomeTool />,
  'is-mini-anchor': <MiniAnchorSwitchTool />,
  'qr-share': <QrComShare />,
  'cats-binds': <CmCatsBindsComTool />,

  'edit-com': <RedactComTool />,
};
const toolKeys = MyLib.keys(toolsDict);

let saveTimeout: TimeOut;
export const useMigratableListComTools = () => {
  const ccom = useCcom();
  const [comTopTools, setComTopTools] = cmIDB.use.comTopTools();

  mapToolsSelf.comTopTools = comTopTools;
  mapToolsSelf.fun = (tool: MigratableComToolName) => {
    const tools =
      comTopTools.indexOf(tool) < 0 ? [...comTopTools, tool] : comTopTools.filter(currTool => tool !== currTool);
    setComTopTools(tools);

    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      cmUserStoreSokiInvocatorClient.setAboutComFavorites(null, { tools });
    }, 1000);
  };

  return (
    <ComToolsCcomContext.Provider value={ccom}>{toolKeys.map(mapTools, mapToolsSelf)}</ComToolsCcomContext.Provider>
  );
};

export const useMigratableTopComTools = () => {
  const ccom = useCcom();
  const comTopTools = cmIDB.useValue.comTopTools();

  return (
    <ComToolsCcomContext.Provider value={ccom}>
      <IsComToolIconItemsContext.Provider value={true}>{comTopTools.map(mapTools)}</IsComToolIconItemsContext.Provider>
    </ComToolsCcomContext.Provider>
  );
};

const StyledItem = styled.div<{ $active: boolean }>`
  ${props =>
    props.$active &&
    css`
      .icon-box {
        background: var(--color--2);
      }
    `}
`;
