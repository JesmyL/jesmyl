import { BroadcastGridTabConfig } from '#widgets/broadcast/model/TabConfig';
import { Draggable, Droppable } from '@hello-pangea/dnd';

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
            className={`w-full h-full flex flex-col bg-background ${snapshot.isDraggingOver ? 'bg-accent/10' : ''}`}
          >
            {tabOrder && tabOrder.length > 1 && (
              <div className="flex gap-1 border-b bg-muted/30 px-2 h-9 overflow-x-auto select-none">
                {tabOrder.map((tabId, tabIdi) => (
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
                        className={`px-3 h-7 flex text-xs font-medium border rounded-t-md transition-all ${
                          dragSnapshot.isDragging
                            ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                            : tabIdi === activeTabi
                              ? 'bg-background border-b-transparent text-foreground'
                              : 'bg-transparent border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                        onClick={() => onActivate(tabIdi)}
                      >
                        {config.tabs[tabId].title()}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}

            {Inner && (
              <div className="[container-type:size] flex-1 w-full h-full overflow-auto relative">
                <Inner />
              </div>
            )}
          </div>
        );
      }}
    </Droppable>
  );
};
