import { MyLib } from '#shared/lib/my-lib';
import { cmIDB } from '$cm/basis/lib/cmIDB';
import { useCcom } from '$cm/basis/lib/com-selections';
import { cmUserStoreSokiInvocatorClient } from '$cm/invocators/user-store-invocator.methods';
import React from 'react';
import { MigratableComToolName } from 'shared/api';
import styled, { css } from 'styled-components';
import { CmCatsBindsComTool } from '../ui/CatsBindsComTool';
import { ChordImagesComTool } from '../ui/ChordImagesComTool';
import { ChordsVariantComTool } from '../ui/ChordsVariantComTool';
import { ComCommentComTool } from '../ui/ComCommentComTool';
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
