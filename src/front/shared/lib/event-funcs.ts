export const defaultPreventer = (event: DefaultPreventerEvent) => event.preventDefault();
export const propagationStopper = (event: PropagationStopperEvent) => event.stopPropagation();
export const propagationStopperAndDefaultPreventer = (event: PropagationStopperEvent & DefaultPreventerEvent) => {
  event.stopPropagation();
  event.preventDefault();
};

const editableTagNameSet = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

export const isEditableEventTarget = (event: Pick<Event, 'target'>) =>
  event.target instanceof HTMLElement &&
  (editableTagNameSet.has(event.target.tagName) || event.target.isContentEditable);
