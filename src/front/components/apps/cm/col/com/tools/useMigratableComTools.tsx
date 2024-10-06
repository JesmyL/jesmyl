import React from 'react';
import styled, { css } from 'styled-components';
import { useAtom, useAtomValue } from '../../../../../../complect/atoms';
import propsOfClicker from '../../../../../../complect/clicker/propsOfClicker';
import { contextCreator } from '../../../../../../complect/contextCreator';
import { MyLib } from '../../../../../../complect/my-lib/MyLib';
import { cmMolecule } from '../../../molecules';
import { Com } from '../Com';
import { MigratableComToolName } from '../Com.model';
import { useCcom } from '../useCcom';
import { ChordImagesTool } from './complect/ChordImagesTool';
import { ChordsVariantTool } from './complect/ChordsVariantTool';
import { FullscreenTool } from './complect/FullscreenTool';
import { HideMetronomeTool } from './complect/HideMetronomeTool';
import { MarkedComTool } from './complect/MarkedComTool';
import { MiniAnchorSwitchTool } from './complect/MiniAnchorSwitchTool';
import { OpenPlayerTool } from './complect/OpenPlayerTool';
import { RedactComTool } from './complect/RedactComTool';
import { SelectedToggleTool } from './complect/SelectedToggleTool';
import { TranslationTool } from './complect/TranslationTool';
import { IsComToolIconItemsContext, ComToolItemAttrsContext } from './ComTool';

const comTopToolsAtom = cmMolecule.select(s => s.comTopTools);

const [ComToolsCcomContext, useComToolsCcomContext] = contextCreator<Com | und>(undefined);

export { useComToolsCcomContext };

const mapToolsSelf = {} as {
  fun: (tool: MigratableComToolName) => void;
  comTopTools: MigratableComToolName[];
};

function mapTools(this: und | typeof mapToolsSelf, key: MigratableComToolName) {
  if (this === undefined) return <React.Fragment key={key}>{toolsDict[key]}</React.Fragment>;

  return (
    <StyledItem
      key={key}
      $active={this.comTopTools.includes(key)}
    >
      <ComToolItemAttrsContext.Provider
        value={propsOfClicker({
          onCtxMenu: event => {
            event.preventDefault();
            this.fun(key);
          },
        })}
      >
        {toolsDict[key]}
      </ComToolItemAttrsContext.Provider>
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
  'edit-com': <RedactComTool />,
};
const toolKeys = MyLib.keys(toolsDict);

export const useMigratableListComTools = () => {
  const ccom = useCcom();
  const [comTopTools, setComTopTools] = useAtom(comTopToolsAtom);

  mapToolsSelf.comTopTools = comTopTools;
  mapToolsSelf.fun = (tool: MigratableComToolName) => {
    setComTopTools(tools => (tools.indexOf(tool) < 0 ? [...tools, tool] : tools.filter(currTool => tool !== currTool)));
  };

  return (
    <ComToolsCcomContext.Provider value={ccom}>{toolKeys.map(mapTools, mapToolsSelf)}</ComToolsCcomContext.Provider>
  );
};

export const useMigratableTopComTools = () => {
  const ccom = useCcom();
  const comTopTools = useAtomValue(comTopToolsAtom);

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
