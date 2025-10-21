import { indexIsPlayAnimationsAtom } from '$index/shared/state';

export const styledDefaultTheme = {
  isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
  isCanPlayAnimations: () => indexIsPlayAnimationsAtom.get(),
} as const;

export type StyledDefaultTheme = typeof styledDefaultTheme;
