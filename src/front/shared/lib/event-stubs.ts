export const defaultPreventer = (event: DefaultPreventerEvent) => event.preventDefault();
export const propagationStopper = (event: PropagationStopperEvent) => event.stopPropagation();
export const propagationStopperAndDefaultPreventer = (event: PropagationStopperEvent & DefaultPreventerEvent) => {
  event.stopPropagation();
  event.preventDefault();
};
