export type BroadcastScreenProps = {
  screeni?: number;
  win?: Window;
  isTech?: boolean;
  isPreview?: boolean;
  forceViewApp?: BroadcastViewApp;
};

export type BroadcastViewApp = 'cm' | 'bible';
