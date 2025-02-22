import { makeRegExp } from 'shared/utils';

export const isAndroid = navigator.userAgent && /android/i.test(navigator.userAgent);
export const isIPhone =
  ['iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
  (navigator.userAgent.includes('Mac') && 'ontouchend' in document);

export const isMobileDevice = makeRegExp('/android|iphone|kindle|ipad/i').test(navigator.userAgent);

export const isTouchDevice = isAndroid || isIPhone;
