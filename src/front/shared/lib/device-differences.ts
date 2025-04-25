import { makeRegExp } from 'regexp-master';

export const isAndroid = navigator.userAgent && makeRegExp('/android/i').test(navigator.userAgent);
export const isIOS = makeRegExp('/iPad|iPhone|iPod/i').test(navigator.userAgent);

export const isMobileDevice = makeRegExp('/android|iphone|kindle|ipad/i').test(navigator.userAgent);

export const isTouchDevice = isAndroid || isIOS;
