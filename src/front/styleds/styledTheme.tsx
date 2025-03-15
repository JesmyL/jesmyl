import { indexSimpleValIsPlayAnimations } from '$index/complect/index.simpleValues';

export const styledDefaultTheme = {
  isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
  isCanPlayAnimations: () => indexSimpleValIsPlayAnimations.get(),
} as const;

export type StyledDefaultTheme = typeof styledDefaultTheme;
