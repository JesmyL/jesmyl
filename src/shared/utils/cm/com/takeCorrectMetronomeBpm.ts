import { checkIsNil } from 'shared/utils/checkIs';

export const takeCorrectMetronomeBpm = (bpm?: number | nil) =>
  checkIsNil(bpm) ? 120 : Math.max(Math.min(bpm, 300), 50);
