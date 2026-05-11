export const takeCorrectMetronomeBpm = (bpm?: number | nil) => (bpm == null ? 120 : Math.max(Math.min(bpm, 300), 50));
