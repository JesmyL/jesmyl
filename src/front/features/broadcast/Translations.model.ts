export type TranslationScreenProps = {
  screeni?: number;
  win?: Window;
  isTech?: boolean;
  isPreview?: boolean;
  forceViewApp?: TranslationViewApp;
};

export type TranslationViewApp = 'cm' | 'bible';
