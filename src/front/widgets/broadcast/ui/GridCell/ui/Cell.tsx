import { Skeleton } from '#shared/components';
import { BroadcastGridTabConfig } from '#widgets/broadcast/model/TabConfig';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Suspense } from 'react';
import { twJoin } from 'tailwind-merge';

export const ResizableGridCell = <TabId extends number>({
  cellId,
  tabOrder,
  config,
  activeTabi,
  onActivate,
}: {
  cellId: number;
  tabOrder: TabId[] | nil;
  config: BroadcastGridTabConfig<TabId>;
  activeTabi: number;
  onActivate: (tabi: number) => void;
}) => {
  return (
    <Droppable
      droppableId={`${cellId}`}
      direction="horizontal"
    >
      {(provided, snapshot) => {
        const activeTab = tabOrder?.[activeTabi];
        const Inner = activeTab && config.tabs[activeTab]?.Comp;

        return (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={twJoin(
              'w-full h-full flex flex-col bg-background relative transition-colors',
              snapshot.isDraggingOver && 'bg-accent/10',
            )}
          >
            {tabOrder && tabOrder.length > 1 && (
              <div className="flex gap-1 border-b bg-muted/30 px-2 h-9 w-full items-end overflow-x-auto select-none z-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {tabOrder.map((tabId, tabIdi) => {
                  const tabConfig = config.tabs[tabId];

                  return (
                    tabConfig && (
                      <Draggable
                        key={tabId}
                        draggableId={`${tabId}`}
                        index={tabIdi}
                      >
                        {(dragProvided, dragSnapshot) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                            title={tabConfig.htmlTitle?.()}
                            className={twJoin(
                              'px-3 h-7 flex items-center text-xs font-medium border rounded-t-md transition-all shrink-0',
                              dragSnapshot.isDragging
                                ? 'shadow-lg scale-105 z-50'
                                : tabIdi === activeTabi
                                  ? 'bg-background border-b-transparent text-foreground'
                                  : 'bg-transparent border-transparent text-muted-foreground hover:text-foreground',
                            )}
                            onClick={() => onActivate(tabIdi)}
                          >
                            {tabConfig.title()}
                          </div>
                        )}
                      </Draggable>
                    )
                  );
                })}
              </div>
            )}

            {Inner && (
              <div className="[container-type:size] flex-1 w-full h-full relative overflow-auto">
                <Suspense fallback={<Skeleton className="w-[100cqw] h-[100cqh] m-auto" />}>
                  <Inner />
                </Suspense>
              </div>
            )}

            <div className="absolute inset-0 pointer-events-none flex items-end">{provided.placeholder}</div>
          </div>
        );
      }}
    </Droppable>
  );
};
