export type PresentationSlideBg = {
  color?: string;
  image?: string;
  gradient?: string;
};

export type PresentationSlideBox = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type PresentationSlideInset = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type PresentationSlideCss = {
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  border?: string;
  borderRadius?: string;
};

export type PresentationTextAlign = 'flex-start' | 'center' | 'flex-end';

export type PresentationTextItem = {
  kind: 'text';
  box: PresentationSlideBox;
  align: PresentationTextAlign;
  contentHtml: string;
  baseFont: number;
  boxCss?: PresentationSlideCss;
  inset?: PresentationSlideInset;
  nowrap?: boolean;
  vertical?: boolean;
  rotate?: number;
};

export type PresentationImageItem = {
  kind: 'image';
  box: PresentationSlideBox;
  src: string;
  rotate?: number;
  flipH?: boolean;
  flipV?: boolean;
};

export type PresentationShapeItem = {
  kind: 'shape';
  box: PresentationSlideBox;
  css: PresentationSlideCss;
  rotate?: number;
};

export type PresentationSlideItem = PresentationTextItem | PresentationImageItem | PresentationShapeItem;

export type PresentationSlide = {
  slid: number;
  title: string;
  /** Design-space width (1920 for 16:9 slides, 1440 for 4:3). */
  width: number;
  /** Design-space height (1080 for both 16:9 and 4:3 slides). */
  height: number;
  bg?: PresentationSlideBg;
  items: PresentationSlideItem[];
};

export type ElectronPresentationsTsjrpcModel = {
  openPresentation: (args: { filePath: string }) => PresentationSlide[] | nil;
  /** Slide 1 only — used for WorkDir tiles without keeping every parsed slide in memory. */
  getPresentationPreview: (args: { filePath: string }) => PresentationSlide | nil;
};
