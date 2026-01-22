export type BroadcastScreenProps = {
  screeni?: number;
  win?: Window;
  isTech?: boolean;
  isPreview?: boolean;
  forceViewApp?: BroadcastViewApp;
};

export type BroadcastViewApp = 'cm' | 'bible';

export const enum BroadcastFirstPresentationMode {
  None,
  Reclosable,
  Hiddify,
}
