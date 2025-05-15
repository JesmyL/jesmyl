import { MyLib } from '#shared/lib/my-lib';
import { cmIDB } from '$cm/basis/lib/cmIDB';
import { cmUserStoreSokiInvocatorClient } from '$cm/invocators/user-store-invocator.methods';
import { useAuth } from '$index/atoms';
import React from 'react';
import { MigratableComToolName } from 'shared/api';
import styled, { css } from 'styled-components';
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
  const [comTopTools, setComTopTools] = cmIDB.use.comTopTools();
  const auth = useAuth();

  mapToolsSelf.comTopTools = comTopTools;
  mapToolsSelf.fun = (tool: MigratableComToolName) => {
    const tools =
      comTopTools.indexOf(tool) < 0 ? [...comTopTools, tool] : comTopTools.filter(currTool => tool !== currTool);
    setComTopTools(tools);

    if (auth.login == null) return;
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      cmUserStoreSokiInvocatorClient.setAboutComFavorites({ tools });
    }, 1000);
  };

  return toolKeys.map(mapTools, mapToolsSelf);
};

export const useMigratableTopComTools = () => {
  const comTopTools = cmIDB.useValue.comTopTools();

  return (
    <IsComToolIconItemsContext.Provider value={true}>{comTopTools.map(mapTools)}</IsComToolIconItemsContext.Provider>
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
