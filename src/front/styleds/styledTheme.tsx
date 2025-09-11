import { indexIsPlayAnimationsAtom } from '$index/atoms';

export const styledDefaultTheme = {
  isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
  isCanPlayAnimations: () => indexIsPlayAnimationsAtom.get(),
} as const;

export type StyledDefaultTheme = typeof styledDefaultTheme;
