import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '#shared/components/ui/resizable';
import { BroadcastGridTabConfig } from '#widgets/broadcast/model/TabConfig';
import styled from '@emotion/styled';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useAtomValue } from 'atomaric';
import { useMemo } from 'react';
import { PanelSize } from 'react-resizable-panels';
import { ResizableGridCell } from '../../GridCell/ui/Cell';

export const BroadcastResizableGrid = <TabId extends number>({ config }: { config: BroadcastGridTabConfig<TabId> }) => {
  const activeTabs = useAtomValue(config.activeTabiAtom);
  const tabsState = useAtomValue(config.tabNetAtom);

  const setSizeProps = useMemo(() => {
    const updateTimeOutDict: Record<number, TimeOut> = {};
    const sizes = config.gridSizesAtom.get();

    return (celli: number) => ({
      defaultSize: `${sizes[celli]}%`,
      onResize: (p: PanelSize) => {
        clearTimeout(updateTimeOutDict[celli]);
        updateTimeOutDict[celli] = setTimeout(() => {
          config.gridSizesAtom.do.update(sizes => {
            sizes[celli] = p.asPercentage;
          });
        }, 300);
      },
    });
  }, [config.gridSizesAtom]);

  const minMaxSizes = {
    maxSize: '33%',
    minSize: '15%',
  };

  const renderCell = (celli: number) => {
    return (
      <ResizableGridCell
        cellId={celli}
        tabOrder={tabsState[celli]}
        config={config}
        activeTabi={activeTabs[celli]}
        onActivate={tabi => config.activeTabiAtom.do.update(it => (it[celli] = tabi))}
      />
    );
  };

  const onDragEnd = (result: DropResult<`${TabId}`>) => {
    if (!result.destination) return;
    const { droppableId: srcId, index: srci } = result.source;
    const { droppableId: dstId, index: dsti } = result.destination;

    if (srcId === dstId && srci === dsti) return;

    config.tabNetAtom.do.update(draft => {
      const sourceCell = draft[+srcId];
      const destCell = draft[+dstId];

      const [movedTab] = sourceCell.splice(srci, 1);
      destCell.splice(dsti, 0, movedTab);
    });

    config.activeTabiAtom.do.update(draft => {
      const currentSrcActive = draft[+srcId] ?? 0;
      const currentDstActive = draft[+dstId] ?? 0;

      if (srcId === dstId) {
        if (srci === currentSrcActive) {
          draft[+srcId] = dsti;
        } else {
          let newActive = currentSrcActive;
          if (srci < currentSrcActive && dsti >= currentSrcActive) {
            newActive--;
          } else if (srci > currentSrcActive && dsti <= currentSrcActive) {
            newActive++;
          }
          draft[+srcId] = newActive;
        }
        return;
      }

      if (srci < currentSrcActive) {
        draft[+srcId] = currentSrcActive - 1;
      } else if (srci === currentSrcActive) {
        draft[+srcId] = Math.max(0, currentSrcActive - 1);
      }

      if (dsti <= currentDstActive) {
        draft[+dstId] = currentDstActive + 1;
      }
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd as never}>
      <div className="w-full h-full max-h-[94vh]">
        <StyledResizablePanelGroup
          orientation="vertical"
          id="main-vertical-group"
        >
          <ResizablePanel
            id="panel-top"
            minSize="20%"
            {...setSizeProps(0)}
          >
            <ResizablePanelGroup
              orientation="horizontal"
              className="h-full w-full"
              id="top-horizontal-group"
            >
              <ResizablePanel
                id="panel-tl"
                {...minMaxSizes}
                {...setSizeProps(1)}
              >
                {renderCell(0)}
              </ResizablePanel>

              <ResizableHandle />

              <ResizablePanel id="panel-t2">{renderCell(1)}</ResizablePanel>

              <ResizableHandle />

              <ResizablePanel
                id="panel-tr"
                {...minMaxSizes}
                {...setSizeProps(2)}
              >
                {renderCell(2)}
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel
            id="panel-bottom"
            minSize="20%"
          >
            <ResizablePanelGroup
              orientation="horizontal"
              className="h-full w-full"
              id="bottom-horizontal-group"
            >
              <ResizablePanel
                id="panel-bl"
                {...minMaxSizes}
                {...setSizeProps(3)}
              >
                {renderCell(3)}
              </ResizablePanel>

              <ResizableHandle />

              <ResizablePanel id="panel-b2">{renderCell(4)}</ResizablePanel>
              <ResizableHandle />

              <ResizablePanel
                id="panel-br"
                {...minMaxSizes}
                {...setSizeProps(5)}
              >
                {renderCell(5)}
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </StyledResizablePanelGroup>
      </div>
    </DragDropContext>
  );
};

const StyledResizablePanelGroup = styled(ResizablePanelGroup)`
  [data-slot='resizable-handle'] {
    background-color: var(--color-x3);
    opacity: 0.4;

    &:hover {
      background-color: var(--color-x7);
      opacity: 1;
    }
  }
`;
